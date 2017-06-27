/* eslint-disable no-use-before-define, no-console */
import { Promise as bbPromise } from 'bluebird';
import userSchema from '../schemas/userSchema';

export default (db) => {
  userSchema.statics.fetchUserProfile = userId =>
  new Promise((resolve, reject) => {
    User.findById(userId).exec()
    .then((dbUser) => {
      console.log(`
        User Found: ${dbUser._id}
        Sending updated profile to Client.
      `);
      resolve(dbUser);
    })
    .catch(error => reject(`
      Could Not find a user with this is: ${userId}

      Mongo ERROR: ${error}
      `),
    );
  });

  userSchema.statics.saveUserEmail = (userEmail) =>
  new Promise((resolve, reject) => {
    User.create({
      
    })
  });

  userSchema.statics.rejectUserEmail = userEmail =>
  new Promise((resolve, reject) => {
    User
    .findOne({ 'contactInfo.email': userEmail })
    .exec()
    .then((dbUser) => {
      if (dbUser) return User.rejectUserEmail();
      return User.saveUserEmail(userEmail);
    })
    .then(())
  });

  const User = db.model('User', userSchema);
  return User;
};
