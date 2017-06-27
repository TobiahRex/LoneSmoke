/* eslint-disable no-use-before-define, no-console */
import { Promise as bbPromise } from 'bluebird';
import marketHero from '../schemas/marketHero';
require('dotenv').load({ silent: true });

export default (db) => {
  marketHero.statics.checkForUser = userEmail =>
  new Promise((resolve, reject) => {
    MarketHero.findOne({ 'lead.email': userEmail })
    .exec()
    .then(resolve)
    .catch(reject);
  });

  marketHero.statics.saveUserEmail = userEmaild =>
  new Promise((resolve, reject) => {
    MarketHero.create({
      lead: { userEmail },
      tags: [{
        name: '!beachDiscount',
        description: 'User signed up '
      }],
    });
  });

  marketHero.statics.addTagToUser = (userEmail, { name, description }) =>
  new Promise((resolve, reject) => {
    MarketHero.find({ 'lead.email': userEmail })
    .exec()
    .then((dbUser) => {
      let tags;

      if (Array.isArray(name)) {  // create tags array if adding multipls tags to lead
        tags = [...name];
      } else {
        tags = name;  // create single tag if only adding 1 tag to lead.s
      }

      const reqBody = {
        apiKey: process.env.MARKET_HERO_API_KEY,
        firstName: dbUser.lead.firstName,
        lastName: dbUser.lead.lastName,
        email: dbUser.lead.email,
        tags,
      }

      axios.post('https://private-anon-9aba81438f-markethero2.apiary-mock.com/v1/api/tag-lead',
      JSON.stringify(reqBody), {
        headers: { 'Content-Type': 'application/json'
      },
    })
    .then((response) => {
      if (response.status !== 200) {
        console.log(`
          Error updating lead# ${user.email};
          Response: ${JSON.stringify(response.data, null, 2)}
        `);
      }
      console.log(`
        Successfully updated ${user.email} on Market Hero.
        Response: ${response.data}
      `);
    })
    .catch((error) => {
      console.log(`
        ERROR = Market Hero API request failed.
        description: ${error}.
        `);
        reject(error);
      })
      dbUser.tags.push({ name, description });
      return dbUser.save({ new: true });
    })
    .then(resolve)
    .catch(reject);
  });

  marketHero.statics.rejectUserEmail = userEmail =>
  new Promise((resolve, reject) => {
    User
    .findOne({ 'contactInfo.email': userEmail })
    .exec()
    .then((dbUser) => {
      if (dbUser) return User.rejectUserEmail();
      return User.saveUserEmail(userEmail);
    })
    .then(() => )
  });

  const MarketHero = db.model('MarketHero', marketHero);
  return MarketHero;
};


request({
  method: 'POST',
  url: 'https://private-anon-9aba81438f-markethero2.apiary-mock.com/v1/api/tag-lead',
  headers: {
    'Content-Type': 'application/json'
  },
  body: "{  \"apiKey\": \"b12a19f4521d44abc8d613efca7f9c23c88\",  \"firstName\": \"John\",  \"lastName\": \"Doe\",  \"email\": \"John@doe.com\",  \"tags\": [    \"!Tag1\"  ]}"
}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});
