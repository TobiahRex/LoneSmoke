/* eslint-disable no-console, import/imports-first */
import MarketHero from '../db/mongo/models/marketHero';

/**
* 1) Concurrently calls MarketHero API and creates lead & Creates new MarketHero document with user email.
*
* @param {string} email - SesStatusObject.
* @param {object} tagInfo - { name, description }.
*
* @return [array{object}] - Promises: resolved.
*/
const createNewLead = async (email, tagInfo) => await Promise.all([
  MarketHero.createApiLead(email, tagInfo.name),
  MarketHero.createMongoLead(email, tagInfo),
]);
export default createNewLead;
