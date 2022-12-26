// const { User } = require("../db/userModel");
// const httpError = require("../utils/httpError");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const { registerUser, loginUser, logoutUser } = require("../models/users");

const registrationController = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await registerUser({email, password});

  res.status(200).json({ user });
};

const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  const token = await loginUser({ email, password });

  res.status(200).json({ token });
};

const logoutController = async (req, res, next) => {
  // try {
  //   const { user } = req;
  //   await User.findOneAndUpdate({ _id: user.id }, { token: null });
  //   res.status(204);
  // } catch (error) {
  //   next(error);
  // }
  // res.status(200).json({ token });
};

module.exports = {
  registrationController,
  loginController,
  logoutController,
};
