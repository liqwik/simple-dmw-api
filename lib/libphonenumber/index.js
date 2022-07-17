const libPhoneInstance = require('google-libphonenumber');

const libPhoneUtil = libPhoneInstance.PhoneNumberUtil.getInstance();
const libPhoneFormat = libPhoneInstance.PhoneNumberFormat;

module.exports = {
  libPhoneInstance,
  libPhoneUtil,
  libPhoneFormat,
};
