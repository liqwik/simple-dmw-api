const { ROLE_PROF } = require('./constant');

const isProAccount = (userEntity) =>
  userEntity.pro && userEntity.pro.ph && userEntity.roles.includes(ROLE_PROF);

module.exports = {
  isProAccount,
};
