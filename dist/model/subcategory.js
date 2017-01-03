'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var SubCategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  category_id: {
    type: String,
    required: true
  }
});

module.exports = _mongoose2.default.model('SubCategory', SubCategorySchema);
//# sourceMappingURL=subcategory.js.map