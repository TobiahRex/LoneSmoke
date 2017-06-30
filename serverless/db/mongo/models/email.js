/* eslint-disable no-use-before-define, no-console, import/newline-after-import */
import AWS from 'aws-sdk';
import { Promise as bbPromise } from 'bluebird';
import isEmail from 'validator/lib/isEmail';
import emailSchema from '../schemas/email';
import config from '../../..//config.json';

AWS.config.update({
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey,
  region: config.aws.region,
});

const ses = new AWS.SES();

export default (db) => {
  emailSchema.statics.createEmail = (fields) =>
  new Promise((resolve, reject) => {
    const {
      purpose,
      subjectData,
      bodyHtmlData,
      bodyTextData,
      replyToAddress,
    } = fields;

    if (!purpose || !replyToAddress || !subjectData || !bodyHtmlData || !bodyTextData) {
      reject({ error: 'Missing required fields to create a new Email.' })
    }
  });

  /**
  * 1) Determine if the userEmail has already been sent a discount by checking Market Hero collection.
  * 2a) If found, send a Rejection Email.
  * 2b) If not found, verify user has not added classified our application emails as "spam" since last message had been sent.
  * 3a) If email has not been added to Complaint collection, send the user a Discount email.
  *
  * @param {object} sendInfo - to, from, type = Required fields for sending emails with AWS.
  *
  * @return {object} - Promise: resolved - email type sent.
  */
  emailSchema.statics.sendEmail = ({ to, from, type }) =>
  new Promise((resolve, reject) => {
    if (!isEmail(to)) {
      console.log('ERROR @ sendEmail: \n\'', from, '\' is not a valid email address.');
      reject({ error: true, problem: 'Did not submit a valid email address. Please try again.' });
    }

    Email.findOne({ type })
    .exec()
    .then((dbEmail) => {
      console.log('\nFound ', dbEmail.type, ' email.');

      const emailParams = {
        Destination: {
          ToAddresses: to,
        },
        Source: from,
        ReplyToAddresses: dbEmail.replyToAddress,
        Message: {
          Html: {
            Data: dbEmail.bodyHtmlData,
            Charset: dbEmail.bodyHtmlCharset,
          },
          Body: {
            Text: {
              Data: dbEmail.bodyTextData,
              Charset: dbEmail.bodyTextCharset,
            },
          },
          Subject: {
            Data: dbEmail.subjectData,
            Charset: dbEmail.subjectCharset,
          },
        },
      };

      return bbPromise.fromCallback(cb => ses.sendEmail(emailParams, cb));
    })
    .then((data) => {
      console.log('\nSuccessfully sent SES email: ', data);
      resolve({
        statusCode: 200,
        body: JSON.stringify({ message: 'Mail sent successfully.' }),
      });
    })
    .catch((error) => {
      console.log('\nERROR sending SES email. \nError = ', error, error.stack);
      reject({ error: true, problem: { ...error } });
    });
  });

  const Email = db.model('Email', emailSchema);
  return Email;
};
