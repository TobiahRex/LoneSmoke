/* eslint-disable global-require, import/imports-first, no-console, no-unused-expressions */
if (!global._babelPolyfill) require('babel-polyfill');

import handleSesDiscount from './services/handleSesDiscount';
import handleSesStatus from './services/handleSesStatus';
import verifyDB from './db/mongo/connection';

module.exports.sesDiscountHandler = (event, context, cb) => {
  console.log('\nEVENT: ', JSON.stringify(event, null, 2));

  verifyDB()
  .then(dbResults => handleSesDiscount({ event, ...dbResults }))
  .then((type) => {
    if (type) {
      cb(null, { success: `User has successfully been sent a "${type}" email.` });
    }
    cb(null, { 'no-action': 'User has classified our emails as "SPAM".' });
  })
  .catch((error) => {
    console.log('\nFINAL Lambda ERROR: \n', JSON.stringify(error, null, 2));
    cb(error, 'Ses Discount handler FAILED');
  });
};

module.exports.sesStatusHandler = (event, context, cb) => {
  console.log('\nEVENT: ', JSON.stringify(event, null, 2));

  verifyDB()
  .then(dbResults => handleSesStatus({ event, ...dbResults }))
  .then(() => cb(null, { success: 'Ses status has been successfully handled.' }))
  .catch((error) => {
    console.log('\nFINAL Lambda ERROR: \n', JSON.stringify(error, null, 2));
    cb(error, 'Ses Status handler FAILED');
  });
};

module.exports.createNewEmail = (event, context, cb) => {
  console.log('\nEVENT: ', JSON.stringify(event, null, 2));

  verifyDB()
  .then(({ dbModels: { Email } }) => Email.createNewEmail(event.body.fields))
  .then(() => cb(null, { success: 'Created new Email.' }))
  .catch((error) => {
    console.log('\nFINAL Lambda ERROR: \n', JSON.stringify(error, null, 2));
    cb(error, 'FAILED: Could not Create new Email.');
  });
};

module.exports.deleteEmail = (event, context, cb) => {
  console.log('\nEVENT: ', JSON.stringify(event, null, 2));

  verifyDB()
  .then(({ dbModels: { Email } }) => Email.findByIdAndDelete(event.body.id).exec())
  .then(() => cb(null, { success: 'Successfully deleted Email.' }))
  .catch((error) => {
    console.log('\nFINAL Lambda ERROR: \n', JSON.stringify(error, null, 2));
    cb(error, 'FAILED: Could not Delete Email.  Verify _id is correct.');
  });
};
