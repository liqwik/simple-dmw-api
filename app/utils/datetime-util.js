const { dateLib } = require('lib/datetime');

const khmerNumbers = '០១២៣៤៥៦៧៨៩'.split('');
const khmerMonths =
  'មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ'.split(
    '_'
  );

const DateTimeUtil = {
  getKhmerDay: (day) =>
    day
      .toString()
      .split('')
      .reduce((prev, cur) => {
        prev += khmerNumbers[cur * 1];
        return prev;
      }, ''),

  getKhmerYear: (year) =>
    year
      .toString()
      .split('')
      .reduce((prev, cur) => {
        prev += khmerNumbers[cur * 1];
        return prev;
      }, ''),

  toLocalDate: (date) => {
    const localDate = dateLib(
      new Date(date).toLocaleString('km-KH', {
        timeZone: 'Asia/Phnom_Penh',
      })
    );

    return localDate.format('MMM DD, YYYY hh:mm A');
  },

  toKhmerDate: (date) => {
    const localDate = dateLib(new Date(date));

    const year = localDate.year();
    const month = localDate.month();
    const day =
      localDate.date() < 10 ? `0${localDate.date()}` : localDate.date();

    return `ថ្ងៃទី${DateTimeUtil.getKhmerDay(day)} ខែ${
      khmerMonths[month]
    } ឆ្នាំ${DateTimeUtil.getKhmerYear(year)}`;
  },
};

module.exports = DateTimeUtil;
