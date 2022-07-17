const Joi = require('joi');

const addToCartValidate = {
  pd: Joi.string().required(),
  qty: Joi.number().required(),
};

const removeFromCartValidate = {
  pd: Joi.string().required(),
};

const updateCartValidate = {
  qty: Joi.number().required(),
};

module.exports = {
  addToCartValidate,
  removeFromCartValidate,
  updateCartValidate,
};
