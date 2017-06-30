import Schema from 'mongoose';

const complaintSchema = new Schema({
  emails: {
    address: { type: String, required: true },
    subject: { type: String, required: true },
    created: { type: Date, default: Date.now },
  },
});
export default complaintSchema;
