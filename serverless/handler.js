/* eslint-disable global-require, import/imports-first */
if (!global._babelPolyfill) require('babel-polyfill');

// import axios from 'axios';

module.exports.discount = (event, context, cb) => {
  // 1a. check users email in the database.
  // 1b. if a matching email is found - respond with an email that says - You've already received a discount for signing up.
  // 1c. If there is no match found...
  // 2a. Save the user's email into the database.
  // 2b. Upon completion - send users email to market hero.
  // 2c. Attach a tag to the user that identifies them as LoneSmoke customer.
  // 2d. If both requests are successful...
  // 3a. Send user a 200 status code and an email that says - "Thank you for signing up with LoneSmoke.  Show this email when you pay and receive 10% off your meal.".
};
