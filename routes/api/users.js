const express = require("express");
const router = express.Router();
const {
  registrationValidation,
  loginValidation,
} = require("../../middlewares/validation");

const checkJWT = require('../../middlewares/authorization');
const { registerController, loginController, logoutController } = require("../../controllers");

router.post("/register", registrationValidation, registerController);
router.post("/login", loginValidation, loginController);
router.get("/logout", checkJWT, logoutController);

module.exports = router;
