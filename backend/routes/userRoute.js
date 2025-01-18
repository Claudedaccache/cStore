const express = require("express");

const {
  loginUser,
  registerUser,
  adminLogin,
  updateUserProfile,
  deleteUser,
} = require("../controllers/userController");
const userAuth = require("../middlewares/auth");
const upload = require("../middlewares/multer");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.delete("/delete", userAuth, deleteUser);
userRouter.put(
  "/updateProfile",
  userAuth,
  upload.fields([{ name: "profileImage", maxCount: 1 }]),
  updateUserProfile
);

module.exports = userRouter;
