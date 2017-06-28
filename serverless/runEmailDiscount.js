/* eslint-disable no-console */
export default ({ event, dbModels: { MarketHero, Email } }) =>
new Promise((resolve, reject) => {
  const { userEmail } = event.body;

  MarketHero.checkForLead(userEmail)
  .then((dbUser) => {
    if (dbUser) {
      return Email.sendEmail({
        to: userEmail,
        from: 'no-reply@lonesmoke.com',
        type: 'beachDiscountRejection',
      });
    }
    return MarketHero.createLead(userEmail);
  })
  .then((newLead) => {
    console.log(`
      (SUCCESS @ runEmailDiscount.js)
      Results = ${newLead}
    `);
    return Email.sendEmail({
      to: newLead.lead.email,
      from: 'no-reply@lonesmoke.com',
      type: 'beachDiscountCongratulations',
    });
  })
  .then(({ status, response }) => {
    if (status === 200) return MarketHero.addTagToUser(userEmail, { name: '!beachDiscount', description: 'User received 10% discount at Zushi Beach 2017.' });
  })
  .catch((error) => {
    console.log(`
      (ERROR @ runEmailDiscount.js)
      Error = ${error}
    `);
    if (Object.prototype.hasOwnProperty.call(error, 'type')) {
      reject(error);
    } else {
      reject({ type: 'error', problem: { ...error } });
    }
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
