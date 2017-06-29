/* eslint-disable no-console, import/imports-first */
import MarketHero from '../db/mongo/models/marketHero';

export const createNewLead = async email => await Promise.all([
  MarketHero.createApiLead(email, '!LS-beachDiscount'),
  MarketHero.createMongoLead(email),
]);

export const x = '';
