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
    console.log('Email: ', Email);
    console.log('\nQuerying Mongo for Email to update...\nmessageId: ', msgId);
    let foundEmail = null;

    Email.find({}).exec().then(console.log);

    Email.find({}, (error, dbEmails) => {
      console.log('dbEmails: ', dbEmails);
      dbEmails.forEach((dbEmail) => {
        console.log('sentEmails: ', dbEmail.sentEmails);
        foundEmail = dbEmail.sentEmails.filter(sent => sent.messageId === msgId)[0];
      });
    });
    if (foundEmail) console.log('Found email!');
    else console.log('Did not find email.');

    Email.find({ 'sentEmails.messageId': msgId })
    .exec()
    .then((dbEmail) => {
      console.log('WTF????: ', dbEmail);
      if (!dbEmail) {
        console.log('Could not find any Sent emails with MessageId: ', msgId);
        reject({ type: 'error', problem: `Could not find sent email with id# ${msgId}` });
      }
      console.log('\nFound Email with MessageID: ', msgId);

      const emailsToSave = dbEmail.sentEmails.filter(sent => sent.messageId !== msgId)[0];

      dbEmail.sentEmails = [...emailsToSave, {
        messageId: msgId,
        sesStatus: status,
      }];
      console.log('\nSaving updated Email status...');
      return dbEmail.save({ new: true });
    })
    .then((updatedEmail) => {
      console.log('Updated sent emails for Email _id: ', updatedEmail._id);
      return Promise.resolve(updatedEmail);
    })
    .catch((error) => {
      console.log('\nThat query did not work: ', error);
      return Promise.reject('Query was unsuccessful.');
    });
    console.log('This shit is getting so fucking annoying.');
  };
  console.log('\nRECORDS: ', event.Records);
  event.Records.forEach((record, i, array) => {
    console.log('Preparing to handle ', i + 1, ' of ', array.length, ' records.');

    const {
      Sns: {
        Message,    // JSON stringified object
      },
    } = record;

    let notification = null;

    try {
      notification = JSON.parse(Message);
      console.log('\nSuccessfully parsed Sns Response Message.\nnotification: ', notification);
    } catch (error) {
      console.log('Could not parse Sns Message Body: ', error);
      reject({ type: 'error', problem: { ...error } });
    }

    const {
      notificationType,
      mail: {
        messageId,
        destination: destinations,
      },
    } = notification;
    console.log('notificationType: ', notificationType);
    // 2a) if type === "Bounce"
    if (notificationType === 'Bounce') {
      findSentEmailAndUpdate(messageId, notificationType)
      .then((updatedEmail) => {
        console.log('\nSuccessfully located and updated status for Email.');
        resolve(updatedEmail);
      });
      // 2b) if type === "Complaint"
    } else if (notificationType === 'Complaint') {
      findSentEmailAndUpdate(messageId, notificationType)
      .then((updatedEmail) => {
        console.log('Successfully updated email status!\nEmail subject: ', updatedEmail.subjectData, '\nStatus: ', notificationType);

        bbPromise.fromCallback(cb => Complaint.create({
          messageId,
          created: new Date(),
          email: destinations[i],
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
    } else if (notificationType === 'Delivery') {
      console.log('SES email successfully delivered to email: ', destinations[i], '\n Saving email to Market Hero and Mongo cluster...');
      findSentEmailAndUpdate(messageId, notificationType)
      .then(({ type, purpose }) => {
        const results = createLeadConcurrently(MarketHero, destinations[i], {
          name: `!${type}`,
          description: purpose,
        })
        .catch((error) => {
          console.log('Error saving lead to Market Hero & Mongo Collection: ', error);
          reject({ type: 'error', problem: { ...error } });
        });
        console.log('Successfully saved new Lead: "', destinations[i], '" to Market Hero & Mongo Cluster.\nMarket Hero Result: ', results[i].data, '\nMongo Result: ', results[1]);
        resolve();
      });
    }
    console.log('no matching type found.');
    reject();
  });
});
