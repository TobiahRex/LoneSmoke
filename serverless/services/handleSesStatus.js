/* eslint-disable no-console, import/newline-after-import, import/imports-first */

require('dotenv').load({ silent: true });
import { Promise as bbPromise } from 'bluebird';
import createLeadConcurrently from './createLeadConcurrently';
/**
* 1) Determines what type of notification has been received.
* 2a) If Bounce type - do nothing.
* 2b) If Complaint type - add to Complaint collection.
* 2c) If Delivered type - add to MarketHero collection & add to MarketHero leads collection via REST API.
*
* @param {object} event - event.body = Top-Level SES status object.
* @param {object} dbModels - Mongo model instance(s).
*
* @return {object} - Promise: resolved - no data.
*/
export default ({ event, dbModels: { MarketHero, Complaint, Email } }) =>
new Promise((resolve, reject) => {
  const findSentEmailAndUpdate = (msgId, status) => {
    if (!msgId || !status) {
      Promise.reject('Missing required inputs.');
    }

    Email
    .findOne({ 'sentEmails.messageId': { $in: [msgId] } })
    .exec()
    .then((dbEmail) => {
      if (!dbEmail) {
        console.log('Could not find any Sent emails with MessageId: ', msgId);
        reject({ type: 'error', problem: `Could not find sent email with id# ${msgId}` });
      }
      const emailsToSave = dbEmail.sentEmails.filter(sent => sent.messageId !== msgId)[0];

      dbEmail.sentEmails = [...emailsToSave, {
        messageId: msgId,
        sesStatus: status,
      }];

      return dbEmail.save({ new: true });
    })
    .then((updatedEmail) => {
      console.log('Updated sent emails for Email _id: ', updatedEmail._id);
      return Promise.resolve(updatedEmail);
    });
  };

  event.Records.forEach((record, i) => {
    const {
      Sns: {
        Message,    // JSON stringified object
        MessageId,  // string
      },
    } = record;

    let notification = null;

    try {
      notification = JSON.parse(Message);
    } catch (error) {
      console.log('Could not parse Sns Message Body: ', error);
      reject({ type: 'error', problem: { ...error } });
    }
    // 2a) if type === "Bounce"
    if (notification.notificationType === 'Bounce') {
      findSentEmailAndUpdate(MessageId, notification.notificationType)
      .then(resolve);
      // 2b) if type === "Complaint"
    } else if (notification.notificationType === 'Complaint') {
      findSentEmailAndUpdate(MessageId, notification.notificationType)
      .then((updatedEmail) => {
        console.log('Successfully updated email status!\nEmail subject: ', updatedEmail.subjectData, '\nStatus: ', notification.notificationType);

        bbPromise.fromCallback(cb => Complaint.create({
          email: notification.destination[i],
          created: new Date(),
          messageId: MessageId,
        }, cb));
      })
      .then((newComplaint) => {
        console.log('\n', newComplaint.email, ': successfully added to Complaint collections.\n :(');
        resolve();
      })
      .catch((error) => {
        console.log('\nError saving email to Complaint collection:\n Error = ', error);
        reject({ type: 'error', problem: { ...error } });
      });

      // 2c) If type === "Delivered"
    } else if (notification.notificationType === 'Delivery') {
      console.log('SES email successfully delivered to email: ', notification.destination[i], '\n Saving email to Market Hero and Mongo cluster...');
      findSentEmailAndUpdate(MessageId, notification.notificationType)
      .then(({ type, purpose }) => {
        const results = createLeadConcurrently(MarketHero, notification.destination[i], {
          name: `!${type}`,
          description: purpose,
        })
        .catch((error) => {
          console.log('Error saving lead to Market Hero & Mongo Collection: ', error);
          reject({ type: 'error', problem: { ...error } });
        });
        console.log('Successfully saved new Lead: "', notification.destination[0], '" to Market Hero & Mongo Cluster.\nMarket Hero Result: ', results[0].data, '\nMongo Result: ', results[1]);
        resolve();
      });
    }
  });
});
