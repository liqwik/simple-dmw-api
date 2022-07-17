const { khNum, enNum } = require('./constant');

const transformToKhNum = (englistNum) => {
  let result = '';

  englistNum.split('').forEach((val) => {
    const getEnNum = parseInt(val, 10);

    if (getEnNum) {
      result += khNum[getEnNum];
    }
  });

  return result;
};

const transformToEnNum = (khmerNum) => {
  let result = '';

  khmerNum.split('').forEach((val) => {
    const getKhNum = enNum[val];

    if (getKhNum) {
      result += getKhNum;
    }
  });

  return result;
};

module.exports = {
  transformToKhNum,
  transformToEnNum,
};
