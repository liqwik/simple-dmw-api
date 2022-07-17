const BaseCRUDService = require('app/services/shared/base-crud-service');

const UserService = function ({ userRepo }) {
  return {
    ...BaseCRUDService({
      repository: userRepo,
    }),
  };
};

module.exports = UserService;
