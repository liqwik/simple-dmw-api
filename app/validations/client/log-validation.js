const Joi = require('joi');

const userLogValidate = {
  logMsg: Joi.string(),
  logType: Joi.string(),
  deviceId: Joi.string(),
  user: Joi.string(),
  ipAddr: Joi.string(),
};

module.exports = {
  userLogValidate,
};
