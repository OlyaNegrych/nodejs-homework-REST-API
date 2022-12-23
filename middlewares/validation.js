const AddContactSchema = require("../utils/validation/addContactValidationSchema");
const UpdateContactSchema = require("../utils/validation/updateContactValidationSchema");

const addContactValidation = (req, res, next) => {
  const validationResult = AddContactSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json(validationResult.error.details);
  }
  next();
};

const updateContactValidation = (req, res, next) => {
  const validationResult = UpdateContactSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json(validationResult.error.details);
  }
  next();
};

module.exports = { addContactValidation, updateContactValidation };
