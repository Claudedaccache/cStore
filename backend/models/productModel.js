const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, require: true },
  description: { type: String, require: true },
  price: { type: Number, require: true },
  image: { type: Array, require: true },
  category: { type: String, require: true },
  subCategory: { type: String, require: true },
  sizes: { type: Array, require: true },
  popular: { type: Boolean },
  date: { type: Number, require: true },
  raking: { type: Number },
  reviews: { type: Number },
  onSolde: { type: Boolean },
  soldedPrice: {
    type: Number,
    default: 15,
    validate: {
      validator: (v) => !isNaN(v) && v >= 15,
      message: (props) =>
        `${props.value} is not a valid number for soldedPrice!`,
    },
  },
});

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

module.exports = productModel;
