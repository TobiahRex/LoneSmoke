/* eslint-disable no-console, no-constant-condition, no-unused-vars */
import mongoose from 'mongoose';
import createMarketHeroModel from './models/marketHero';
import createEmailModel from './models/email';
import createComplaintModel from './models/complaint';

mongoose.Promise = Promise;
const dotenv = require('dotenv').config({ silent: true }); //eslint-disable-line
const MONGO_DB = process.env.MONGO_URI;

if (!MONGO_DB) throw new Error(`MONGO_DB URI value is: ${MONGO_DB || 'undefined'}`);

let cachedDb = {
  connection: null,
  dbModels: {
    Email: null,
    Complaint: null,
    MarketHero: null,
  },
};
/**
 * 1) Checks for previous instance of database - "cachedDb".
 * 2) If instance has been found - checks state of connection.
 * 3a) If state === 1 ("connected") then return previous connection.
 * 3b) If state !== 1 (most likely "2" - "connecting") then use new connection.
 * 4) If making new connection: Connect to Mongo Cluster - set the size of available connections to the replica set to 100 concurrent connections.
 * 5) Assign new connection to "cachedDb" and return result to handler.js
 *
 *
 * @return {object} - Promise resolved with db connection.
*/
const verifyDb = () =>
new Promise((resolve) => {
  if (cachedDb.connection && (cachedDb.connection._readyState === 1)) {
    console.log('cachedDb.connection._readyState: ', cachedDb.connection._readyState, '\nFOUND PREVIOUS CONNECTION\n', '\nCurrent Connections: ', cachedDb.connection.base.connections);
    resolve(cachedDb);
  } else {
    const connection = mongoose.createConnection(MONGO_DB, { replset: { poolSize: 100 } });

    console.log('CREATED NEW CONNECTION: ', connection, '\nmongoose.connection.readyState: ', connection._readyState, '\nAll Connections:', connection.base);

    cachedDb = {
      connection,
      dbModels: {
        Email: createEmailModel(connection),
        Complaint: createComplaintModel(connection),
        MarketHero: createMarketHeroModel(connection),
      },
    };
    console.log('\n\nCACHED Connection: \n\n', cachedDb.connection);
    resolve(cachedDb);
  }
});

export default verifyDb;
