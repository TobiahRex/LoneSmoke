/* eslint-disable global-require, import/imports-first, no-console, no-unused-expressions */
if (!global._babelPolyfill) require('babel-polyfill');

import handleUserEmail from './handleUserEmail';
// import { startDB } from './db/mongo/connection';

module.exports.discount = (event, context, cb) => {
  console.log('\nEVENT: ', event);
  // 3a. Send user a 200 status code and an email that says - "Thank you for signing up with LoneSmoke.  Show this email when you pay and receive 10% off your meal.".
  handleUserEmail(event)
  .then((results) => {
    console.log('\n >> FINAL Lambda SUCCESS response: \n', JSON.stringify(results, null, 2));
    context.succeed && context.succeed(results);
    cb(null, results);
  })
  .catch((error) => {
    console.log('\nFINAL Lambda ERROR: \n', JSON.stringify(error, null, 2));
    context.error && context.error(error);
  });
};
