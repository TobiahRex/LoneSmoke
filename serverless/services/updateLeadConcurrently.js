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
const updateOldLead = (marketHeroModel, email, tagInfo) => Promise.all([
  marketHeroModel.createOrUpdateLead(email, tagInfo.name),
  marketHeroModel.updateMongoLead(email, tagInfo),
]);

export default updateOldLead;
