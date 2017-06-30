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
export default ({ event, dbModels: { MarketHero, Email } }) =>
new Promise((resolve, reject) => {
  const { userEmail } = event.body;

  MarketHero.checkForLead(userEmail)
  .then((dbUser) => {
    if (dbUser) {
      return Email.sendEmail({
        to: userEmail,
        from: 'no-reply@lonesmoke.com',
        type: 'beachDiscountRejection',
      });
    }
    return Complaint.find({ email: userEmail }).exec();
  })
  .then((newLead) => {
    console.log(`
      (SUCCESS @ runEmailDiscount.js)
      Results = ${newLead}
    `);
    return Email.sendEmail({
      to: newLead.lead.email,
      from: 'no-reply@lonesmoke.com',
      type: 'beachDiscountCongratulations',
    });
  })
  .then((sesResponse) => {
    console.log(sesResponse, '\nNow adding tag to MarketHero lead.');

    return MarketHero.addTagToUser(userEmail, { name: '!beachDiscount', description: 'User received 10% discount at Zushi Beach 2017.' });
  })
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
// 1a. check users email in the database.
// User.findOne({  })
// 1b. if a matching email is found - respond with an email that says - You've already received a discount for signing up.
// 1c. If there is no match found...
// 2a. Save the user's email into the database.
// 2b. Upon completion - send users email to market hero.
// 2c. Attach a tag to the user that identifies them as LoneSmoke customer.
// 2d. If both requests are successful...
