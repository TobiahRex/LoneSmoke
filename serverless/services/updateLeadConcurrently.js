/* eslint-disable no-console, import/imports-first */

/**
* 1) Concurrently calls MarketHero API and creates lead & Creates new MarketHero document with user email.
*
* @param {instance} marketHeroModel - Mongo model instance.
* @param {string} email - SesStatusObject.
* @param {object} tagInfo - { name, description }.
*
* @return [array{object}] - Promises: resolved.
*/
const udpateLeadConcurrently = (marketHeroModel, language, email, tagInfo) => Promise.all([
  marketHeroModel.createOrUpdateLead(email, language, tagInfo.name),
  marketHeroModel.updateMongoLead(email, language, tagInfo),
]);

export default udpateLeadConcurrently;
