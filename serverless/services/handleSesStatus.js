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
  event.Records.forEach((record, i, array) => { // eslint-disable-line
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
      console.log(`Could not parse Sns Message Body.  ERROR = ${error}`);
      reject(`Could not parse Sns Message Body.  ERROR = ${error}`);
    }

    const {
      notificationType,
      mail: {
        messageId,
        destination: destinations,
      },
    } = notification;

    // 2a) if type === "Bounce"
    if (notificationType === 'Bounce') {
      Email
      .findSentEmailAndUpdate(messageId, notificationType)
      .then((updatedEmail) => {
        console.log('\nSuccessfully located and updated status for Email.');
        resolve(updatedEmail);
      })
      .catch((error) => {
        console.log(`Could not update Email with status: "${notificationType}".  ERROR = ${error}`);
        reject(`Could not update Email with status: ${notificationType}.  ERROR = ${error}`);
      });

    // 2b) if type === "Complaint"
    } else if (notificationType === 'Complaint') {
      Email
      .findSentEmailAndUpdate(messageId, notificationType)
      .then((updatedEmail) => {
        console.log(`Successfully updated email: "${updatedEmail.subjectData}" with status: "${notificationType}".  `);

        return bbPromise.fromCallback(cb => Complaint.create({
          messageId,
          email: destinations[i],
          created: new Date(),
        }, cb));
      })
      .then((newComplaint) => {
        console.log(`Successfully added email: "${newComplaint.email}" to Complaint database.  `);
        resolve(`Successfully added email: "${newComplaint.email}" to Complaint database.  `);
      })
      .catch((error) => {
        console.log(`Could not update Email with status: ${notificationType}.  ERROR = ${error}`);
        reject(`Could not update Email with status: ${notificationType}.  ERROR = ${error}`);
      });

      // 2c) If type === "Delivery"
    } else if (notificationType === 'Delivery') {
      Email
      .findSentEmailAndUpdate(messageId, notificationType)
      .then((updatedEmail) => {
        console.log(`Successfully updated MONGO email: "${updatedEmail.subjectData}" with status: "${notificationType}".  `);

        return createLeadConcurrently(MarketHero, destinations[i], {
          name: `!${updatedEmail.type}`,
          description: updatedEmail.purpose,
        });
      })
      .then((results) => {
        console.log(`Successfully saved new Lead: "${destinations[i]}" to Market Hero & Mongo Cluster.  Market Hero Result: "${results[0]}". Mongo Result: "${results[1]}".  `);
        resolve(`Successfully saved new Lead: "${destinations[i]}" to Market Hero & Mongo Cluster.  Market Hero Result: "${results[0]}". Mongo Result: "${results[1]}".  `);
      })
      .catch((error) => {
        console.log(`Could not update Email with status: ${notificationType}.  ERROR = ${error}`);
        reject(`Could not update Email with status: ${notificationType}.  ERROR = ${error}`);
      });
    }
  });
});
