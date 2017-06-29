/* eslint-disable no-use-before-define, no-console, import/newline-after-import */
import axios from 'axios';
import { Promise as bbPromise } from 'bluebird';
import marketHeroSchema from '../schemas/marketHero';
import Email from './email';
require('dotenv').load({ silent: true });

export default (db) => {
  marketHeroSchema.statics.checkForLead = userEmail =>
  new Promise((resolve, reject) => {
    MarketHero.findOne({ 'lead.email': userEmail })
    .exec()
    .then(resolve)
    .catch(reject);
  });
  /**
  * 1) Determines whether @param "tag" is an array or single string.
  * 2) Calls MarketHero API, and creates new lead.
  * 3) Returns result.
  *
  * @param {string} userEmail - Email data.
  * @param {string || array} tag
  *
  * @return {object} - Promise resolved with data.
  */
  marketHeroSchema.statics.createApiLead = (userEmail, tag) =>
  new Promise((resolve, reject) => {

  });

  marketHeroSchema.statics.createMongoLead = (userEmail, tag) =>
  new Promise((resolve, reject) => {
    let tags = null;
    if (Array.isArray(tag)) {
      tags = [...tag];
    } else {
      tags = [tag];
    }
    bbPromise.fromCallback(cb => MarketHero.create({
      lead: { email: userEmail },
      tags,
    }, cb))
    .then((newLead) => {
      console.log(`
        Created new lead in Mongo Database.
        New Lead: ${newLead}
        `);
        resolve(newLead);
      })
      .catch((error) => {
        console.log(`
          Could not create new Lead in Mongo Database.
          ERROR: ${error}
          `);
          reject(error);
        });
      });

      marketHeroSchema.statics.addTagToUser = (userEmail, { name, description }) =>
      // First adds tags to Market Hero lead.  If successful adds tags to Mongo Lead document.
      new Promise((resolve, reject) => {
        let dbUserRef;

        MarketHero
        .find({ 'lead.email': userEmail })
        .exec()
        .then((dbUser) => {
          dbUserRef = dbUser;
          let tags;

          // create tags array if adding multipls tags to lead.
          if (Array.isArray(name)) {
            tags = [...name];
          } else {
            // create single tag if only adding 1 tag to lead.
            tags = name;
          }

          const reqBody = {
            apiKey: process.env.MARKET_HERO_API_KEY,
            firstName: dbUser.lead.firstName,
            lastName: dbUser.lead.lastName,
            email: dbUser.lead.email,
            tags,
          };

          return axios
          .post('https://private-anon-9aba81438f-markethero2.apiary-mock.com/v1/api/tag-lead', JSON.stringify(reqBody), { headers: { 'Content-Type': 'application/json' } });
        })
        .then(({ status, data }) => {
          if (status !== 200) {
            console.log(`
              Market Hero API Error:
              Cannot update lead# ${userEmail};
              Response: ${data}
              `);
              reject(data);
            }
            console.log(`
              Market Hero API Success:
              Updated ${userEmail}.
              Response: ${data}
              `);
              return dbUserRef
              .tags
              .push({ name, description, date: new Date() })
              .save({ new: true });
            })
            .then((savedUser) => {
              console.log(`
                Mongo Save Success
                Lead# ${savedUser.lead.email} successfully updated in db.
                New Tags: ${savedUser.tags}.
                `);
                resolve(savedUser);
              })
              .catch((error) => {
                console.log(`
                  ERROR in "addTagToUser"
                  Error: ${error}.
                  `);
                  reject(error);
                });
              });

              const MarketHero = db.model('MarketHero', marketHeroSchema);
              return MarketHero;
            };
