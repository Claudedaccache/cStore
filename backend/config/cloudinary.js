const cloudinary = require("cloudinary").v2;

const ConnectCloudinary = async () => {
  cloudinary.config({
    cloud_name: process.env.CLDN_NAME,
    api_key: process.env.CLDN_API_KEY,
    api_secret: process.env.CLDN_SECRET_KEY,
  });
};

module.exports = ConnectCloudinary;
