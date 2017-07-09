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
  complaintSchema.statics.addEmailComplaint = email =>
  new Promise((resolve, reject) => {
    if (!isEmail(email)) {
      reject({ type: 'error', problem: `${email} - Is not a valid email.` });
    }
    bbPromise.fromCallback(cb => Complaint.create({}, cb))
    .then(() => {
      console.log('Successfully saved ', email, ' to Complaints list.');
      resolve();
    })
    .catch((error) => {
      console.log(`Could not create new Complaint document.  ERROR = ${error}`);
      reject(`Could not create new Complaint document.  ERROR = ${error}`);
    });
  });

  const Complaint = db.model('Complaint', complaintSchema);
  return Complaint;
};
