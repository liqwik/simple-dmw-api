const Joi = require('joi');

const storeTokenValidation = {
  tk: Joi.string().required(),
  dv: Joi.object().keys({
    id: Joi.string().required(),
    info: Joi.object(),
  }),
};

module.exports = {
  storeTokenValidation,
};
