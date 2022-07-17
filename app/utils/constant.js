const ROLE_SUPER_ADMIN = 'SUPER_ADMIN';
const ROLE_ADMIN = 'ADMIN';
const ROLE_OFFICER = 'OFFICER';
const ROLE_USER = 'USER';

const ALLOW_SUPER_ADMIN = [ROLE_SUPER_ADMIN];
const ALLOW_ADMIN = [ROLE_ADMIN, ROLE_SUPER_ADMIN];
const ALLOW_OFFICER = [ROLE_OFFICER, ROLE_ADMIN, ROLE_SUPER_ADMIN];
const ALLOW_USER = [ROLE_USER];

const BACKOFFICE_USER = [ROLE_SUPER_ADMIN, ROLE_ADMIN, ROLE_OFFICER];

const roleDefinition = {
  USER: 'user',
  ADMIN: 'admin',
  OFFICER: 'officer',
};

const roleToUserRole = {
  officer: ROLE_OFFICER,
  admin: ROLE_ADMIN,
  user: ROLE_USER,
};

const khNum = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
const enNum = {
  '០': 0,
  '១': 1,
  '២': 2,
  '៣': 3,
  '៤': 4,
  '៥': 5,
  '៦': 6,
  '៧': 7,
  '៨': 8,
  '៩': 9,
};

module.exports = {
  ROLE_SUPER_ADMIN,
  ROLE_ADMIN,
  ROLE_OFFICER,
  ROLE_USER,
  ALLOW_SUPER_ADMIN,
  ALLOW_ADMIN,
  ALLOW_OFFICER,
  ALLOW_USER,
  roleDefinition,
  roleToUserRole,
  BACKOFFICE_USER,
  khNum,
  enNum,
};
