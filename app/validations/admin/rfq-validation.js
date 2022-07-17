const Joi = require('joi');
const { RfqStatus } = require('app/utils/constant');

const updatePriceValidation = {
  admNote: Joi.string(),
  expAt: Joi.date(),
  products: Joi.array(),
  sta: Joi.array().valid(
    RfqStatus.REVIEWING,
    RfqStatus.RESPONDED,
    RfqStatus.DISCARDED
  ),
};

module.exports = {
  updatePriceValidation,
};
