const userModel = require("../models/userModel");

//adding to cart function
const addToCart = async (req, res) => {
  try {
    const { id, size } = req.body;
    const userId = req.user.id;

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const cartData = await userData.cartData;

    if (cartData[id]) {
      if (cartData[id][size]) {
        cartData[id][size] += 1;
      } else {
        cartData[id][size] = 1;
      }
    } else {
      cartData[id] = {};
      cartData[id][size] = 1;
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    console.log({ cartData });

    res.json({ success: true, message: "Added to cart", cartData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//updating from cart function
const updateCart = async (req, res) => {
  try {
    const { id, size, quantity } = req.body;
    const userId = req.user.id;

    const userData = await userModel.findById(userId);
    const cartData = await userData.cartData;

    if (quantity === 0) {
      if (cartData[id] && cartData[id][size]) {
        delete cartData[id][size];
        if (Object.keys(cartData[id]).length === 0) {
          delete cartData[id];
        }
      }
    } else {
      cartData[id][size] = quantity;
    }
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Cart updated successfully", cartData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//getting user cart  function
const getUserCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const userData = await userModel.findById(userId);
    const cartData = await userData.cartData;

    res.json({ success: true, cartData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { addToCart, updateCart, getUserCart };
