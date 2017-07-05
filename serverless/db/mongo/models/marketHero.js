/* eslint-disable no-use-before-define, no-console, import/newline-after-import */
import axios from 'axios';
import { Promise as bbPromise } from 'bluebird';
import marketHeroSchema from '../schemas/marketHero';
require('dotenv').load({ silent: true });

export default (db) => {
  /**
  * 1) Determines if email is already saved to MarketHero collection.
  *
  * @param string userEmail - Email data.
  *
  * @return {object} - Promise: resolved - user info if found || nothing if not found.
  */
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
    let tagInfo = [];

    if (Array.isArray(tag)) tagInfo = tag;
    else tagInfo = [tag];

    let reqBody = {
      apiKey: process.env.MARKET_HERO_API_KEY,
      firstName: 'John',
      lastName: 'Doe',
      email: userEmail,
      tags: tagInfo // eslint-disable-line
    };
    reqBody = JSON.stringify(reqBody);
    console.log('MARKET HERO REQUEST BODY: ', reqBody);

    axios.post('https://api.markethero.io/v1/api/tag-lead', reqBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((res) => {
      console.log('\nSuccessfully posted to Market Hero: \nMarket Hero reponse: ', res);
      if (res.status !== 200) {
        console.log(`
          Market Hero API Error:
          Cannot update lead# ${userEmail};
          Response: ${JSON.stringify(res)}
        `);
        reject({ type: 'error', problem: { ...res } });
      }
      console.log(`
        Market Hero API Success:
        Created/Updated "${userEmail}".
        Response: ${JSON.stringify(res)}
      `);
    })
    .catch((error) => {
      console.log('\nError trying to saved Lead to market Hero: ', error);
      reject(`Error trying to save LEAD to MarketHero.  ERROR = ${error}`);
    });
  });

  /**
  * 1) Determines whether @param "tag" is an array or single string.
  * 2) Creates new MarketHero document in Mongo Cluster..
  * 3) Returns Resolved Promise.
  * 3b) Returns
  *
  * @param {string} userEmail - Email data.
  * @param {string || array} tag - Tag data.
  *
  * @return {object} - Promise: resolved - no data.
  */
  marketHeroSchema.statics.createMongoLead = (userEmail, tag) =>
  new Promise((resolve, reject) => {
    let tagInfo = null;

    if (Array.isArray(tag)) tagInfo = [...tag];
    else tagInfo = tag;

    return bbPromise.fromCallback(cb => MarketHero.create({
      lead: { email: userEmail },
      tags: Array.isArray(tagInfo) ? [...tagInfo] : [tagInfo],
    }, cb))
    .then((newLead) => {
      console.log(`
        Created new lead in Mongo Database.
        New Lead: ${newLead}
      `);
      return resolve(newLead);
    })
    .catch((error) => {
      console.log(`Error trying to save LEAD to Mongo Database.  ERROR = ${error}`);
      return reject(`Error trying to save LEAD to Mongo Database.  ERROR = ${error}`);
    });
  });

  const MarketHero = db.model('MarketHero', marketHeroSchema);
  return MarketHero;
};
