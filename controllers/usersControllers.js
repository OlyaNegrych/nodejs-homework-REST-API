const { User } = require("../db/userModel");
const httpError = require("../utils/httpError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registrationUser, loginUser, logoutUser } = require("../models/users");

const registrationController = async (req, res, next) => {
  // const { email, password } = req.body;
  // const newUser = await registrationUser({ email, password });
  // res.status(201).json(newUser);

  try {

    const { email, password } = req.body;

    const candidate = await User.findOne({ email });

    if (candidate) {
      throw new httpError(409, "Email in use");
    }

    const salt = bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hash(password, salt);

    const user = new User({ email, hashedPassword });

      await user.save();

      res.status(200).json({ user });

  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {
  // const user = await loginUser(req.params.userId);
  // res.status(200).json(user);

  try {
    const { email, password } = req.body;

    const candidate = await User.findOne({ email });
    const isPasswordCorrect = bcrypt.compare(password, candidate.password);

    if (!candidate || !isPasswordCorrect) {
      throw new httpError(401, "Wrong email or password");
    }

    const token = jwt.sign(
      { id: candidate._id, email: candidate.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    await User.findOneAndUpdate({ email }, { token });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

const logoutController = async (req, res, next) => {
  try {
    const { user } = req;
    await User.findOneAndUpdate({ _id: user.id }, { token: null });
    res.status(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registrationController,
  loginController,
  logoutController,
};
