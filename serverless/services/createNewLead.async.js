/* eslint-disable no-console, import/imports-first */
import MarketHero from '../db/mongo/models/marketHero';

export const createNewLead = async (email, tagInfo) => await Promise.all([
  MarketHero.createApiLead(email, tagInfo.name),
  MarketHero.createMongoLead(email, tagInfo),
]);

export const x = '';
