/* eslint-disable global-require, import/imports-first, no-console, no-unused-expressions */
if (!global._babelPolyfill) require('babel-polyfill');

import handleSesStatus from './handleSesStatus';
import { startDB } from './db/mongo/connection';

module.exports.discount = (event, context, cb) => {
  console.log('\nEVENT: ', JSON.stringify(event, null, 2));
  // 3a. Send user a 200 status code and an email that says - "Thank you for signing up with LoneSmoke.  Show this email when you pay and receive 10% off your meal.".
  startDB()
  .then(dbResults => handleSesStatus({ event, ...dbResults }))
  .then(() => cb(null, { success: 'Ses status has been successfully handled.' }))
  .catch((error) => {
    console.log('\nFINAL Lambda ERROR: \n', JSON.stringify(error, null, 2));
    cb(error, 'Ses status handling FAILED');
  });
};
