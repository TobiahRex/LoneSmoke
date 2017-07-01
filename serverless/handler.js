/* eslint-disable global-require, import/imports-first, no-console, no-unused-expressions */
if (!global._babelPolyfill) require('babel-polyfill');

import { Promise as bbPromise } from 'bluebird';
import handleSesDiscount from './services/handleSesDiscount';
import handleSesStatus from './services/handleSesStatus';
import verifyDB from './db/mongo/connection';

module.exports.sesDiscountHandler = (event, context, cb) => {
  console.log('\nEVENT: ', JSON.stringify(event, null, 2));

  verifyDB()
  .then(dbResults => handleSesDiscount({ event, ...dbResults }))
  .then((type) => {
    context.succeed && context.succeed();
    if (type) {
      cb(null, `User has successfully been sent a "${type}" email.`);
    }
    cb(null, { 'no-action': 'User has classified our emails as "SPAM".' });
  })
  .catch((error) => {
    console.log('\nFINAL Lambda ERROR: \n', JSON.stringify(error, null, 2));
    context.error && context.error(error);
    cb(error, 'Ses Discount handler FAILED');
  });
};

module.exports.sesStatusHandler = (event, context, cb) => {
  console.log('\nEVENT: ', JSON.stringify(event, null, 2));

  verifyDB()
  .then(dbResults => handleSesStatus({ event, ...dbResults }))
  .then(() => {
    context.succeed && context.succeed();
    cb(null, 'Ses status has been successfully handled.');
  })
  .catch((error) => {
    console.log('\nFINAL Lambda ERROR: \n', JSON.stringify(error, null, 2));
    context.error && context.error(error);
    cb(error, 'Ses Status handler FAILED');
  });
};

module.exports.createNewEmail = (event, context, cb) => {
  console.log('\nEVENT: ', JSON.stringify(event, null, 2));

  verifyDB()
  .then(({ dbModels: { Email } }) => Email.createEmail(event.body))
  .then(() => {
    console.log('final resolve.');
    context.succeed && context.succeed();
    cb(null, 'Created new Email.');
  })
  .catch((error) => {
    console.log('\nFINAL Lambda ERROR: \n', JSON.stringify(error, null, 2));
    context.error && context.error(error);
    cb(error, 'FAILED: Could not Create new Email.');
  });
};

module.exports.deleteEmail = (event, context, cb) => {
  console.log('\nEVENT: ', JSON.stringify(event, null, 2));

  verifyDB()
  .then(({ dbModels: { Email } }) => bbPromise
  .fromCallback(cb2 => Email.findByIdAndRemove(event.body.id, cb2))) // eslint-disable-line
  .then(() => {
    context.succeed && context.succeed();
    cb(null, 'Successfully deleted Email.');
  })
  .catch((error) => {
    console.log('\nFINAL Lambda ERROR: \n', JSON.stringify(error, null, 2));
    context.error && context.error(error);
    cb(error, 'FAILED: Could not Delete Email.  Verify _id is correct.');
  });
};
