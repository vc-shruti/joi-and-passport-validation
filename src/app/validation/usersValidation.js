const Joi = require('@hapi/joi');


const bodySchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

module.exports = bodySchema;