const express = require("express");
const upload = require("../middlewares/multer");

const {
  addProduct,
  listProduct,
  removeProduct,
  singleProduct,
} = require("../controllers/productController");
const adminAuth = require("../middlewares/adminAuth");

const productRouter = express.Router();

productRouter.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.get("/list", listProduct);
productRouter.post("/remove", adminAuth, removeProduct);
productRouter.get("/single", singleProduct);

module.exports = productRouter;
