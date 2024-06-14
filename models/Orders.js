import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  shippingAddressId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  orderItemsId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderItem",
    },
  ],
  status: {
    type: String,
    default: "Pending",
  },
  paymentMethod: {
    type: String,
    default: "Cash on Delivery",
  },
  totalAmount: {
    type: Number,
  },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;