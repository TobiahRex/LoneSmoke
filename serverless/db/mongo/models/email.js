/* eslint-disable no-use-before-define, no-console, import/newline-after-import */
import AWS from 'aws-sdk';
import { Promise as bbPromise } from 'bluebird';
import moment from 'moment';
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
  * 1) Find a saved Email Document by querying with input argument "msgId".
  * 2a) If not found - send rejected promise with error msg.
  * 2b) If found - filter the sent emails list using the id of the sent email.
  * 3) Update the sent email's "status" with the input argument "status".
  * 4) Save changes & resolve promise with updated email object.
  *
  * @param {string} msgId - SES messageId value.
  * @param {string} status - SES status result.
  *
  * @return {object} - Promise: resolved - updated email.
  */
  emailSchema.statics.findSentEmailAndUpdate = (msgId, status) =>
  new Promise((resolve, reject) => {
    if (!msgId || !status) return reject(`Missing required arguments. "msgId": ${msgId || 'undefined'}. "status": ${status || 'undefined'}. `);

    console.log(`Querying Mongo for Email to update.  "messageId": ${msgId}.  `);

    return Email.findOne({ 'sentEmails.messageId': msgId })
    .exec()
    .then((dbEmail) => {
      if (!dbEmail) {
        console.log('Could not find any Sent emails with MessageId: ', msgId);
        return reject(`Could not find sent email with id# ${msgId}.  `);
      }
      console.log('\nFound Email with MessageID: ', msgId);

      const emailsToSave = dbEmail.sentEmails
      .filter(sent => sent.messageId !== msgId);

      dbEmail.sentEmails = [...emailsToSave, {
        messageId: msgId,
        sesStatus: status,
      }];
      console.log('\nSaving updated Email status...  ');
      return dbEmail.save({ new: true });
    })
    .then((updatedEmail) => {
      console.log('Updated sent emails for Email _id: ', updatedEmail._id);
      return resolve(updatedEmail);
    })
    .catch((error) => {
      console.log(`Query was unsuccessful.  ERROR = ${error}`);
      return reject(`Query was unsuccessful.  ERROR = ${error}`);
    });
  });
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
    if (!type || !reqLanguage) return reject(`Missing required arguments. "type": ${type || 'undefined'}. "reqLanguage": ${reqLanguage || 'undefined'}.  `);

    return Email
    .find({ type })
    .exec()
    .then((dbEmails) => {
      if (!dbEmails) {
        console.log(`Did not find any emails with type: "${type}"`);
        return reject(`Did not find any emails with type: "${type}".  `);
      }
      console.log(`Found the following emails: ${dbEmails}`);

      const foundEmail = dbEmails
      .filter(dbEmail => (dbEmail.type === type) && (dbEmail.language === reqLanguage))[0];

      if (!foundEmail) {
        console.log('Did not successfully filter email results array.');
        return reject('Did not successfully filter email results array.');
      }

      console.log(`Filtered email results: Found "type" = ${foundEmail.type}.  Requested "type" = ${type}.  Found "language" = ${reqLanguage}.  Requested "language" = ${reqLanguage}.  `);

      return resolve(foundEmail);
    })
    .catch((error) => {
      console.log(`Error while trying to find any emails with "type" = ${type}.  ERROR = ${error}`);
      return reject(`Error while trying to find emails with "type" = ${type}.  ERROR = ${error}.  `);
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
      console.log(`ERROR = "${to}" is not a valid email.  `);
      return reject(`ERROR = "${to}" is not a valid email.  `);
    }

    const emailRequest = {
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
          Data: `${moment().format('LL')} | ${emailDoc.subjectData}`,
          Charset: emailDoc.subjectCharset,
        },
      },
    };

    console.log('\nSending AWS ses email...');
    return bbPromise
    .fromCallback(cb => ses.sendEmail(emailRequest, cb))
    .then((data) => {
      console.log('\nSuccessfully sent SES email: \n', data,
      '\nSaving record of email to MONGO Email collection...');

      emailDoc.sentEmails.push({ messageId: data.MessageId });

      return emailDoc.save({ new: true });
    })
    .then((savedEmail) => {
      console.log('\nSuccessfully saved Email record to MONGO Email collection: \n', savedEmail.sentEmails.pop().messageId);
      resolve();
    })
    .catch((error) => {
      console.log(`Error sending SES email with type: "${emailDoc.type}".  ERROR = ${error}`);
      reject(`Error sending SES email with type: "${emailDoc.type}".  ERROR = ${error}`);
    });
  });

  const Email = db.model('Email', emailSchema);
  return Email;
};
