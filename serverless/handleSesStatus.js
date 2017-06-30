/* eslint-disable no-console, import/newline-after-import, import/imports-first */

require('dotenv').load({ silent: true });
import Complaint from './db/mongo/models/complaint';
import createNewLead from './services/createNewLead.async';
/**
* 1) Determines what type of notification has been received.
* 2a) If Bounce type - do nothing.
* 2b) If Complaint type - add to Complaint collection.
* 2) Creates new MarketHero document in Mongo Cluster..
* 3) Returns Resolved Promise.d.
*
* @param {object} notification - SesStatusObject.
*
* @return {object} - Promise: resolved - no data.
*/
export default notification =>
new Promise((resolve, reject) => {
  const keys = Object.keys(notification);
  const {
    source,
  } = notification;
  // if type === "Bounce"
  if (keys.includes('')) {
    // if type === "Complaint"
  } else if (keys.includes('complaintFeedbackType')) {
    return Complaint.create({
      email: source,
      created: new Date(),
    })
    .exec()
    .then((newComplaint) => {
      console.log('\nSuccessfully added ', source, ' to Complaint collection.');
      resolve();
    })
    .catch((error) => {
      console.log('\nError saving email to Complaint collection:\n Error = ', error);
      reject(error);
    });
  } else if (keys.incldues('smtpResponse')) {
    console.log('SES email successfully delivered to email: ', source, '\n Saving email to Market Hero and Mongo cluster...');
    const results = createNewLead(source)
    .catch((error) => {
      console.log('Error saving lead to Market Hero & Mongo Collection: ', error);
      reject();
    });
    console.log('Successfully saved lead# ', source, ' to Market Hero & Mongo Cluster.\nMarket Hero Result: ', results[0].data, '\nMongo Result: ', results[1].data);
    resolve();
  }
});
