const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/apiHelper");
const checkJWT = require("../../middlewares/authorization");
const {
  registrationValidation,
  loginValidation,
  changeSubscriptionValidation,
  verifyEmailValidation,
} = require("../../middlewares/validation");
const uploadMiddleware = require('../../middlewares/avatarMiddleware');

const {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController,
  changeSubscriptionController,
  changeAvatarController,
  verificationController,
  resendVerificationController,
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
  checkJWT,
  changeSubscriptionValidation,
  asyncWrapper(changeSubscriptionController)
);
router.patch(
  "/avatars",
  checkJWT,
  uploadMiddleware.single("avatar"),
  asyncWrapper(changeAvatarController)
);
router.get("/verify/:verificationToken", asyncWrapper(verificationController));
router.post(
  "/verify",
  verifyEmailValidation,
  asyncWrapper(resendVerificationController)
);

module.exports = router;
