/* eslint-disable no-console, import/newline-after-import, import/imports-first */

require('dotenv').load({ silent: true });
import Complaint from './db/mongo/models/complaint';
import createNewLead from './services/createNewLead.async';

export default notification =>
new Promise((resolve, reject) => {
  const keys = Object.keys(notification);
  const {
    source,
  } = notification;
  // if type === "Bounce"
  if (keys.includes('')) {

    // if type === "Complaint"
  } else if (keys.includes('')) {
    Complaint.find({})
    .exec()
    .then((dbComplaints) => {
      console.log('Before Save, total Complaints = ', dbComplaints.emails.length);
      dbComplaints.email.push(source);
      return dbComplaints.save({ new: true });
    })
    .then((savedComplaints) => {
      console.log('\nSuccessfully added ', source, ' to Complaint collection. \nTotal complaints = ', savedComplaints.emails.length);
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
