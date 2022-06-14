const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productsSchema = new Schema(
  {
    article: { type: String, require: true },
    price: { type: String, require: true },
    Stock: { type: Number, require: true },
    Image: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model("productsSchema", productsSchema);

//exportamos models
module.exports = Products;
