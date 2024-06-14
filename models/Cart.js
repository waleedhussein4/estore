import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

const cartItemsSchema = new mongoose.Schema({
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
  },
});

export const CartItems = mongoose.models.CartItems || mongoose.model("CartItems", cartItemsSchema);
