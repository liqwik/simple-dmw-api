const BaseCRUDService = require('app/services/shared/base-crud-service');

const InstitutionService = function ({ institutionRepo }) {
  return {
    ...BaseCRUDService({
      repository: institutionRepo,
    }),
  };
};

module.exports = InstitutionService;
