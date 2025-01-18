const jwt = require("jsonwebtoken");

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    console.log(token);

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    if (
      !token ||
      token_decode.id !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASS
    ) {
      return res.json({
        success: false,
        message: "Not Authorized for none Admin users",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

module.exports = adminAuth;
