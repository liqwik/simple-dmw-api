/* eslint-disable arrow-body-style */
/**
 * @param {*} Model
 * @returns
 */
function BaseRepository(Model) {
  const findAll = (filter, opts) => Model.find(filter).select(opts.select);

  const find = (filter, opts) => {
    return Model.find(filter)
      .skip(opts.page)
      .limit(opts.limit)
      .sort(opts.sort)
      .select(opts.select);
  };

  const findOne = (...args) => {
    return Model.findOne(...args);
  };

  const findById = (...args) => {
    return Model.findById(...args);
  };

  const count = (filter) => {
    return Model.countDocuments(filter);
  };

  const create = (data) => {
    const entity = new Model(data);
    return Model.create(entity);
  };

  const update = (id, data, ...args) => {
    return Model.findByIdAndUpdate(id, { $set: data }, ...args);
  };

  const hardDelete = (id) => {
    return Model.findByIdAndRemove(id);
  };

  const softDelete = (id) => {
    return Model.findByIdAndUpdate(id, { $set: { isDeleted: true } });
  };

  return Object.freeze({
    model: Model,
    count,
    find,
    findAll,
    findOne,
    findById,
    create,
    update,
    hardDelete,
    softDelete,
  });
}

module.exports = BaseRepository;
