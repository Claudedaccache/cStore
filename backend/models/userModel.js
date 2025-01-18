const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    lastname: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    confirmPassword: { type: String, require: true },
    cartData: { type: Object, default: {} },
    profileImage: { type: String, default: "" },
    aboutMe: { type: String, default: "" },
  },
  { minimize: false }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

module.exports = userModel;
