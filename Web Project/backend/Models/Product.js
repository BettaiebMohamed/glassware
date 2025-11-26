var mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['PC', 'Laptop', 'Mouse', 'Keyboard', 'Monitor', 'Accessory'],
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  brand: {
    type: String,
    default: 'Unknown',
  },
  specs: {
    type: Map, 
    of: String,
  }
  
});



const Product = mongoose.model("Products", ProductSchema);
module.exports = Product;
