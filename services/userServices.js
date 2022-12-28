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

const getCurrentUser = async () => {
 const token = req.headers.authorization?.split(" ")[1];

 if (!token) {
   throw new httpError(401, "Unautorized");
 }

 const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
 const user = await User.findOne({ _id: payload.id });

 if (!user || !token) {
   throw new httpError(401, "Unautorized");
 }

const currentUser = { email: user.email, suscription: user.subscription };
  
 req.user = user;
 req.token = token;

  return currentUser;
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
};
