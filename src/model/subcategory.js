import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let SubCategorySchema = new Schema({
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

module.exports = mongoose.model('SubCategory', SubCategorySchema);
