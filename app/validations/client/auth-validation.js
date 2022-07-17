const Joi = require('joi');

const accVerifyValidate = {
  idtt: Joi.string().min(9).max(24).required(),
};

const authValidate = {
  idtt: Joi.string().min(9).max(24).required(),
  pwd: Joi.string().required(),
  tVfy: Joi.string().required(),
};

const registerValidate = {
  idtt: Joi.string().min(9).max(24).required(),
  pwd: Joi.string().required(),
  t: Joi.string(),
  idToken: Joi.string(),
  lat: Joi.number(),
  lng: Joi.number(),
  referrer: Joi.string(),
};

const resetPassValidate = {
  idtt: Joi.string().min(9).max(24).required(),
  pwd: Joi.string().min(6).max(80).required(),
  idToken: Joi.string(),
};

const refreshTokenValidate = {
  rt: Joi.string().required(),
};

const changePwdValidate = {
  oPwd: Joi.string().required(),
  nPwd: Joi.string().required(),
};

module.exports = {
  authValidate,
  accVerifyValidate,
  registerValidate,
  resetPassValidate,
  refreshTokenValidate,
  changePwdValidate,
};
