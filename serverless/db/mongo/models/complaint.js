/* eslint-disable no-console */
import mongoose from 'mongoose';
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
  complaintSchema.statics.addEmailComplaint = email => {
    if (!isEmail(email)) return Promise.reject({ type: 'error', problem: `${email} - Is not a valid email.` });

    Complaint.find({})
    .exec()
    .then(dbComplaints => dbComplaints
      .emails
      .push(email)
      .save()
    )
    .then(() => {
      console.log('Successfully saved ', email, ' to Complaints list.');
      return Promise.resolve();
    })
  }
  const Complaint = mongoose.model('Complaint', complaintSchema);
  return Complaint;
};
