const express = require("express");
const router = express.Router();
// const {
//   registerValidation,
//   loginValidation,
// } = require("../../middlewares/validation");

const checkJWT = require('../../middlewares/checkJWT');
const { register, login, logout } = require("../../controllers");

router.post("/register", register);
router.post("/login", checkJWT, login);
router.get("/logout", logout);

module.exports = router;
