const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.json({
        success: false,
        message: "Not Authorized, please LogIn!",
      });
    }

    const token = authHeader.split(" ")[1];

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // req.body.userId = token_decode.id;
    req.user = { id: token_decode.id };

    next();
  } catch (error) {
    console.log("Auth Error:", error);
    res.json({ success: false, message: error.message });
  }
};

module.exports = userAuth;
