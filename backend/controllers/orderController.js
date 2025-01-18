const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");

// Create a new order
const addOrder = async (req, res) => {
  try {
    const { cartItems, paymentMethod, shippingAddress, total } = req.body;
    const userId = req.user.id;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const formattedCartItems = Object.entries(cartItems).flatMap(
      ([productId, sizes]) =>
        Object.entries(sizes).map(([size, quantity]) => ({
          productId,
          size,
          quantity,
        }))
    );

    const newOrder = new orderModel({
      user: userId,
      cartItems: formattedCartItems,
      shippingAddress,
      paymentMethod,
      paymentStatus: "Pending",
      total,
      orderstatus: "Order Placed",
    });

    await newOrder.save();

    user.cartData = {};
    await user.save();

    res.status(201).json({ success: true, newOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// get all user orders
const userOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await orderModel
      .find({ user: userId })
      .populate("user")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// update the orders status in the admin
const updateOrderStatus = async (req, res) => {
  const { orderId, status } = req.body;

  if (!orderId || !status) {
    return res
      .status(400)
      .json({ success: false, message: "Order ID and status are required" });
  }

  try {
    await orderModel.findByIdAndUpdate(
      orderId,
      { orderstatus: status },
      { new: true }
    );

    res.status(200).json({ success: true, message: "Order status updated" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating order status",
      error: error.message,
    });
  }
};

// Get all orders (for admin)
const getOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find()
      .populate("user")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { addOrder, getOrders, userOrders, updateOrderStatus };
