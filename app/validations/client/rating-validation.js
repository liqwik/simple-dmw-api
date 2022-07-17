const Joi = require('joi');

const rateProductValidate = {
  rateVal: Joi.number().min(1).max(5).required(),
  product: Joi.string().required(),
  comment: Joi.string(),
  assets: Joi.array(),
};

module.exports = {
  rateProductValidate,
};
