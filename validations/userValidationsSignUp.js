const Joi = require('joi');

const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(8)
        .max(32)
        .trim()
        .messages({
            'string.alphanum': 'Username must only contain alphanumeric characters',
            'string.min': 'Username must be at least 8 characters long',
            'string.max': 'Username must not exceed 32 characters',
            'any.required': 'Username is required'
        })
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'edu', 'info']} })
        .required(),

     password: Joi.string()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};:\'",.<>?]).{8,32}$'))
        .required(),
        
    
    
    repeat_password: Joi.string()
    .valid(Joi.ref('password'))
    .messages({'any.only': 'passwords do not match'})
    .required(),


})

module.exports = schema;