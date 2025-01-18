const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    cartItems: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        size: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    total: { type: Number, required: true },
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      enum: ["Stripe", "Cash on delivery"],
      default: "Stripe",
    },
    orderstatus: {
      type: String,
      enum: [
        "Order Placed",
        "Packing",
        "Shipped",
        "Out for Delivery",
        "Delivered",
      ],
      default: "Order Placed",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { minimize: false }
);

const orderModel =
  mongoose.models.Order || mongoose.model("Order", orderSchema);

module.exports = orderModel;
