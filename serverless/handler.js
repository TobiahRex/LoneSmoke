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
  return verifyDB()
  .then(dbResults => handleSesDiscount({ event, ...dbResults }))
  .then((result) => {
    if (typeof result === 'string') {
      context.succeed({ message: `User has successfully been sent a "${result}" email.` }) && context.done();
    } else if (typeof result === 'object') {
      context.succeed({ message: { ...result } }) && context.done();
    }
  })
  .catch((error) => {
    console.log('\nFINAL Lambda ERROR: \n', JSON.stringify(error));
    context.fail(JSON.stringify({ message: 'Ses Discount handler FAILED', ...error })) && context.done();
  });
};

module.exports.sesStatusHandler = (event, context) => {  // eslint-disable-line
  console.log('\nEVENT: ', JSON.stringify(event, null, 2));
  if (!event.Records && !event.Records[0]) {
    return context.fail(JSON.stringify({ type: 'ERROR', problem: 'Missing required arguments!', ...event.Records })) && context.done();
  }
  verifyDB()
  .then(dbResults => handleSesStatus({ event, ...dbResults }))
  .then(() => {
    context.succeed({ message: 'Ses status has been successfully handled.' }) && context.done();
  })
  .catch((error) => {
    console.log('\nFINAL Lambda ERROR: \n', JSON.stringify(error, null, 2));
    context.fail({ message: 'Ses Status handler FAILED', ...error }) && context.done();
  });
};

module.exports.createNewEmail = (event, context) => { // eslint-disable-line
  console.log('\nEVENT: ', JSON.stringify(event, null, 2));
  if (Object.keys(event.body).length > 7) {
    console.log('ERROR: You provided unneccesary inputs.');
    return context.fail({ message: 'Too many input arguments.', args: { ...event.body } }) && context.done();
  }

  verifyDB()
  .then(({ dbModels: { Email } }) => Email.createEmail(event.body))
  .then((newEmail) => {
    console.log('final resolve.');
    context.succeed({ message: 'Created new Email.', newEmail }) && context.done();
  })
  .catch((error) => {
    console.log('\nFINAL Lambda ERROR: \n', JSON.stringify(error, null, 2));
    context.fail({ message: 'FAILED: Could not Create new Email.', error }) && context.done();
  });
};

module.exports.deleteEmail = (event, context) => {  // eslint-disable-line
  console.log('\nEVENT: ', JSON.stringify(event, null, 2));
  const eventKeys = Object.keys(event.body);
  if (!eventKeys.includes('id')) {
    console.log('ERROR: Did not provide necessary document _id to delete.');
    return context.fail({ message: 'Missing required ID field.' }) && context.done();
  } else if (eventKeys.length > 1) {
    console.log('ERROR: You provided unneccesary inputs.');
    return context.error({ message: 'Too many input arguments.', args: { ...event.body } }) && context.done();
  }
  verifyDB()
  .then(({ dbModels: { Email } }) => bbPromise
  .fromCallback(cb2 => Email.findByIdAndRemove(event.body.id, cb2))) // eslint-disable-line
  .then(() => {
    context.succeed({ message: 'Successfully deleted Email.' }) && context.done();
  })
  .catch((error) => {
    console.log('\nFINAL Lambda ERROR: \n', JSON.stringify(error, null, 2));
    context.error({ message: 'FAILED: Could not Delete Email.  Verify _id is correct.', ...error }) && context.done();
  });
};
