const Joi = require('joi');

const userDeliveryAddrValidate = {
  addr: Joi.string().required(),
  loc: Joi.object({
    type: Joi.string().valid('Point').required(),
    coord: Joi.array().items(Joi.number(), Joi.number()),
  }).required(),
  remark: Joi.string().allow(''),
  label: Joi.string().allow(''),
};

module.exports = {
  userDeliveryAddrValidate,
};
