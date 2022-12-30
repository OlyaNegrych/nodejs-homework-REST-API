const {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  changeUserSubscription,
} = require("../services/userServices");

const registrationController = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await registerUser(email, password);

  res.status(200).json({ user });
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  const token = await loginUser({ email, password });

  res.status(200).json({ token });
};

const logoutController = async (req, res, next) => {
  const { user } = req;
  await logoutUser({ user });

  // res.status(204);
  res.status(200).json({ message: "User was logged out." });
};

const getCurrentUserController = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new httpError(401, "Unautorized");
  }
  const currentUser = await getCurrentUser(token);

  res.status(200).json({ currentUser });
};

const changeSubscriptionController = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new httpError(401, "Unautorized");
  }

  const { subscription } = req.body;

  const changedUserSubscription = await changeUserSubscription(
    token,
    subscription
  );

  if (!changedUserSubscription) {
    res.status(404).json({ message: "Not found" });
  }

  res
    .status(200)
    .json({ message: `User subscription type was changed on ${subscription}` });
};

module.exports = {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController,
  changeSubscriptionController,
};
