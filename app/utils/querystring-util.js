const querystring = require('querystring');

const getFilterQuery = (filterString) => {
  if (!filterString) return filterString;

  return querystring.parse(filterString, ',', ':');
};

/**
 *
 * @param {String} searchValue - 'sample'
 * @param {Array} searchFields - ['name', 'slug']
 * @param {String} condition - '$or', '$and'
 * @returns {Object}
 */
const getSearchQuery = (searchValue, searchFields, condition) => {
  if (!searchValue || !searchFields || searchFields.length === 0) return null;

  const searchValueRE = new RegExp(searchValue, 'i');
  const searchCondition = condition || '$or';
  const searchQuery = { [`${searchCondition}`]: [] };

  searchFields.forEach((field) => {
    searchQuery[searchCondition].push({ [`${field}`]: searchValueRE });
  });

  return searchQuery;
};

module.exports = {
  getFilterQuery,
  getSearchQuery,
};
