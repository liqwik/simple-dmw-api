const BaseRepository = require('app/repos/base-repository');

const InternalUserRepository = function ({ model }) {
  const internalUserModel = model;

  return {
    ...BaseRepository(internalUserModel),
  };
};

module.exports = InternalUserRepository;
