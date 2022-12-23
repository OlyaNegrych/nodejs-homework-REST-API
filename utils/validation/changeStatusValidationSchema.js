const Joi = require("joi");

const changeStatusSchema = Joi.object({ 
    favorite: Joi.boolean().required(), 
});

module.exports = changeStatusSchema;
