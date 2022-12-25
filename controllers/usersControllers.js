const User = require("../models/users");
const httpError = require("../utils/httpError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const candidate = await User.findOne({ email });

    if (candidate) {
      throw new httpError(409, "Email in use");
    }

    const salt = bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hash(password, salt);

    const user = await new User({ email, hashedPassword });

      await user.save();
      
      res.status(200).json({ user });
      
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
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
            { expiresIn: '1h' }
        );

        await User.findOneAndUpdate({ email }, { token });

        res.status(200).json({ token });

    } catch (error) {
        next(error);
  }
};

const logout = async (req, res, next) => {
    try {
        const { user } = req;
        await User.findOneAndUpdate({_id: user.id}, {token: null})
        res.status(204)

    } catch (error) {
    next(error)    
  }
};


module.exports = {
  register,
  login,
  logout,
};