const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const HttpError = require("../helpers/httpError");
const { User } = require("../models/userModel");
const { replaceAvatar } = require("../helpers/avatarOptions");

const registerUser = async (email, password) => {
  const candidate = await User.findOne({ email });

  if (candidate) {
    throw new httpError(409, "Email in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const avatarURL = gravatar.url(email);
  //  const avatarURL = gravatar.url(email, {
  //    // s: "250",
  //    // r: "pg",
  //    // d: "404",
  //  });

  const user = new User({ email, password: hashedPassword, avatarURL });

  await user.save();

  return user;
};

const loginUser = async ({ email, password }) => {
  const candidate = await User.findOne({ email });
  const isPasswordCorrect = await bcrypt.compare(password, candidate.password);

  if (!candidate || !isPasswordCorrect) {
    throw new HttpError(401, "Wrong email or password");
  }

  const token = jwt.sign(
    { _id: candidate._id, email: candidate.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" }
  );

  await User.findByIdAndUpdate(candidate._id, { $set: { token } });

  return token;
};

const logoutUser = async (_id) => {
  await User.findByIdAndUpdate(_id, { $set: { token: null } });

  return { message: "The user was logged out" };
};

const getCurrentUser = async (token) => {
  const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await User.findById({ _id: payload._id });

  if (!user || !token) {
    throw new HttpError(401, "Unautorized");
  }

  const currentUser = { email: user.email, subscription: user.subscription };

  return currentUser;
};

const changeUserSubscription = async (token, subscription) => {
  const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await User.findById({ _id: payload._id });

  if (!user || !token) {
    throw new HttpError(401, "Unautorized");
  }

  await User.findOneAndUpdate({ _id: user._id }, { $set: { subscription } });

  return { message: `User subscription type was changed on ${subscription}` };
};

const changeUserAvatar = async (token, originalname, path, avatarURL) => {
  const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await User.findById({ _id: payload._id });

  if (!user || !token) {
    throw new HttpError(401, "Unautorized");
  }

  await User.findOneAndUpdate({ _id: user._id }, { $set: { avatarURL } });

  try {
    await replaceAvatar(originalname, path, avatarURL);
  } catch (error) {
    console.log(error);
  }

  return { message: "User avatar was changed." };
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  changeUserSubscription,
  changeUserAvatar,
};
