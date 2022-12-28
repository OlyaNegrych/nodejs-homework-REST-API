const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const httpError = require("../helpers/httpError");
const { User } = require("../models/userModel");

const registerUser = async (email, password) => {
  const candidate = await User.findOne({ email });

  if (candidate) {
    throw new httpError(409, "Email in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({ email, password: hashedPassword });

  await user.save();
  
  return user;
};

const loginUser = async ({email, password}) => {
  const candidate = await User.findOne({ email });
  const isPasswordCorrect = await bcrypt.compare(password, candidate.password);

  if (!candidate || !isPasswordCorrect) {
    throw new httpError(401, "Wrong email or password");
  }

  const token = jwt.sign(
    { _id: candidate._id, email: candidate.email },
    process.env.JWT_SECRET_KEY
    // { expiresIn: "1h" }
  );

  // await User.findOneAndUpdate({ email }, { token });

  return token;
};

const logoutUser = async (user) => {
  await User.findOneAndUpdate({ _id: user.id }, {token: null});
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
