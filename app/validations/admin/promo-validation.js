const Joi = require('joi');

const createPromoCodeValidation = {
  code: Joi.string().required(),
  desc: Joi.string(),
  discountType: Joi.string().valid('p', 'c', 'ccy', 'pct').required(),
  discountValue: Joi.number().required(),
  quota: Joi.number(),
  limitPurchasePrice: Joi.number(),
  startAt: Joi.string(),
  endAt: Joi.string(),
  stat: Joi.string(),
  quotaPerPerson: Joi.number(),
};

const updatePromoCodeValidation = {
  id: Joi.string(),
  code: Joi.string(),
  desc: Joi.string(),
  discountType: Joi.string().valid('p', 'c', 'ccy', 'pct'),
  discountValue: Joi.number(),
  quota: Joi.number(),
  limitPurchasePrice: Joi.number(),
  startAt: Joi.string(),
  endAt: Joi.string(),
  stat: Joi.string(),
  quotaPerPerson: Joi.number(),
};

module.exports = {
  createPromoCodeValidation,
  updatePromoCodeValidation,
};
