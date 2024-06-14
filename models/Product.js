import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  sku: {
    type: String,
    required: true,
  },
  stockQuantity: {
    type: Number,
    required: true,
  },
  mainImage: {
    type: String,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  discount: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;