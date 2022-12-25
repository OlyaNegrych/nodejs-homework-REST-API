const { User } = require("../db/userModel");

const registerUser = async ({ email, password }) => {
  // const contact = new Contact({ name, email, phone });
  // await contact.save();
  // return contact;
};

const loginUser = async (contactId) => {
  // const contact = await Contact.findById(contactId);

  // if (!contactId) {
  //   return { message: "Not found" };
  // }

  // return contact;
};


const logoutUser = async (contactId) => {
  // const contact = await Contact.findByIdAndRemove(contactId);

  // if (!contactId) {
  //   return { message: "Not found" };
  // }

  // return { message: "The contact was removed" };
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
