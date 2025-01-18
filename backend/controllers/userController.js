const userModel = require("../models/userModel");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//  user login route
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "user does not exist, please register first !",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    const userProfile = {
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      aboutMe: user.aboutMe,
      profileImage: user.profileImage || null,
    };

    if (isMatch) {
      const token = createToken(user._id);
      res.json({ sucess: true, token, userProfile });
    } else {
      res.json({ sucess: false, message: "invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//  user register route
const registerUser = async (req, res) => {
  try {
    const { name, lastname, email, password, confirmPassword } = req.body;

    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.json({ success: false, message: "user already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "enter a valid email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "password must be stronger" });
    }
    if (password !== confirmPassword) {
      return res.json({ success: false, message: "passwords do not match" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new userModel({
      name,
      lastname,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// admin login route
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASS
    ) {
      const token = createToken(email + password);
      res.json({ success: true, token });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Invalid Credentials" });
  }
};

//update user Profile
const updateUserProfile = async (req, res) => {
  try {
    const { name, lastname, email, aboutMe } = req.body;
    const userId = req.user.id;

    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const updates = {};

    if (name && name !== user.name) {
      updates.name = name;
    }

    if (lastname && lastname !== user.lastname) {
      updates.lastname = lastname;
    }

    if (email && email !== user.email) {
      if (!validator.isEmail(email)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid email format" });
      }

      const emailExists = await userModel.findOne({ email });
      if (emailExists) {
        return res
          .status(400)
          .json({ success: false, message: "Email already in use" });
      }

      updates.email = email;
    }

    if (aboutMe !== undefined && aboutMe !== user.aboutMe) {
      updates.aboutMe = aboutMe;
    }

    if (req.files && req.files.profileImage) {
      const profileImage = req.files.profileImage[0];
      const result = await cloudinary.uploader.upload(profileImage.path, {
        folder: "profile_pics",
      });
      updates.profileImage = result.secure_url;
    }

    if (Object.keys(updates).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No changes detected" });
    }

    const updatedUser = await userModel.findByIdAndUpdate(userId, updates, {
      new: true,
    });

    res.json({
      success: true,
      message: "Profile updated successfully",
      userProfile: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const deletedUser = await userModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.json({ success: true, message: "Profile deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  loginUser,
  registerUser,
  adminLogin,
  updateUserProfile,
  deleteUser,
};
