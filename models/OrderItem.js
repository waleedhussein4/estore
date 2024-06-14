import mongoos from 'mongoose';

const orderItemSchema = new mongoos.Schema({
  orderId: {
    type: mongoos.Schema.Types.ObjectId,
    ref: "Order",
  },
  productId: {
    type: mongoos.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const OrderItem = mongoos.models.OrderItem || mongoos.model("OrderItem", orderItemSchema);

export default OrderItem;