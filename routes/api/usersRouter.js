const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/apiHelper");
const checkJWT = require("../../middlewares/authorization");
const {
  registrationValidation,
  loginValidation,
  changeSubscriptionValidation,
} = require("../../middlewares/validation");

const {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController,
  changeSubscriptionController,
} = require("../../controllers/usersControllers");

router.post(
  "/register",
  registrationValidation,
  asyncWrapper(registrationController)
);
router.post("/login", loginValidation, asyncWrapper(loginController));
router.get("/logout", checkJWT, asyncWrapper(logoutController));
router.get("/current", checkJWT, asyncWrapper(getCurrentUserController));
router.patch(
  "/current",
  changeSubscriptionValidation,
  asyncWrapper(changeSubscriptionController)
);

module.exports = router;
