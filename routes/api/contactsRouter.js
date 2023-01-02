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

module.exports = router;
