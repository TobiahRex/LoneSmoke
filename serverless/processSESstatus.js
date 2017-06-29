/* eslint-disable no-console */

require('dotenv').load({ silent: true });
import axios from 'axios';
import Complaint from './db/mongo/models';

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
    .((dbResult) => {
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
    async function newLead((email) => {
      const results = await Promise.all([

      ])
      .catch((error) => {
        console.log('Error while creating new Lead in Market Hero & Mongo cluster: ', error);
        reject();
      });
      resolve();
    });

  }
});
