const multer = require("multer");

// Configure multer diskStorage
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 },
  storage,
});

module.exports = upload;
