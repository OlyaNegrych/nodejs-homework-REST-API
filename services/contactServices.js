
const { Contact } = require("../models/contactModel");

const listContacts = async (owner) => {

  const contacts = await Contact.find({ owner });
  return { contacts };
};

const getContactById = async (contactId, owner) => {
  const contact = await Contact.findOne({_id: contactId, owner});

  if (!contactId) {
    return { message: "Not found" };
  }

  return contact;
};

const addContact = async ({ name, email, phone }, owner) => {
  const contact = new Contact({ name, email, phone, owner });
  await contact.save();
  return contact;
};

const removeContact = async (contactId, owner) => {
  await Contact.findOneAndRemove({_id: contactId, owner});

  if (!contactId) {
    return { message: "Not found" };
  }

  return { message: "The contact was removed" };
};

const updateContact = async (contactId, body, owner) => {
  const { name, email, phone } = body;
  await Contact.findOneAndUpdate({_id: contactId, owner}, { $set: { name, email, phone } });

   return { message: "The contact was updated" };
};

const changeContactStatus = async (contactId, status, owner) => {
  await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    { $set: { favorite: status } }
  );

  return { message: "The status was changed" };
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  changeContactStatus,
};