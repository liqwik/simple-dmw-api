const repository = require('app/repos');

const AuthService = require('./auth/auth-service');
const UserService = require('./users/user-service');
const DocTypeService = require('./refs/doctype-service');
const InstitutionService = require('./refs/institution-service');
const InternalUserService = require('./users/internal-user-service');
const DocumentService = require('./document-service');
const ReportService = require('./report-service');

module.exports = {
  authService: AuthService({
    internalUserRepo: repository.internalUserRepo,
  }),
  docTypeService: DocTypeService({
    docTypeRepo: repository.docTypeRepo,
  }),
  userService: UserService({
    userRepo: repository.userRepo,
  }),
  internalUserService: InternalUserService({
    internalUserRepo: repository.internalUserRepo,
  }),
  institutionService: InstitutionService({
    institutionRepo: repository.institutionRepo,
  }),
  documentService: DocumentService({
    documentRepo: repository.documentRepo,
  }),
  reportService: ReportService({
    docRepo: repository.documentRepo,
    docTypeRepo: repository.docTypeRepo,
  }),
};
