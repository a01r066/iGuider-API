import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let CountrySchema = new Schema({
  country_id: Number,
  country_name: {
    type: String,
    required: true
  },
  countryisocode: String
});

module.exports = mongoose.model('Country', CountrySchema);
