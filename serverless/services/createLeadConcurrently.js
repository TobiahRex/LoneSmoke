/* eslint-disable no-console, import/imports-first */

/**
* 1a) Concurrently call MarketHero API and create new lead
* 1b) Create new MarketHero document using user email to local DB.
*
* @param {instance} marketHeroModel - Mongo model instance.
* @param {string} langauge - req language.
* @param {string} email - users email.
* @param {object} tagInfo - { name, description }.
*
* @return [{object}] - Promises: resolved.
*/
const createNewLead = (marketHeroModel, language, email, tagInfo) => Promise.all([
  marketHeroModel.createOrUpdateLead(email, language, tagInfo.name),
  marketHeroModel.createMongoLead(email, language, tagInfo),
]);

export default createNewLead;
