const express = require("express");
const multer = require("multer");
const { uuid } = require("uuidv4");
const router = express.Router();
const path = require('path');

const { asyncWrapper } = require("../../helpers/apiHelper");
const { uploadController } = require("../../controllers/uploadController");

const FILE_DIR = path.resolve('./public/avatars');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, FILE_DIR);
    },
    filename: (req, file, cb) => {
        const [, extension] = file.originalname.split('.');
        cb(null, `${uuid()}.${extension}`);
    }
})

const uploadMiddleware = multer({ storage });

router.post("/upload", uploadMiddleware.single('avatar'), asyncWrapper(uploadController));
router.use("/download", express.static(FILE_DIR));

module.exports = router;
