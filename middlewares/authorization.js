const jwt = require("jsonwebtoken");
const User = require("../services/userServices");
require("dotenv").config();
const httpError = require("../helpers/httpError");

const checkJWT = async (req, res, next) => {
  try {
    const token = req.headers.autirization?.split(" ")[1];
    if (!token) {
      throw new httpError(401, "Unautorized");
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findOne({ _id: payload.id });

    if (!user || !token) {
      throw new httpError(401, "Unautorized");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkJWT;
