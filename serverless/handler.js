/* eslint-disable global-require, import/imports-first, no-console, no-unused-expressions */
if (!global._babelPolyfill) require('babel-polyfill');

import { Promise as bbPromise } from 'bluebird';
import handleSesDiscount from './services/handleSesDiscount';
import handleSesStatus from './services/handleSesStatus';
import verifyDB from './db/mongo/connection';

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
