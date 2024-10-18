const Joi = require('joi');

const today = new Date()
const minimumEightteenYearOld = new Date(today.setFullYear(today.getFullYear() - 18)) 

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

    birth_year: Joi.number()
        .integer()
        .min(1900)
        .max(minimumEightteenYearOld)
        .messages({
            'string.alphanum': 'Username must only contain alphanumeric characters',
            'string.min': 'Username must be at least 8 characters long',
            'string.max': 'Username must not exceed 32 characters',
            'any.required': 'Username is required'
        })
        .required(),
    
    phone_number: Joi.string()
        .pattern(/^\\+?[1-9]\\d{1,14}$/)
        .messages({
            'string.pattern.base': 'Phone number must be in E.164 format and contain 1 to 15 digits',
            'any.required': 'Phone number is required'
        })
        .required(),

})

module.exports = schema;