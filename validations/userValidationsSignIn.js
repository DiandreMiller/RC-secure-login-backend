const Joi = require('joi');

const signInSchema = Joi.object({
    identifier: Joi.alternatives().try(
        Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'edu', 'info']} }),
        Joi.string().alphanum().min(8).max(32),
        Joi.string().pattern(new RegExp('^\\+?[1-9]\\d{1,14}$'))
    ).required
    .messages({
        'alternatives.match':'One of the fields are incorrect',
        'any.required': 'Email, username, or phone number is required'
    }),
    password: Joi.string()
        .required()
        .messages({'any':'password is required'})

});

module.exports = signInSchema;