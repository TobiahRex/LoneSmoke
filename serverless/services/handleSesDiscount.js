/* eslint-disable no-console */

/**
* 1) Check for valid inputs.
* 2) Look for user email in Mongo Complaint collection.
* 3a) If found - return rejected promise.
* 3b) If not found - return null.
*
* @param {object} comlaintModel - Mongo Collection: Complaint
* @param {string} userEmail - users email.
*
* @return {object} - Promise:
* resolve = null
* reject = error msg.
*/
const checkSpam = (complaintModel, userEmail) =>
new Promise((resolve, reject) => {
  if (!complaintModel || !userEmail) {
    console.log('Missing required argument in "checkSpam."');
    reject('Missing required argument in "checkSpam".');
  } else {
    complaintModel
    .findOne({ email: userEmail })
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

/**
* 1) Check for valid inputs.
* 2) Verify user has not classified emails as spam.
* 3a) If found - return rejected promise.
* 3b) If not found - Find requested email & filter by language.
* 4a) Send filtered email.
* 5) Return resolved promise with msg.
*
* @param {object} comlaintModel - Mongo Collection: Complaint
* @param {object} emailModel - Mongo Collection: Email
* @param {object} eventBody - event inputs: { userEmail, type, language }.
*
* @return {object} - Promise:
* resolve = success msg.
* reject = error msg.
*/
const sendDiscountEmail = (complaintModel, emailModel, eventBody) => new Promise((resolve, reject) => {
  const { userEmail, type, language } = eventBody;
  if (
    !complaintModel ||
    !emailModel ||
    !userEmail ||
    !type ||
    !language
  ) {
    console.log('Missing required arguments in "sendDiscountEmail".');
    reject('Missing required arguments in "sendDiscountEmail".');
  } else {
    checkSpam(complaintModel, userEmail)
    .then(() => emailModel.findEmailAndFilterLanguage(type, language))
    .then(filteredEmail => emailModel.sendEmail(userEmail, filteredEmail))
    .then(() => resolve('Successfully sent DISCOUNT email.'))
    .catch(reject);
  }
});
/**
* 1) Check for valid inputs.
* 2) Verify user has not classified emails as spam.
* 3a) If found - return rejected promise.
* 3b) If not found - Find reject email corresponding to requested email & filter by language.
* 4a) Send filtered email.
* 5) Return resolved promise with msg.
*
* @param {object} comlaintModel - Mongo Collection: Complaint
* @param {object} emailModel - Mongo Collection: Email
* @param {object} eventBody - event inputs: { userEmail, type, language }.
*
* @return {object} - Promise:
* resolve = null
* reject = error msg.
*/
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
    .then(() => resolve('Successfull sent REJECTION email.'))
    .catch(reject);
  }
});
/**
* 1) Check local db for any copies of input userEmail.
* 2a) If found - send rejection email.
* 2b) If not found - send resolved email.
*
* @param {object} event - entire event Lambda object.
* @param {object} dbModels - Mongo Collections: { MarketHero, Email, Complaint }
*
* @return {object} - Promise:
* resolve = success msg.
* reject = error msg.
*/
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
