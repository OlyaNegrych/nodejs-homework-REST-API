const AddContactSchema = require("../utils/validation/contactsValidation/addContactValidationSchema");
const UpdateContactSchema = require("../utils/validation/contactsValidation/updateContactValidationSchema");
const ChangeStatusSchema = require('../utils/validation/contactsValidation/changeStatusValidationSchema');
const RegisterUserSchema = require("../utils/validation/authValidation/registerValidationSchema");
const LoginUserSchema = require("../utils/validation/authValidation/loginValidationSchema");
const SubscriptionSchema = require("../utils/validation/authValidation/subscriptionValidationSchema");

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

const changeStatusValidation = (req, res, next) => {
  const validationResult = ChangeStatusSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json(validationResult.error.details);
  }
  next();
};

const registrationValidation = (req, res, next) => {
  const validationResult = RegisterUserSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json(validationResult.error.details);
  }
  next();
};

const loginValidation = (req, res, next) => {
  const validationResult = LoginUserSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json(validationResult.error.details);
  }
  next();
};

const changeSubscriptionValidation = (req, res, next) => {
  const validationResult = SubscriptionSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json(validationResult.error.details);
  }
  next();
};

module.exports = {
  addContactValidation,
  updateContactValidation,
  changeStatusValidation,
  registrationValidation,
  loginValidation,
  changeSubscriptionValidation
};
