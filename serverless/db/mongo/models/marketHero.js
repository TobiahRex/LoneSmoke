/* eslint-disable no-use-before-define, no-console */
import { Promise as bbPromise } from 'bluebird';
import marketHero from '../schemas/marketHero';

export default (db) => {
  marketHero.statics.checkForUser = userEmail =>
  new Promise((resolve, reject) => {
    MarketHero.find({})
    .exec()
    .then((dbResults) => {
      if (!dbResults.length) {
        resolve('');
      } else {
        const results = dbResults
        .leads
        .filter(({ email }) => email === userEmail);
        resolve(results);
      }
    });
  });

  marketHero.statics.saveUserEmail = userEmaild =>
  new Promise((resolve, reject) => {
    User.create({

    })
  });

  marketHero.statics.rejectUserEmail = userEmail =>
  new Promise((resolve, reject) => {
    User
    .findOne({ 'contactInfo.email': userEmail })
    .exec()
    .then((dbUser) => {
      if (dbUser) return User.rejectUserEmail();
      return User.saveUserEmail(userEmail);
    })
    .then(() => )
  });

  const MarketHero = db.model('MarketHero', marketHero);
  return MarketHero;
};
