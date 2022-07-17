const _ = require('lodash');

function cleanDataMapper(dirtyData) {
  return _.pickBy(
    dirtyData,
    (value) => !(value === undefined || value === null)
  );
}

module.exports = {
  cleanDataMapper,
};
