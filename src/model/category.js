import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String
});

module.exports = mongoose.model('Category', CategorySchema);
