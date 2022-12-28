const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/apiHelper");
const checkJWT = require("../../middlewares/authorization");
const {
  addContactValidation,
  updateContactValidation,
  changeStatusValidation,
} = require("../../middlewares/validation");

const {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
  changeStatusContactController,
} = require("../../controllers/contactsControllers");

router.use(checkJWT);

router.get("/", asyncWrapper(getContactsController));

router.get("/:contactId", asyncWrapper(getContactByIdController));

router.post("/", addContactValidation, asyncWrapper(addContactController));

router.delete("/:contactId", asyncWrapper(deleteContactController));

router.put(
  "/:contactId",
  updateContactValidation,
  asyncWrapper(updateContactController)
);

router.patch(
  "/:contactId/favorite",
  changeStatusValidation,
  asyncWrapper(changeStatusContactController)
);

//========================================================

// router.get("/", async (req, res, next) => {
//   const contactList = await listContacts();
//   res.status(200).json(contactList);
// });

// router.get("/:contactId", async (req, res, next) => {
//   const contactById = await getContactById(req.params.contactId);

//   res.status(200).json(contactById);
// });

// router.post("/", addContactValidation, async (req, res, next) => {
//   const { name, email, phone } = req.body;

//   const newContact = await addContact({ name, email, phone });

//   res.status(201).json(newContact);
// });

// router.delete("/:contactId", async (req, res, next) => {
//   if (!req.params.contactId) {
//     return res.status(404).json({
//       message: "Not found",
//     });
//   }

//   await removeContact(req.params.contactId);

//   res.status(200).json({ message: "The contact was deleted." });
// });

// router.put("/:contactId", updateContactValidation, async (req, res, next) => {
//   const updatedContact = await updateContact(req.params.contactId, req.body);

//   if (!updatedContact) {
//     res.status(404).json({ message: "Not found" });
//   }

//   res.status(200).json(updatedContact);
// });

// router.patch(
//   "/:contactId/favorite",
//   changeStatusValidation,
//   async (req, res, next) => {
//     const { favorite } = req.body;

//     const changedContactStatus = await changeContactStatus(
//       req.params.contactId,
//       favorite
//     );

//     if (!changedContactStatus) {
//       res.status(404).json({ message: "Not found" });
//     }

//     res.status(200).json({ message: "The status was changed" });
//   }
// );

module.exports = router;