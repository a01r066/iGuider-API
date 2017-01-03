'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String
});

module.exports = _mongoose2.default.model('Category', CategorySchema);
//# sourceMappingURL=category.js.map