/* eslint-disable no-console, import/newline-after-import, import/imports-first */

require('dotenv').load({ silent: true });
import { Promise as bbPromise } from 'bluebird';
import Complaint from './db/mongo/models/complaint';
import createNewLead from './services/createNewLead.async';
/**
* 1) Determines what type of notification has been received.
* 2a) If Bounce type - do nothing.
* 2b) If Complaint type - add to Complaint collection.
* 2c) If Delivered type - add to MarketHero collection & add to MarketHero leads collection via REST API.
*
* @param {object} notification - SesStatusObject.
*
* @return {object} - Promise: resolved - no data.
*/
export default notification =>
new Promise((resolve, reject) => {
  const keys = Object.keys(notification);
  const { destination, commonHeaders } = notification;

  // 2a) if type === "Bounce"
  if (keys.includes('bounceType')) {
    console.log('Email to ', destination[0], 'BOUNCED.');
    resolve();

    // 2b) if type === "Complaint"
  } else if (keys.includes('complaintFeedbackType')) {
    bbPromise.fromCallback(cb => Complaint.create({ // eslint-disable-line
      email: destination[0],
      subject: commonHeaders.subject,
      created: new Date(),
    }), cb) //eslint-disable-line
    .then((newComplaint) => {
      console.log('\nSuccessfully added ', newComplaint.email, ' to Complaint collection.');
      resolve();
    })
    .catch((error) => {
      console.log('\nError saving email to Complaint collection:\n Error = ', error);
      reject(error);
    });

    // 2c) If type === "Delivered"
  } else if (keys.incldues('smtpResponse')) {
    console.log('SES email successfully delivered to email: ', destination[0], '\n Saving email to Market Hero and Mongo cluster...');
    const results = createNewLead(destination[0], {
      name: '!LS-beachDiscount',
      description: 'User received a 10% discount for submitting email at Zushi Beach 2017.',
    })
    .catch((error) => {
      console.log('Error saving lead to Market Hero & Mongo Collection: ', error);
      reject();
    });
    console.log('Successfully saved new Lead: "', destination[0], '" to Market Hero & Mongo Cluster.\nMarket Hero Result: ', results[0].data, '\nMongo Result: ', results[1].data);
    resolve();
  }
});
