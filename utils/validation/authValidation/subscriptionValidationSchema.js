const Joi = require("joi");

const SubscriptionSchema = Joi.object({
  subscription: Joi.string(),
  // subscription: Joi.enum(["starter", "pro", "business"]),
});

module.exports = SubscriptionSchema;
