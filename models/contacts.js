// const fs = require("fs").promises;
// const path = require("path");
// const { uid } = require("uid");
// const contactsPath = path.resolve("models/contacts.json");

const { Contact } = require("../db/contactModel");

const listContacts = async () => {
  const contacts = await Contact.find({});
  return { contacts };
  // res.json({ contacts });

  // try {
  //   const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
  //   console.log(data);
  //   return data;
  // } catch (error) {
  //   console.log(error);
  // }
};

const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);

  if (!contactId) {
    return { message: "Not found" };
  }

  return contact;

  // try {
  //   const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
  //   const contactById = data.filter((contact) => contact.id === contactId);
  //   if (!contactId) {
  //     return { message: "Not found" };
  //   }

  //   console.log(contactById);
  //   return contactById;
  // } catch (error) {
  //   console.log(error);
  // }
};

const addContact = async ({ name, email, phone }) => {
  const contact = new Contact({ name, email, phone });
  await contact.save();
  return contact;

  // try {
  //   const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
  //   const newContact = { id: uid(3), name, email, phone };
  //   data.push(newContact);
  //   await fs.writeFile(contactsPath, JSON.stringify(data), "utf8");
  //   console.log("The contact was added");
  //   return newContact;
  // } catch (error) {
  //   console.log(error);
  // }
};

const removeContact = async (contactId) => {
  const contact = await Contact.findByIdAndRemove(contactId);

  if (!contactId) {
    return { message: "Not found" };
  }

  return { message: "The contact was removed" };

  // try {
  //   const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
  //   const filteredContacts = JSON.stringify(
  //     data.filter((contact) => contact.id !== contactId)
  //   );
  //   await fs.writeFile(contactsPath, filteredContacts, "utf8");
  //   console.log("The contact was removed");
  //   return { message: "The contact was removed" };
  // } catch (error) {
  //   console.log(error);
  // }
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;

  await Contact.findByIdAndUpdate(contactId, { $set: { name, email, phone } });
  
  return { message: "The contact was updated" };

  // try {
  //   const data = JSON.parse(await fs.readFile(contactsPath, "utf8"));
  //   const { name, email, phone } = body;
  //   const index = data.findIndex((contact) => contact.id === contactId);
  //   const changedContact = { contactId, name, email, phone };
  //   data.splice(index, 1, changedContact);

  //   await fs.writeFile(contactsPath, JSON.stringify(data), "utf8");
  //   console.log("The contact was added");
  //   return changedContact;
  // } catch (error) {
  //   console.log(error);
  // }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
