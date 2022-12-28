
const { registerUser, loginUser, logoutUser } = require("../services/userServices");

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

module.exports = {
  registrationController,
  loginController,
  logoutController,
};
