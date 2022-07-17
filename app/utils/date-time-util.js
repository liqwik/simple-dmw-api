const { dateLib } = require('lib/datetime');

module.exports = function () {
  const isOverTime = ({ dt, second }) => {
    const currentDate = dateLib().local();
    const d = dateLib.utc(dt).local();
    const diff = currentDate.diff(d, 's');
    second = second || 86400; // one day

    return diff > second;
  };

  return {
    isOverTime,
  };
};
