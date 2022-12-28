
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

  const token = await loginUser({email, password});

  res.status(200).json({ token });
};

const logoutController = async (req, res, next) => {
  const { user } = req;
  await logoutUser(user);
 
  res.status(204);
};

const getCurrentUserController = async (req, res, next) => {
  const currentUser = await getCurrentUser();

  res.status(200).json(currentUser);
};

const changeSubscriptionController = async (req, res, next) => {
  const { subscription } = req.body;
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  const changedUserSubscription = await changeUserSubscription(
    contactId,
    subscription,
    owner
  );

  if (!changedUserSubscription) {
    res.status(404).json({ message: "Not found" });
  }

  res.status(200).json({ message: "The subscription type was changed" });
};

module.exports = {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController,
  changeSubscriptionController,
};
