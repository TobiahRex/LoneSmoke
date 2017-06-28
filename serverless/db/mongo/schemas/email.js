const Schema = require('mongoose').Schema;

export const ObjectId = Schema.Types.ObjectId;
const emailSchema = new Schema({
  created: { type: Date, default: Date.now },
  purpose: { type: String, required: true },
  bodyHtmlData: { type: String, required: true },
  bodyTextData: { type: String, requried: true },
  bodyHtmlCharset: { type: String, default: 'utf8' },
  bodyTextCharset: { type: String, default: 'utf8' },
  subjectData: { type: String, required: true },
  subjectCharset: { type: String, default: 'utf8' },
  replyToAddress: { type: String, required: true },
});
export default emailSchema;
