/* eslint-disable no-console, import/newline-after-import, import/imports-first */

require('dotenv').load({ silent: true });
import { Promise as bbPromise } from 'bluebird';
import createLeadConcurrently from './services/createLeadConcurrently';
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
export default ({ event, dbModels: { MarketHero, Complaint } }) =>
new Promise((resolve, reject) => {
  const {
    notificationType,     // string
    mail: {
      destination,        // [array]
      commonHeaders,      // {object}
    },
  } = event.body;

  // 2a) if type === "Bounce"
  if (notificationType === 'Bounce') {
    console.log('BOUNCED Email to ', destination[0], '\nSubject: ', commonHeaders.subject);
    resolve();

    // 2b) if type === "Complaint"
  } else if (notificationType === 'Complaint') {
    bbPromise.fromCallback(cb => Complaint.create({ // eslint-disable-line
      email: destination[0],
      subject: commonHeaders.subject,
      created: new Date(),
    }), cb) //eslint-disable-line
    .then((newComplaint) => {
      console.log('\n', newComplaint.email, ': successfully added to Complaint collections.');
      resolve();
    })
    .catch((error) => {
      console.log('\nError saving email to Complaint collection:\n Error = ', error);
      reject({ type: 'error', problem: { ...error } });
    });

    // 2c) If type === "Delivered"
  } else if (notificationType === 'Delivery') {
    console.log('SES email successfully delivered to email: ', destination[0], '\n Saving email to Market Hero and Mongo cluster...');
    const results = createLeadConcurrently(MarketHero, destination[0], {
      name: '!LS-beachDiscount',
      description: 'User received a 10% discount for submitting email at Zushi Beach 2017.',
    })
    .catch((error) => {
      console.log('Error saving lead to Market Hero & Mongo Collection: ', error);
      reject({ type: 'error', problem: { ...error } });
    });
    console.log('Successfully saved new Lead: "', destination[0], '" to Market Hero & Mongo Cluster.\nMarket Hero Result: ', results[0].data, '\nMongo Result: ', results[1]);
    resolve();
  }
});