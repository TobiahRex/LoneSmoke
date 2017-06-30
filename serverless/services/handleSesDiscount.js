/* eslint-disable no-console */

/**
* 1) Determine if the userEmail has already been sent a discount by checking Market Hero collection.
* 2a) If found, send a Rejection Email.
* 2b) If not found, verify user has not added classified our application emails as "spam" since last message had been sent.
* 3a) If email has not been added to Complaint collection, send the user a Discount email.
*
* @param {object} event - event.body = Top-Level SES status object.
* @param {object} dbModels - Mongo model instance(s).
*
* @return {object} - Promise: resolved - email type sent.
*/
export default ({ event, dbModels: { MarketHero, Email, Complaint } }) =>
new Promise((resolve, reject) => {
  const { userEmail } = event.body;

  MarketHero.checkForLead(userEmail)
  .then((dbUser) => {
    if (dbUser) {
      Email.sendEmail({
        to: userEmail,
        from: 'no-reply@lonesmoke.com',
        type: 'beachDiscountRejection',
      })
      .then(() => resolve('REJECTED DISCOUNT'));
    }
    return Complaint.find({ email: userEmail }).exec();
  })
  .then((dbComplaint) => {
    if (dbComplaint) {
      console.log(dbComplaint.email, ' has classified our emails as "SPAM"');
      return resolve();
    }
    console.log('New user has successfully signed up for 10% Discount.\nSending discount email now...');
    return Email.sendEmail({
      to: userEmail,
      from: 'no-reply@lonesmoke.com',
      type: 'beachDiscountCongratulations',
    });
  })
  .then(() => resolve('SUCCESSFUL DISCOUNT'))
  .catch((error) => {
    console.log(`
      (ERROR @ runEmailDiscount.js)
      Error = ${error}
    `);
    if (Object.prototype.hasOwnProperty.call(error, 'type')) {
      reject(error);
    } else {
      reject({ type: 'error', problem: { ...error } });
    }
  });
});
