/* eslint-disable no-use-before-define, no-console, import/newline-after-import */
import AWS from 'aws-sdk';
import { Promise as bbPromise } from 'bluebird';
import isEmail from 'validator/lib/isEmail';
import emailSchema from '../schemas/email';
import config from '../../..//config.json';

AWS.config.update({
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey,
  region: config.aws.sesEmailRegion,
});

const ses = new AWS.SES();

export default (db) => {
  /**
  * 1) Validate required fields exist.
  * 2) Create a new email.
  *
  * @param {object} fields - Required fields for creating new Email.
  *
  * @return {object} - Promise: resolved - Email details.
  */
  emailSchema.statics.createEmail = fields =>
  new Promise((resolve, reject) => {
    const {
      type,
      purpose,
      language,
      subjectData,
      bodyHtmlData,
      bodyTextData,
      replyToAddress,
    } = fields;

    if (!type || !purpose || !language || !replyToAddress || !subjectData || !bodyHtmlData || !bodyTextData) {
      reject({ error: 'Missing required fields to create a new Email.', ...fields });
    } else {
      bbPromise.fromCallback(cb => Email.create({ ...fields }, cb))
      .then((newEmail) => {
        console.log('\nSuccessfully created new Email!\n _id: ', newEmail._id);
        resolve(newEmail);
      });
    }
  });

  /**
  * 1) Find all emails with type.
  * 2) Filter results by request language.
  *
  * @param {string} type - The email type to find.
  * @param {string} requestedLangauge - The language to filter by.
  *
  * @return {object} - Promise: resolved - Email details.
  */
  emailSchema.statics.findEmailAndFilterLanguage = (type, reqLanguage) =>
  new Promise((resolve, reject) => {
    Email
    .find(type)
    .exec()
    .then((dbEmails) => {
      if (!dbEmails.length) {
        console.log('Error: \nDid not find any emails with type: "', type, '"');
        reject({ type: 'error', problem: `Did not find any emails with type: ${type}` });
      }

      const foundEmail = dbEmails.filter(dbEmail => dbEmail.language === reqLanguage)[0];

      if (!foundEmail) {
        console.log('Error: \nDid not find email with language: "', reqLanguage, '"');
        reject({ type: 'error', problem: `After filtering emails of type "${type}", there was no email that matched language: "${reqLanguage}"` });
      }
      resolve(foundEmail);
    });
  });

  /**
  * 1) Determine if the userEmail has already been sent a discount by checking Market Hero collection.
  * 2a) If found, send a Rejection Email.
  * 2b) If not found, verify user has not added classified our application emails as "spam" since last message had been sent.
  * 3a) If email has not been added to Complaint collection, send the user a Discount email.
  *
  * @param {string} to - recipients email address.
  * @param {object} emailDoc - Mongo Email collection, Document.
  *
  * @return {object} - Promise: resolved - email type sent.
  */
  emailSchema.statics.sendEmail = (to, emailDoc) =>
  new Promise((resolve, reject) => {
    if (!isEmail(to)) {
      console.log('ERROR @ sendEmail: \n\'', to, '\' is not a valid email address.');
      reject({ error: true, problem: 'Did not submit a valid email address. Please try again.' });
    }

    const emailParams = {
      Destination: {
        ToAddresses: [to],
      },
      Source: emailDoc.replyToAddress,
      ReplyToAddresses: [emailDoc.replyToAddress],
      Message: {
        Body: {
          Html: {
            Data: emailDoc.bodyHtmlData,
            Charset: emailDoc.bodyHtmlCharset,
          },
          Text: {
            Data: emailDoc.bodyTextData,
            Charset: emailDoc.bodyTextCharset,
          },
        },
        Subject: {
          Data: emailDoc.subjectData,
          Charset: emailDoc.subjectCharset,
        },
      },
    };

    bbPromise.fromCallback(cb => ses.sendEmail(emailParams, cb))
    .then((data) => {
      console.log('\nSuccessfully sent SES email: \n', data, '\nSaving record of email sent to Email Document...');
      emailDoc.sentEmails.push({ messageId: data.MessageId });
      emailDoc.save({ new: true })
      .then((savedEmail) => {
        console.log('\nSuccessfully updated "messageId" with value: \n', savedEmail.sentEmails.pop().messageId);

        resolve({
          statusCode: 200,
          body: JSON.stringify({ message: 'Mail sent successfully.' }),
        });
      });
    })
    .catch((error) => {
      console.log('\nERROR sending SES email with type: "', emailDoc.type, '"\nError = ', error, '\n', error.stack);
      reject({ error: true, problem: { ...error } });
    });
  });

  const Email = db.model('Email', emailSchema);
  return Email;
};
