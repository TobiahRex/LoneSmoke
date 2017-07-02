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

  MarketHero.checkForLead(userEmail)
  .then((dbUser) => { // eslint-disable-line
    if (dbUser) {
      Email.findEmailAndFilterLanguage(`${type}Rejected`, language)
      .then(filteredEmail => Email.sendEmail(userEmail, filteredEmail))
      .then(sesResponse => resolve(sesResponse));
    } else {
      return Complaint.find({ email: userEmail }).exec();
    }
  })
  .then((dbComplaint) => {
    if (dbComplaint.length) {
      console.log(userEmail, ' has classified our emails as "SPAM"');
      return reject({ problem: 'Cannot send emails to that user because the user has classified our Emails as "abuse" aka "SPAM"' });
    }
    console.log('New user has successfully signed up for 10% Discount.\nSending discount email now...');
    return Email.findEmailAndFilterLanguage(type, language);
  })
  .then(filteredEmail => Email.sendEmail(userEmail, filteredEmail))
  .then(emailType => resolve(emailType))
  .catch((error) => {
    console.log('(ERROR @ handleSesDiscount.js) \nERROR: ', error);
    if (Object.prototype.hasOwnProperty.call(error, 'type')) {
      reject(error);
    } else {
      reject({ type: 'error', problem: { ...error } });
    }
  });
});
