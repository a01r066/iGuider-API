import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let CitySchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('City', CitySchema);
