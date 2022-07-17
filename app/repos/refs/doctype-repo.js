const BaseRepository = require('app/repos/base-repository');

const DocTypeRepository = function ({ model }) {
  const docTypeModel = model;

  return {
    ...BaseRepository(docTypeModel),
  };
};

module.exports = DocTypeRepository;
