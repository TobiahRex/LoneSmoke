/* eslint-disable no-console, import/newline-after-import, import/imports-first */

require('dotenv').load({ silent: true });
import axios from 'axios';
import Complaint from './db/mongo/models/complaint';
import createNewLead from './services/createNewLead.async';

export default (notification) =>
new Promise((resolve, reject) => {
  const keys = Object.keys(notification);
  const {
    source
  } = notification;
  // if type === "Bounce"
  if (keys.includes('')) {

    // if type === "Complaint"
  } else if (keys.includes('')) {
    Complaint.find({})
    .exec()
    .then((dbResult) => {
      dbResult.email.push(source);
      return dbResult.save({ new: true });
    })
    .then((savedComplaint) => {
      console.log('\nSuccessfully added ', source, ' to Complaint collection. \n');
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
    console.log('Successfully saved lead# ', source, ' to Market Hero & Mongo Cluster.');
    resolve();
  };
});
