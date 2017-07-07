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
const checkSpam = (complaintModel, userEmail) =>
new Promise((resolve, reject) => {
  if (!complaintModel || !userEmail) {
    console.log('Missing required argument in "checkSpam."');
    reject('Missing required argument in "checkSpam".');
  } else {
    complaintModel
    .fineOne({ email: userEmail })
    .exec()
    .then((result) => {
      if (result) {
        console.log(`"${userEmail}", has classified our emails as "SPAM"`);
        return reject(`"${userEmail}", has classified our emails as "SPAM"`);
      }
      return resolve(null);
    })
    .catch(reject);
  }
});

const sendDiscountEmail = (complaintModel, emailModel, eventBody) => new Promise((resolve, reject) => {
  const { userEmail, type, language } = eventBody;
  if (
    !complaintModel ||
    !emailModel ||
    !userEmail ||
    !type ||
    !language
  ) {
    console.log('Missing required arguments in "sendRejectionEmail".');
    reject('Missing required arguments in "sendRejectionEmail".');
  } else {
    checkSpam(complaintModel, userEmail)
    .then(() => emailModel.findEmailAndFilterLanguage(type, language))
    .then(filteredEmail => emailModel.sendEmail(userEmail, filteredEmail))
    .then(() => resolve('Successfully sent DISCOUNT email.'))
    .catch(reject);
  }
});

// .then((dbComplaint) => {
//   if (dbComplaint === 'object') {
//     console.log(`"${userEmail}", has classified our emails as "SPAM"`);
//     resolve(`"${userEmail}", has classified our emails as "SPAM"`);
//     return 1;
//   }
//   console.log(`Sending "${type}" email now...'`);
//   Email
//   .findEmailAndFilterLanguage(type, language)
//   .then(filteredEmail => Email.sendEmail(userEmail, filteredEmail))
//   .then(sesStatus => resolve(`Successfully sent DISCOUNT email.  SES Response = ${sesStatus}`))
//   .catch(reject);
//   return 1;
// })

const sendRejectionEmail = (complaintModel, emailModel, eventBody) =>
new Promise((resolve, reject) => {
  const { userEmail, type, language } = eventBody;
  if (
    !complaintModel ||
    !emailModel ||
    !type ||
    !language ||
    !userEmail
  ) {
    console.log('Missing required arguments in "sendRejectionEmail".');
    reject('Missing required arguments in "sendRejectionEmail".');
  } else {
    checkSpam(complaintModel, userEmail)
    .then(() => emailModel.findEmailAndFilterLanguage(`${type}Rejected`, language))
    .then(filteredEmail => emailModel.sendEmail(userEmail, filteredEmail))
    .then(sesResponse => resolve(`Successfully sent REJECTION email.  SES RESPONSE = ${sesResponse}`))
    .catch(reject);
  }
});

export default ({ event, dbModels: { MarketHero, Email, Complaint } }) =>
new Promise((resolve, reject) => {
  MarketHero.checkForLead(event.body.userEmail)
  .then((dbUser) => {
    if (dbUser) {
      console.log('\nFound MarketHero lead for this user - Preparing to send rejection email...');
      return sendRejectionEmail(Complaint, Email, event.body);
    }
    console.log('\nNew user! Verifying they haven\'t blocked our emails...');
    return sendDiscountEmail(Complaint, Email, event.body);
  })
  .then(resolve)
  .catch((error) => {
    console.log(`Could not update SES Status.  ERROR = ${error}`);
    return reject(`Could not update SES Status.  ERROR = ${error}`);
  });
});
