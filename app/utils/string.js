const capitalize = (s) => {
  if (typeof s !== 'string') return s;

  return s.charAt(0).toUpperCase() + s.slice(1);
};

const slugify = (value) => {
  if (typeof value !== 'string') return value;

  return value.replace(/\s+/g, '_').replace(/&/g, 'and').replace(/'/g, '');
};

const formatDate = (date) => {
  const d = new Date(date);
  let month = d.getMonth() + 1;
  let day = d.getDate();
  const year = d.getFullYear().toString().substr(-2);

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return `${year}${month}${day}`;
};

const randomNumber = (length) =>
  Math.floor(
    10 ** length - 1 + Math.random() * (10 ** length - (10 ** length - 1) - 1)
  ).toString();

const generateOrderNo = () => {
  const currentDate = new Date();
  const date = formatDate(currentDate);

  let orderNo = `HA-${date}`;
  let now = +currentDate;

  now = now.toString().slice(8, 13);
  now += randomNumber(3);

  orderNo += now;

  return orderNo;
};

module.exports = {
  capitalize,
  slugify,
  randomNumber,
  generateOrderNo,
};
