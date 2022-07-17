const BaseCRUDService = require('app/services/shared/base-crud-service');

const DocTypeService = function ({ docTypeRepo }) {
  return {
    ...BaseCRUDService({
      repository: docTypeRepo,
    }),
  };
};

module.exports = DocTypeService;
