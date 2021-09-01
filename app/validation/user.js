const Joi = require('joi');

const userSchema = Joi.object({
    name: Joi.string()
    .required()
    .min(1)
        .message('le nom doit contenir au moins un caractère')
    .max(30)
        .message('le nom ne peut pas dépasser 50 caractères')
    .pattern(new RegExp('^[ a-zA-Z0-9\-_]{1,50}$'))
        .message('le nom peut seulement contenir des lettres, des chiffres, des espaces ainsi que les symboles - et _'),


    email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: true } })
        .message('format d\'email invalide'),
    
    password: Joi.string()
    .required()
    .min(8)
        .message('le mot de passe doit contenir au moins 8 caractères')
    .max(30)
        .message('le mot de passe ne peut pas dépasser 30 caractères')
    .pattern(new RegExp('^[&!?a-zA-Z0-9]{8,30}$'))
        .message('le mot de passe peut seulement contenit des lettres, des chiffres, les symboles &!?, et pas d\'espace')
});

module.exports = userSchema;