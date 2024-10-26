const Joi = require('joi');

function createSignInSchema() {
    return Joi.object({
        identifier: Joi.alternatives().try(
            Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'edu', 'info'] } }),
            Joi.string().alphanum().min(8).max(32),
            Joi.string().pattern(new RegExp('^\\+?[1-9]\\d{1,14}$'))
        )
        .messages({
            'alternatives.match': 'One of the fields is incorrect',
            'any.required': 'Email, username, or phone number is required'
        })
        .required(),

        password: Joi.string()
            .messages({
                'any.required': 'Password is required' 
            })
            .required()
    });
}

module.exports = createSignInSchema;
