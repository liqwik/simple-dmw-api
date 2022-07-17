const { roleDefinition } = require('./constant');

const transformRoleIntoType = (roles) =>
  roles.map((role) => roleDefinition[role]);

module.exports = {
  transformRoleIntoType,
};
