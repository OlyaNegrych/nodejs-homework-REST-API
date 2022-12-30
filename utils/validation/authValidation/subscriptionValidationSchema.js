const Joi = require("joi");

const SubscriptionSchema = Joi.object({
  subscription: Joi.string(),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

module.exports = SubscriptionSchema;
