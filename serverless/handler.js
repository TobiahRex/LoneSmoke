/* eslint-disable global-require, import/imports-first, no-console, no-unused-expressions */
if (!global._babelPolyfill) require('babel-polyfill');

import { Promise as bbPromise } from 'bluebird';
import handleSesDiscount from './services/handleSesDiscount';
import handleSesStatus from './services/handleSesStatus';
import verifyDB from './db/mongo/connection';
/**
 * 1) Receives event object containing user email, language, and type of Discount.
 * 2) Verifies user email is not already saved.
 * 3a) If found - sends a rejection email since user already received discount.
 * 3b) If not found - Performs 3 tasks.
 * 4) Checks if user has classified emails as "Spam" - Sending emails to users who've identified us as Spam is considered "SES abuse".
 * 5a) If not spam - Find email by "type".
 * 5b) Filter found email by "language".
 * 6) Send Email.
 * 7) Save a record of sent email with "messageId" from AWS in local db for updating delivery status later.
 *
 * @param {string} event.body.userEmail - Users email.
 * @param {string} event.body.type - Type of discount email to send.
 * @param {string} event.body.language - Language of the user.
 *
 * @return {object} - Promise resolved with data.
*/
module.exports.sesDiscountHandler = (event, context) => {
  console.log('\nEVENT: ', JSON.stringify(event, null, 2));
  if (event.body.userEmail === 'wakeup@stakinet.com') {
    console.log('WAKEUP LAMBDA');
    return context.succeed('Successfully invoked LAMBDA.') && context.done();
  } else if (
    !event.body.userEmail ||
    !event.body.type ||
    !event.body.language
  ) {
    return context.fail({ message: 'Missing required arguments.' }) && context.done();
  }

  return verifyDB()
  .then(dbResults => handleSesDiscount({ event, ...dbResults }))
  .then(result => context.succeed({ result }) && context.done())
  .catch(error => context.fail(error) && context.done());
};

/**
 * 1)
 *
 * @param {string} email - Email data.
 *
 * @return {object} - Promise resolved with data.
*/
module.exports.sesStatusHandler = (event, context) => {
  console.log('\nEVENT: ', JSON.stringify(event, null, 2));

  return verifyDB()
  .then(dbResults => handleSesStatus({ event, ...dbResults }))
  .then(result => context.succeed({ result }) && context.done())
  .catch(error => context.fail(error) && context.done());
};

module.exports.createNewEmail = (event, context) => { // eslint-disable-line
  console.log('\nEVENT: ', JSON.stringify(event, null, 2));

  return verifyDB()
  .then(({ dbModels: { Email } }) => Email.createEmail(event.body))
  .then(newEmail => context.succeed({ newEmail }) && context.done())
  .catch(error => context.fail(error) && context.done());
};

module.exports.deleteEmail = (event, context) => {  // eslint-disable-line
  console.log('\nEVENT: ', JSON.stringify(event, null, 2));

  const eventKeys = Object.keys(event.body);

  if (!eventKeys.includes('id')) {
    console.log('ERROR: Did not provide necessary document _id to delete.');
    return context.fail('Missing required input "id".') && context.done();
  } else if (eventKeys.length > 1) {
    console.log(`ERROR: You provided too many input arguments.  ARGS = ${Object.keys(event.body)}`);
    return context.error(`You provided too many input arguments.  ARGS = ${Object.keys(event.body)}`) && context.done();
  }

  return verifyDB()
  .then(({ dbModels: { Email } }) => bbPromise.fromCallback(cb2 =>
    Email.findByIdAndRemove(event.body.id, cb2)))
  .then(() => context.succeed('Successfully deleted Email.') && context.done())
  .catch(error => context.error(error) && context.done());
};
