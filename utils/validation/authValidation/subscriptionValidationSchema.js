const Joi = require("joi");

const SubscriptionSchema = Joi.object({
  subscription: Joi.string("starter" || "pro" || "business"),
});

module.exports = SubscriptionSchema;
