/* eslint-disable no-console, import/imports-first */
import MarketHero from '../db/mongo/models/marketHero';

/**
* 1) Determines what type of notification has been received.
* 2a) If Bounce type - do nothing.
* 2b) If Complaint type - add to Complaint collection.
* 2c) If Delivered type - add to MarketHero collection & add to MarketHero leads collection via REST API.
*
* @param {string} email - SesStatusObject.
* @param {object} tagInfo - { name, description }.
*
* @return [{object}] - Promises: resolved.
*/
const createNewLead = async (email, tagInfo) => await Promise.all([
  MarketHero.createApiLead(email, tagInfo.name),
  MarketHero.createMongoLead(email, tagInfo),
]);
export default createNewLead;
