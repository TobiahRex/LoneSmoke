/* eslint-disable no-console */
import { closeDB } from './db/mongo/connection';

export default ({
  event,
  dbModels: { MarketHero },
  db,
}) => new Promise((resolve, reject) => {
  const { userEmail } = event.body;

  MarketHero.checkForUser(userEmail)
  .then((results) => {
    if (Array.isArray(results) && results.length) {
      return MarketHero.rejectUserEmail(userEmail);
    }
    return MarketHero.saveUserEmail(userEmail);
  })
  .then((dbResponse) => {
    console.log(`
    (runEmailDiscount.js @ checkForUser.resolve)
    Results = ${dbResponse}
    `);
    return closeDB(db, dbResponse);
  })
  .then(resolve)
  .catch((error) => {
    console.log(`
    (runEmailDiscount.js @ checkForUser.catch)
    Error = ${error}
    `);
    reject(error);
  });
});
// 1a. check users email in the database.
// User.findOne({  })
// 1b. if a matching email is found - respond with an email that says - You've already received a discount for signing up.
// 1c. If there is no match found...
// 2a. Save the user's email into the database.
// 2b. Upon completion - send users email to market hero.
// 2c. Attach a tag to the user that identifies them as LoneSmoke customer.
// 2d. If both requests are successful...
