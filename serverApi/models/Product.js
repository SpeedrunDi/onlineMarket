const mongoose = require("mongoose");
const idValidator = require('mongoose-id-validator');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    min: 0,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String
  },
  image: String
});

ProductSchema.plugin(idValidator, {message : 'Bad ID value for {PATH}'});
const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;