const { getSearchQuery } = require('app/utils/querystring-util');

const BaseCRUDService = function ({ repository }) {
  const getList = async function (
    { filter, search, searchFields },
    { limit, page, sort, select }
  ) {
    const searchQuery = getSearchQuery(search, searchFields);
    const match = { ...filter, ...searchQuery };

    const data = await repository.find(match, {
      limit,
      page,
      sort,
      select,
    });

    if (!data || data.length === 0) return [];

    return data;
  };

  const getDetail = async function (id) {
    const data = await repository.findById(id);

    if (!data) return null;

    return data;
  };

  const create = async function (data) {
    const result = await repository.create(data);

    return result;
  };

  const update = async function (id, data) {
    const result = await repository.update(id, data, { new: true });

    return result;
  };

  const hardDelete = async function (id) {
    const result = await repository.hardDelete(id);

    return result;
  };

  const softDelete = async function (id) {
    const result = await repository.softDelete(id);

    return result;
  };

  const count = async function ({ filter, search, searchFields }) {
    const searchQuery = getSearchQuery(search, searchFields);
    const match = { ...filter, ...searchQuery };

    const result = await repository.count(match);

    return result;
  };

  return Object.freeze({
    count,
    getList,
    getDetail,
    create,
    update,
    hardDelete,
    softDelete,
  });
};

module.exports = BaseCRUDService;
