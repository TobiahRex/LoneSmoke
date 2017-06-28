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
  emailSchema.statics.sendEmail = ({ to, from, type }) =>
  new Promise((resolve, reject) => {
    if (!isEmail(to)) {
      console.log(`
        ERROR @ sendEmail:
        "${from}" is not a valid email address.
      `);
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
        Message: {
          Html: {
            Data: dbEmail.bodyHtmlData,
            Charset: dbEmail.bodyHtmlCharset,
          },
          Body: {
            Text: {
              Data: dbEmail.bodyTextData,
              Charset: dbEmail.bodyCharset,
            },
          },
          Subject: {
            Data: dbEmail.subjetData,
            Charset: dbEmail.subjetCharset,
          },
        },
        Source: from,
        ReplyToAddresses: dbEmail.replyToAddress,
      };

      return bbPromise.fromCallback(cb => ses.sendEmail(emailParams, cb));
    })
    .then((data) => {
      console.log(`
        Successfully sent SES email: ${data}
      `);
      resolve(data);
    })
    .catch((error) => {
      console.log(`
        ERROR sending SES email.
        Error = ${error}
        ${error.stack}
        `);
      reject({ error: true, problem: { ...error } });
    });
  });

  const Email = db.model('Email', emailSchema);
  return Email;
};
