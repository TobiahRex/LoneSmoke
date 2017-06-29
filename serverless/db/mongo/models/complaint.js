/* eslint-disable no-use-before-define, no-console */
import isEmail from 'validator/lib/isEmail';
import complaintSchema from '../schemas/complaint';

export default (dbConnection) => {
  /**
 * 1) Verifies email - 2) If valid, saved email to Complaint collection:
 * Purpose: Have a record of emails that have tagged this apps Emails as "Spam" so as to never send again.
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
    Complaint.find({})
    .exec()
    .then(dbComplaints => dbComplaints
      .emails
      .push({ address: email, created: new Date() })
      .save()
    )
    .then(() => {
      console.log('Successfully saved ', email, ' to Complaints list.');
      resolve();
    });
  });

  const Complaint = dbConnection
    .model('Complaint', complaintSchema);
  return Complaint;
};
