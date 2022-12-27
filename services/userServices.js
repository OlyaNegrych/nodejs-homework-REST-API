const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const httpError = require("../helpers/httpError");
const { User } = require("../models/userModel");

const registerUser = async ({ email, password }) => {
  const candidate = await User.findOne({ email });

  if (candidate) {
    throw new httpError(409, "Email in use");
  }

  const salt = bcrypt.genSalt(10);
  const hashedPassword = bcrypt.hash(password, salt);
  // const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({ email, hashedPassword });

  await user.save();
  return user;
};

const loginUser = async ({ email, password }) => {
  const candidate = await User.findOne({ email });
  const isPasswordCorrect = bcrypt.compare(password, candidate.password);
  // const isPasswordCorrect = await bcrypt.compare(password, candidate.password);

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

const logoutUser = async (userId) => {
  const user = await Contact.findByIdAndRemove(userId);

  if (!userId) {
    return { message: "Not found" };
  }

  return { message: "The contact was removed" };

  // try {
  //   const { user } = req;
  //   await User.findOneAndUpdate({ _id: user.id }, { token: null });
  //   res.status(204);
  // } catch (error) {
  //   next(error);
  // }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
