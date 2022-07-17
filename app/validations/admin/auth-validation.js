const Joi = require('joi');

const authValidate = {
  idtt: Joi.string().min(6).max(24).required(),
  pwd: Joi.string().required(),
};

module.exports = {
  authValidate,
};
