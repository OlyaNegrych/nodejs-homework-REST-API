const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  changeContactStatus,
} = require("../services/contactServices");

const getContactsController = async (req, res, next) => {
  const { _id: owner } = req.user;
  let { page = 1, limit = 10, favorite=null } = req.query;
  limit = limit > 10 ? 10 : limit;
  const skip = (page - 1) * limit;

  const contactList = await listContacts(owner, skip, limit, favorite);

  res.status(200).json(contactList);
};

const getContactByIdController = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;

  const contactById = await getContactById(contactId, owner);

  res.status(200).json(contactById);
};

const addContactController = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { _id: owner } = req.user;

  const newContact = await addContact({ name, email, phone }, owner);

  res.status(201).json(newContact);
};

const deleteContactController = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;

  if (!req.params.contactId) {
    return res.status(404).json({
      message: "Not found",
    });
  }

  await removeContact(contactId, owner);

  res.status(200).json({ message: "The contact was deleted." });
};

const updateContactController = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const updatedContact = await updateContact(contactId, req.body, owner);

  if (!updatedContact) {
    res.status(404).json({ message: "Not found" });
  }

  res.status(200).json(updatedContact);
};

const changeStatusContactController = async (req, res, next) => {
  const { favorite } = req.body;
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  const changedContactStatus = await changeContactStatus(
    contactId,
    favorite,
    owner
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
