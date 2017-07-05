/* eslint-disable global-require, import/imports-first, no-console, no-unused-expressions */
if (!global._babelPolyfill) require('babel-polyfill');

import { Promise as bbPromise } from 'bluebird';
import handleSesDiscount from './services/handleSesDiscount';
import handleSesStatus from './services/handleSesStatus';
import verifyDB from './db/mongo/connection';

module.exports.sesDiscountHandler = (event, context) => {
  console.log('\nEVENT: ', JSON.stringify(event, null, 2));
  if (!event.body.userEmail || !event.body.type || !event.body.language) {
    return context.fail({ message: 'Missing required arguments.' }) && context.done();
  }

  verifyDB()
  .then(dbResults => handleSesDiscount({ event, ...dbResults }))
  .then((result) => {
    console.log('Successfully handled Ses Discount.  RESULTS = ', result);
    return context.succeed('Successfully handled Ses Discount.') && context.done();
  })
  .catch((error) => {
    console.log(`Error handling Ses discount. ERROR = ${error}`);
    return context.fail(`Ses Discount handler. ERROR = ${error}`) && context.done();
  });
};

module.exports.sesStatusHandler = (event, context) => {  // eslint-disable-line
  console.log('\nEVENT: ', JSON.stringify(event, null, 2));

  verifyDB()
  .then(dbResults => handleSesStatus({ event, ...dbResults }))
  .then(result => (
    context.succeed(`Ses status has been successfully handled.  RESULT = ${result}`) && context.done()
  ))
  .catch((error) => {
    console.log(`Ses Status handler FAILED.  ERROR = ${error}`);
    return context.fail(`Ses Status handler FAILED.  ERROR = ${error}`) && context.done();
  });
};

module.exports.createNewEmail = (event, context) => { // eslint-disable-line
  console.log('\nEVENT: ', JSON.stringify(event, null, 2));

  if (Object.keys(event.body).length > 7) {
    console.log('ERROR: You provided unneccesary input arguments.');
    return context.fail('ERROR = You provided unnecessary input arguments.') && context.done();
  }

  verifyDB()
  .then(({ dbModels: { Email } }) => Email.createEmail(event.body))
  .then((newEmail) => {
    console.log('final resolve.');
    return context.succeed({ message: 'Created new Email.', newEmail }) && context.done();
  })
  .catch((error) => {
    console.log(`FAILED: Could not Create new Email.  ERROR = ${error}`);
    return context.fail(`FAILED: Could not Create new Email.  ERROR = ${error}`) && context.done();
  });
};

module.exports.deleteEmail = (event, context) => {  // eslint-disable-line
  console.log('\nEVENT: ', JSON.stringify(event, null, 2));
  const eventKeys = Object.keys(event.body);

  if (!eventKeys.includes('id')) {
    console.log('ERROR: Did not provide necessary document _id to delete.');
    return context.fail(JSON.stringify({ message: 'Missing required ID field.' })) && context.done();
  } else if (eventKeys.length > 1) {
    console.log(`ERROR: You provided too many input arguments.  ARGS = ${Object.keys(event.body)}`);
    return context.error(`ERROR: You provided too many input arguments.  ARGS = ${Object.keys(event.body)}`) && context.done();
  }

  verifyDB()
  .then(({ dbModels: { Email } }) => bbPromise.fromCallback(cb2 =>
    Email.findByIdAndRemove(event.body.id, cb2))) // eslint-disable-line
  .then(() => (
    context.succeed('Successfully deleted Email.') && context.done()
  ))
  .catch((error) => {
    console.log('\nFINAL Lambda ERROR: \n', JSON.stringify(error, null, 2));
    return context.error(`Could not Delete Email.  Verify _id is correct. ERROR= ${error}`) && context.done();
  });
};
