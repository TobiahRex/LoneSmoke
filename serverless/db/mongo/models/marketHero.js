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
  * 2) Calls MarketHero API, and creates new lead & adds tag(s) to new that lead.
  * 3a) Returns resolved Promise.
  * 3b) Returns error object { type: 'error', problem: {desc} }
  *
  * @param string userEmail - Email data.
  * @param string || [array] tag -  Tag data || Tags Data.
  *
  * @return {object} - Promise: resolved - no data.
  */
  marketHeroSchema.statics.createApiLead = (userEmail, tag) =>
  new Promise((resolve, reject) => {
    let tagInfo = null;

    if (Array.isArray(tag)) tagInfo = [...tag];
    else tagInfo = tag;

    const reqBody = {
      apiKey: process.env.MARKET_HERO_API_KEY,
      firstName: 'John',
      lastName: 'Doe',
      email: userEmail,
      tags: tagInfo,
    };
    axios.post('https://private-anon-9aba81438f-markethero2.apiary-mock.com/v1/api/tag-lead',
    JSON.stringify(reqBody), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(({ status, data }) => {
      if (status !== 200) {
        console.log(`
          Market Hero API Error:
          Cannot update lead# ${userEmail};
          Response: ${data}
        `);
        reject({ type: 'error', problem: data });
      }
      console.log(`
        Market Hero API Success:
        Created/Updated ${userEmail}.
        Response: ${data}
      `);
    });
  });

  /**
  * 1) Determines whether @param "tag" is an array or single string.
  * 2) Creates new MarketHero document in Mongo Cluster..
  * 3) Returns Resolved Promise.d.
  *
  * @param {string} userEmail - Email data.
  * @param {string || array} tag - Tag data.
  *
  * @return {object} - Promise: resolved - no data.
  */
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

      /**
      * 1) Determines whether @param "userName" is a valid email.
      * 2) Find the saved MarketHero document matching the email param.
      * 3) Populates the [tags] for the document.
      * 4) Saves the result.
      * 5) Return resolved promise - no data.
      *
      * @param {string} userEmail - Email data.
      * @param {object} tagDetails - { name, description }.
      *
      * @return {object} - Promise: resolved - no data.
      */
      marketHeroSchema.statics.addTagToUser = (userEmail, { name, description }) =>
      // First adds tags to Market Hero lead.  If successful adds tags to Mongo Lead document.
      new Promise((resolve, reject) => {
        if (!isEmail(userEmail)) reject({ type: 'error', problem: `${email} is not a valid email.` });
        let dbUserRef;

        MarketHero
        .find({ 'lead.email': userEmail })
        .exec()
        .then((dbUser) => {
          dbUserRef = dbUser;
          let tagInfo;

          // create tags array if adding multipls tags to lead.
          if (Array.isArray(name)) {
            tagInfo = [...name];
          } else {
            // create single tag if only adding 1 tag to lead.
            tagInfo = name;
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
