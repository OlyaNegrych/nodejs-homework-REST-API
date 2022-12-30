const jwt = require("jsonwebtoken");
const User = require("../services/userServices");
const httpError = require("../helpers/httpError");

const checkJWT = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    // const [tokenType, token] = req.headers['authorization'].split(' ');

    if (!token) {
      throw new httpError(401, "Unautorized");
    }

    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // const user = await User.findOne({ _id: payload.id });

    if (!user || !token) {
      throw new httpError(401, "Unautorized");
    }

    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    next(error);
  }
};



module.exports = checkJWT;
