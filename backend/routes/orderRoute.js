const express = require("express");

const {
  addOrder,
  getOrders,
  userOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const userAuth = require("../middlewares/auth");
const adminAuth = require("../middlewares/adminAuth");

const orderRouter = express.Router();

//user orders
orderRouter.post("/addOrders", userAuth, addOrder);
orderRouter.get("/userOrders", userAuth, userOrders);

//admin get all orders
orderRouter.get("/allOrders", adminAuth, getOrders);
orderRouter.put("/updateOrderStatus", adminAuth, updateOrderStatus);

module.exports = orderRouter;
