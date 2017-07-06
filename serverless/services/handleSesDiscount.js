/* eslint-disable no-console */

/**
* 1) Determine if the userEmail has already been sent a discount by checking Market Hero collection.
* 2a) If found, filter the email by language matching the requested langauge and send a Rejection Email.
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
  const { userEmail, type, language } = event.body;
  return MarketHero
  .checkForLead(userEmail)
  .then((dbUser) => { // eslint-disable-line
    if (dbUser && dbUser._id) {
      console.log('\nFound MarketHero lead for this user - Preparing to send rejection email...');

      Email
      .findEmailAndFilterLanguage(`${type}Rejected`, language)
      .then(filteredEmail => Email.sendEmail(userEmail, filteredEmail))
      .then(sesResponse => resolve(`Successfully sent REJECTION email.  SES RESPONSE = ${sesResponse}`));
      return 1;
    }
    console.log('\nNew user! Verifying they haven\'t blocked our emails...');
    return Complaint.findOne({ email: userEmail }).exec();
  })
  .then((dbComplaint) => {
    if (dbComplaint) {
      console.log(`${userEmail}, has classified our emails as "SPAM"`);
      resolve(`${userEmail}, has classified our emails as "SPAM"`);
      return 1;
    }
    console.log(`Sending "${type}" email now...'`);
    Email
    .findEmailAndFilterLanguage(type, language)
    .then(filteredEmail => Email.sendEmail(userEmail, filteredEmail))
    .then(sesStatus => resolve(`Successfully sent DISCOUNT email.  SES Response = ${sesStatus}`));
    return 1;
  })
  .catch((error) => {
    console.log(`Could not update SES Status.  ERROR = ${error}`);
    return reject(`Could not update SES Status.  ERROR = ${error}`);
  });
});
