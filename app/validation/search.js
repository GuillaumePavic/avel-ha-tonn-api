const Joi = require('joi');

const searchData = Joi.object({
    lat: Joi.number()
        .required(),
        //.message('latitude doit être un nombre'),

    lng: Joi.number()
        .required(),
        //.message('longitude doit être un nombre')
});

module.exports = searchData;