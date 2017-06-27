/* eslint-disable no-console */
import { closeDB } from './db/mongo/connection';

export default ({
  event: { userEmail },
  dbModels: { User },
  db,
}) => new Promise((resolve, reject) => {

  .then((result) => {
    console.log(`
      Results = ${result} -
      Closing database.
    `);
    closeDB(db);
  })
  .catch((error) => {
    console.log(`
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
