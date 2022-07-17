const { dateLib } = require('lib/datetime');

const DateTimeUtil = {
  toLocalDate: (date) => {
    const localDate = dateLib(
      new Date(date).toLocaleString('km-KH', {
        timeZone: 'Asia/Phnom_Penh',
      })
    );

    return localDate.format('MMM DD, YYYY hh:mm A');
  },
};

module.exports = DateTimeUtil;
