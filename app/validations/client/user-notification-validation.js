const Joi = require('joi');

const readNotificationValidation = {
  read: Joi.boolean().required(),
};

module.exports = {
  readNotificationValidation,
};
