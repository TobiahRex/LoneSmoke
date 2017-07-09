/* eslint-disable no-use-before-define, no-console */
import { Promise as bbPromise } from 'bluebird';
import isEmail from 'validator/lib/isEmail';
import complaintSchema from '../schemas/complaint';

export default (db) => {
  /**
  * 1) Verifies input argument "email" format.
  * 2) Finds all Complaint documents.
  *
  * @param {string} email - Email data.
  *
  * @return {object} - Promise resolved with data.
  */
  complaintSchema.statics.addEmailComplaint = (email, messageId) =>
  new Promise((resolve, reject) => {
    if (!email || !messageId) {
      console.log(`Missing required arguments. "email": ${email || 'undefined'}. "messageId": ${messageId || 'undefined'}.  `);
      reject(`Missing required arguments. "email": ${email || 'undefined'}. "messageId": ${messageId || 'undefined'}.  `);
    } else {
      if (!isEmail(email)) {
        reject({ type: 'error', problem: `${email} - Is not a valid email.` });
      }
      bbPromise.fromCallback(cb => Complaint.create({ email }, cb))
      .then(() => {
        console.log('Successfully saved ', email, ' to Complaints list.');
        resolve();
      })
      .catch((error) => {
        console.log(`Could not create new Complaint document.  ERROR = ${error}`);
        reject(`Could not create new Complaint document.  ERROR = ${error}`);
      });
    }
  });

  const Complaint = db.model('Complaint', complaintSchema);
  return Complaint;
};
