/* eslint-disable no-use-before-define, no-console, import/newline-after-import */
import emailSchema from '../schemas/email';
import config from './config.json';
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: config.aws.accessKeyId,
  secretAccessKey: config.aws.secretAccessKey,
  region: config.aws.region,
});

const ses = new AWS.SES();

export default (db) => {
  emailSchema.statics.sendNastyGram = ({ to, from, type }) =>
  new Promise((resolve, reject) => {
    Email.findOne({ type })
    .exec()
    .then((dbEmail) => {
      console.log('\nFound ', dbEmail.type, ' email.');

      let toEmailAddresses = to;
      let sourceEmail = from;
      let bodyTextData = dbEmail.bodyData;
      let bodyHtmlData = dbEmail.bodyData;
      let bodyTextCharset = dbEmail.bodyTextCharset;
      let bodyHtmlCharset = dbEmail.bodyHtmlCharset;
      let subjectdata = dbEmail.subjectdata;
      let subjectCharset = dbEmail.subjectCharset;
      let replyToAddresses = dbEmail.replyTo;

      let emailParams = {
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
            Data: subjectdata,
            Charset: subjectCharset,
          },
        },
        Source: from,
        ReplyToAddresses: replyToAddresses,
      };
    })
    .catch(reject);
  });

  const Email = db.model('Email', emailSchema);
  return Email;
};
