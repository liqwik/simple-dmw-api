const Joi = require('joi');

const createAppVersionValidate = {
  ios: Joi.string().required(),
  web: Joi.string().required(),
  android: Joi.string().required(),
  note: Joi.string(),
  status: Joi.number(),
  mustUpdate: Joi.boolean(),
};

const updateAppVersionValidate = {
  id: Joi.string(),
  ios: Joi.string().required(),
  web: Joi.string().required(),
  android: Joi.string().required(),
  note: Joi.string().allow(''),
  status: Joi.number(),
  mustUpdate: Joi.boolean(),
};

module.exports = {
  createAppVersionValidate,
  updateAppVersionValidate,
};
