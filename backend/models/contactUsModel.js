const mongoose = require("mongoose");

const contactUsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    familyName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    number: { type: Number, required: false },
    message: { type: String, required: true },
  },
  { minimize: false }
);

const contactUsModel =
  mongoose.models.contactUs || mongoose.model("contactUs", contactUsSchema);

module.exports = contactUsModel;
