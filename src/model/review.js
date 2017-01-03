import mongoose from 'mongoose';
import Location from './location';

let Schema = mongoose.Schema;
let ReviewSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  text: String,
  location_id: {
    type: Schema.Types.ObjectId,
    ref: 'Location',
    required: true
  }
});

module.exports = mongoose.model('Review', ReviewSchema);
