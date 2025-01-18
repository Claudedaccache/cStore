const productModel = require("../models/productModel");
const cloudinary = require("cloudinary").v2;

//  add a new product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      popular,
      onSolde,
      soldedPrice,
    } = req.body;

    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    const imageUrls = await Promise.all(
      images.map(async (file) => {
        let result = await cloudinary.uploader.upload(file.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: sizes,
      popular: popular === "true" ? true : false,
      image: imageUrls,
      date: Date.now(),
      onSolde: onSolde === "true" ? true : false,
      soldedPrice: soldedPrice,
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product has been added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//  list product
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//  removing a product
const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;

    const productToDelete = productModel.findByIdAndDelete(id);
    await productToDelete;
    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//  get a single product
const singleProduct = async (req, res) => {
  console.log({ req });

  try {
    const product = await productModel.findById(req.body.id);

    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

module.exports = { addProduct, listProduct, removeProduct, singleProduct };
