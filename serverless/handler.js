/* eslint-disable global-require, import/imports-first, no-console, no-unused-expressions */
if (!global._babelPolyfill) require('babel-polyfill');

import { Promise as bbPromise } from 'bluebird';
import handleSesDiscount from './services/handleSesDiscount';
import handleSesStatus from './services/handleSesStatus';
import verifyDB from './db/mongo/connection';

module.exports.sesDiscountHandler = (event, context) => {
  console.log('\nEVENT: ', JSON.stringify(event, null, 2));
  if (!event.body.userEmail || !event.body.type || !event.body.language) {
    return context.fail('Missing required arguments.') && context.done(null, { type: 'ERROR', problem: 'Missing required arguments!', ...event.body });
  }
  return verifyDB()
  .then(dbResults => handleSesDiscount({ event, ...dbResults }))
  .then((result) => {
    if (typeof result === 'string') {
      context.succeed && context.done(null, { message: `User has successfully been sent a "${result}" email.` });
    } else if (typeof result === 'object') {
      context.succeed && context.done(null, result);
    }
  })
  .catch((error) => {
    console.log('\nFINAL Lambda ERROR: \n', JSON.stringify(error, null, 2));
    context.fail('Ses discount failed.', JSON.stringify({ message: 'Ses Discount handler FAILED', ...error })) && context.done();
  });
};

module.exports.sesStatusHandler = (event, context) => {
  console.log('\nEVENT: ', JSON.stringify(event, null, 2));
  if (!event.body.notificationType || !event.body.mail) {
    context.fail('Missing required arguments.') && context.done(null, { type: 'ERROR', problem: 'Missing required arguments!', ...event.body });
  } else {
    verifyDB()
    .then(dbResults => handleSesStatus({ event, ...dbResults }))
    .then(() => {
      context.succeed && context.succeed({ message: 'Ses status has been successfully handled.' });
    })
    .catch((error) => {
      console.log('\nFINAL Lambda ERROR: \n', JSON.stringify(error, null, 2));
      context.fail && context.fail({ message: 'Ses Status handler FAILED', ...error });
    });
  }
};

module.exports.createNewEmail = (event, context) => {
  console.log('\nEVENT: ', JSON.stringify(event, null, 2));

  verifyDB()
  .then(({ dbModels: { Email } }) => Email.createEmail(event.body))
  .then((newEmail) => {
    console.log('final resolve.');
    context.succeed && context.succeed({ message: 'Created new Email.', newEmail });
  })
  .catch((error) => {
    console.log('\nFINAL Lambda ERROR: \n', JSON.stringify(error, null, 2));
    context.error && context.error({ message: 'FAILED: Could not Create new Email.', ...error });
  });
};

module.exports.deleteEmail = (event, context) => {
  console.log('\nEVENT: ', JSON.stringify(event, null, 2));
  if (!event.body.id) {
    console.log('ERROR: Did not provide necessary document _id to delete.');
    context.error && context.error({ message: 'Missing required ID field.' });
  } else {
    verifyDB()
    .then(({ dbModels: { Email } }) => bbPromise
    .fromCallback(cb2 => Email.findByIdAndRemove(event.body.id, cb2))) // eslint-disable-line
    .then(() => {
      context.succeed && context.succeed({ message: 'Successfully deleted Email.' });
    })
    .catch((error) => {
      console.log('\nFINAL Lambda ERROR: \n', JSON.stringify(error, null, 2));
      context.error && context.error({ message: 'FAILED: Could not Delete Email.  Verify _id is correct.', ...error });
    });
  }
};
