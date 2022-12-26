const express = require("express");
const router = express.Router();
const {
  registrationValidation,
  loginValidation,
} = require("../../middlewares/validation");

const checkJWT = require('../../middlewares/authorization');
const {
  registrationController,
  loginController,
  logoutController,
} = require("../../controllers");

router.post("/register", registrationValidation, registrationController);
router.post("/login", loginValidation, loginController);
router.get("/logout", checkJWT, logoutController);

module.exports = router;
