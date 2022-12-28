const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/apiHelper");
const checkJWT = require("../../middlewares/authorization");
const {
  registrationValidation,
  loginValidation,
} = require("../../middlewares/validation");

const {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController,
} = require("../../controllers/usersControllers");

router.post(
  "/register",
  registrationValidation,
  asyncWrapper(registrationController)
);
router.post("/login", loginValidation, asyncWrapper(loginController));
router.get("/logout", checkJWT, asyncWrapper(logoutController));

router.get("/current", checkJWT, asyncWrapper(getCurrentUserController));

module.exports = router;
