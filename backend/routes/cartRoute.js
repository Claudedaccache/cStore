const express = require("express");

const {
  addToCart,
  updateCart,
  getUserCart,
} = require("../controllers/cartController");
const userAuth = require("../middlewares/auth");

const cartRouter = express.Router();

cartRouter.post("/add", userAuth, addToCart);
cartRouter.get("/get", userAuth, getUserCart);
cartRouter.post("/update", userAuth, updateCart);

module.exports = cartRouter;
