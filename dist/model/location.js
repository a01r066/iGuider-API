'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _review = require('./review');

var _review2 = _interopRequireDefault(_review);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var LocationSchema = new Schema({
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
  reviews: [{ type: Schema.Types.ObjectId,
    ref: 'Review' }],
  subcategory_id: String,
  tags: [String]
});

module.exports = _mongoose2.default.model('Location', LocationSchema);
//# sourceMappingURL=Location.js.map