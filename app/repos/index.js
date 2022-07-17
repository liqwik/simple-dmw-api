const model = require('app/models');
const DocumentRepository = require('./document-repo');

const DocTypeRepository = require('./refs/doctype-repo');
const InstitutionRepository = require('./refs/institution-repo');
const InternalUserRepository = require('./users/internal-user-repo');
const UserRepository = require('./users/user-repo');

module.exports = {
  docTypeRepo: DocTypeRepository({
    model: model.DocTypeModel,
  }),
  internalUserRepo: InternalUserRepository({
    model: model.InternalUserModel,
  }),
  institutionRepo: InstitutionRepository({
    model: model.InstitutionModel,
  }),
  userRepo: UserRepository({ model: model.UserModel }),
  documentRepo: DocumentRepository({ model: model.DocumentModel }),
};
