/* eslint-disable global-require, import/imports-first, no-console, no-unused-expressions */
if (!global._babelPolyfill) require('babel-polyfill');

import handleSesDiscount from './services/handleSesDiscount';
import handleSesStatus from './services/handleSesStatus';
import { startDB } from './db/mongo/connection';

module.exports.sesDiscountHandler = (event, context, cb) => {
  console.log('\nEVENT: ', JSON.stringify(event, null, 2));

  startDB()
  .then(dbResults => handleSesDiscount({ event, ...dbResults }))
  .then(type => cb(null, { success: `User has successfully been sent a ${type} email.` }))
  .catch((error) => {
    console.log('\nFINAL Lambda ERROR: \n', JSON.stringify(error, null, 2));
    cb(error, 'Ses Discount handler FAILED');
  });
};

module.exports.sesStatusHandler = (event, context, cb) => {
  console.log('\nEVENT: ', JSON.stringify(event, null, 2));

  startDB()
  .then(dbResults => handleSesStatus({ event, ...dbResults }))
  .then(type => cb(null, { success: `User has successfully been sent a ${type} email.` }))
  .catch((error) => {
    console.log('\nFINAL Lambda ERROR: \n', JSON.stringify(error, null, 2));
    cb(error, 'Ses Discount handler FAILED');
  });
};
