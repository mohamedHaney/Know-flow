const path = require("path");
const multer = require("multer");

// Media Storage (both photos and videos)
const mediaStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../media")); // Changed to 'uploads' for general media
  },
  filename: function (req, file, cb) {
    if (file) {
      // Replacing ':' in the date string for Windows compatibility
      cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
    } else {
      cb(null, false);
    }
  },
});

// Media Upload Middleware (for both photos and videos)
const mediaUpload = multer({
  storage: mediaStorage,
  fileFilter: function (req, file, cb) {
    if (
      file.mimetype.startsWith("image") || // Allow images
      file.mimetype.startsWith("video")    // Allow videos
    ) {
      cb(null, true);
    } else {
      cb({ message: "Unsupported file format" }, false);
    }
  },
  limits: { fileSize: 1024 * 1024 * 100 }, // Increased file size limit to 100MB
});

module.exports = mediaUpload;
