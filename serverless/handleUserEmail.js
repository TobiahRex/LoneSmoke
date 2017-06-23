
export default event =>
new Promise((resolve) => {
  console.log('\n@handleUserEmail: \n event: ', JSON.stringify(event, null, 2));
  resolve();
});
// 1a. check users email in the database.
// User.find({  })
// 1b. if a matching email is found - respond with an email that says - You've already received a discount for signing up.
// 1c. If there is no match found...
// 2a. Save the user's email into the database.
// 2b. Upon completion - send users email to market hero.
// 2c. Attach a tag to the user that identifies them as LoneSmoke customer.
// 2d. If both requests are successful...
