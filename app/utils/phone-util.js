const { libPhoneUtil, libPhoneFormat } = require('lib/libphonenumber');

module.exports = {
  getValidPhoneNumber: (value, region) => {
    const phoneNumber = libPhoneUtil.parse(value, region || 'KH');

    return libPhoneUtil.format(phoneNumber, libPhoneFormat.E164);
  },
};
