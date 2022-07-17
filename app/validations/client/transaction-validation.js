const Joi = require('joi');

const poValidation = {
  cart: Joi.string().required(),
  shipping: Joi.object(),
  code: Joi.string(),
};

const poViaQuoteValidation = {
  shipping: Joi.object(),
  quote: Joi.string().required(),
  items: Joi.array(),
  deliverDate: Joi.date(),
};
module.exports = {
  poValidation,
  poViaQuoteValidation,
};
