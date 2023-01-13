const multer = require("multer");
// const { uuid } = require("uuidv4");
const path = require("path");

const FILE_DIR = path.resolve("./tmp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, FILE_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
    // const [, extension] = file.originalname.split(".");
    // cb(null, `${uuid()}.${extension}`);
  },
});

const uploadMiddleware = multer({ storage });

module.exports = uploadMiddleware;