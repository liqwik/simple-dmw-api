const BaseRepository = require('app/repos/base-repository');

const InstitutionRepository = function ({ model }) {
  return {
    ...BaseRepository(model),
  };
};

module.exports = InstitutionRepository;
