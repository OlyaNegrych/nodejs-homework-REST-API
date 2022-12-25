const { User } = require("../db/userModel");

const registrationUser = async ({ email, password }) => {
  const user = new User({ email, password });
  await user.save();
  return user;
};

const loginUser = async (userId) => {
  const user = await User.findById(userId);

  if (!userId) {
    return { message: "Not found" };
  }

  return user;
};


const logoutUser = async (userId) => {
  // const user = await Contact.findByIdAndRemove(userId);

  // if (!userId) {
  //   return { message: "Not found" };
  // }

  // return { message: "The contact was removed" };
};

module.exports = {
  registrationUser,
  loginUser,
  logoutUser,
};
