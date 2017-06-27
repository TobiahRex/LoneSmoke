const Schema = require('mongoose').Schema;

export const ObjectId = Schema.Types.ObjectId;
const userSchema = new Schema({
  contactInfo: {
    email: { type: String },
    locale: { type: String },
    timezone: { type: Number },
    location: {
      ipAddress: { type: String },
      lat: { type: String },
      long: { type: String },
      country: { type: String },
    },
    devices: [{
      hardware: { type: String },
      os: { type: String },
    }],
  },
  marketHero: {
    tags: [{
      name: { type: String },
      date: { type: Date },
    }],
  },
});
export default userSchema;
