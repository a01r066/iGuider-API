'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _location = require('./location');

var _location2 = _interopRequireDefault(_location);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var ReviewSchema = new Schema({
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

module.exports = _mongoose2.default.model('Review', ReviewSchema);
//# sourceMappingURL=review.js.map