import mongoose from 'mongoose';
import Review from './review';

let Schema = mongoose.Schema;

let LocationSchema = new Schema({
  location_name: {
      type: String,
      required: true
  },
  location_translated_name: String,
  addressline: String,
  city_id: Number,
  country_id: Number,
  countryisocode: String,
  star_rating: Number,
  geometry: {
    coordinate: {
      "longitude": Number,
      "latitude": Number
    }
  },
  url: String,
  checkin: String,
  checkout: String,
  numberrooms: Number,
  numberfloors: Number,
  photos: [String],
  overview: String,
  rates_from: Number,
  number_of_reviews: Number,
  rating_average: Number,
  telephone: String,
  reviews: [
    {type: Schema.Types.ObjectId,
    ref: 'Review'}
  ],
  subcategory_id: String,
  tags: [String]
});

module.exports = mongoose.model('Location', LocationSchema);
