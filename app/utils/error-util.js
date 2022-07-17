const parseDuplicateErrorToObject = (keyValue) => {
  const result = [];

  Object.keys(keyValue).forEach((k) => {
    result.push({
      field: k,
      value: keyValue[k],
      msg: `"${keyValue[k]}" is already exist!`,
    });
  });

  return result;
};

module.exports = {
  parseDuplicateErrorToObject,
};
