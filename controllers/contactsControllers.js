const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  changeContactStatus,
} = require("../models/contacts");

const getContactsController = async (req, res, next) => {
  const contactList = await listContacts();
  res.status(200).json(contactList);
};

const getContactByIdController = async (req, res, next) => {
  const contactById = await getContactById(req.params.contactId);

  res.status(200).json(contactById);
};

const addContactController = async (req, res, next) => {
  const { name, email, phone } = req.body;

  const newContact = await addContact({ name, email, phone });

  res.status(201).json(newContact);
};

const deleteContactController = async (req, res, next) => {
  if (!req.params.contactId) {
    return res.status(404).json({
      message: "Not found",
    });
  }

  await removeContact(req.params.contactId);

  res.status(200).json({ message: "The contact was deleted." });
};

const updateContactController = async (req, res, next) => {
  const updatedContact = await updateContact(req.params.contactId, req.body);

  if (!updatedContact) {
    res.status(404).json({ message: "Not found" });
  }

  res.status(200).json(updatedContact);
};

const changeStatusContactController = async (req, res, next) => {
  const { favorite } = req.body;

  const changedContactStatus = await changeContactStatus(
    req.params.contactId,
    favorite
  );

  if (!changedContactStatus) {
    res.status(404).json({ message: "Not found" });
  }

  res.status(200).json({ message: "The status was changed" });
};

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
  changeStatusContactController,
};
