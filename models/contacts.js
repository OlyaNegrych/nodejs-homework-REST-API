
const { Contact } = require("../db/contactModel");

const listContacts = async () => {
  const contacts = await Contact.find({});
  return { contacts };
};

const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);

  if (!contactId) {
    return { message: "Not found" };
  }

  return contact;
};

const addContact = async ({ name, email, phone }) => {
  const contact = new Contact({ name, email, phone });
  await contact.save();
  return contact;
};

const removeContact = async (contactId) => {
  const contact = await Contact.findByIdAndRemove(contactId);

  if (!contactId) {
    return { message: "Not found" };
  }

  return { message: "The contact was removed" };
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  await Contact.findByIdAndUpdate(contactId, { $set: { name, email, phone } });

  // const updatedContact = await Contact.findById(contactId);
  // return updatedContact;

   return { message: "The contact was updated" };
};

const changeContactStatus = async (contactId, status) => {
  await Contact.findByIdAndUpdate(contactId, { $set: { favorite: status } });
  console.log(status);
  // const changedContact = await Contact.findById(contactId);
  // return changedContact;
  return { message: "The status was changed" };
};
// changeContactStatus();

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  changeContactStatus,
};
