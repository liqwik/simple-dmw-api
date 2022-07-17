const BaseCRUDService = require('app/services/shared/base-crud-service');
const { hashPassword } = require('app/utils/auth-util');
const { ROLE_ADMIN, ROLE_OFFICER } = require('app/utils/constant');

const InternalUserService = function ({ internalUserRepo }) {
  return {
    ...BaseCRUDService({
      repository: internalUserRepo,
    }),

    create: async ({
      username,
      email,
      password,
      firstname,
      lastname,
      userType,
    }) => {
      const hashedPassword = await hashPassword(password);
      let userRoles = [];

      if (userType.toLowerCase() === ROLE_ADMIN.toLowerCase()) {
        userRoles = [ROLE_ADMIN];
      } else if (userType.toLowerCase() === ROLE_OFFICER.toLowerCase()) {
        userRoles = [ROLE_OFFICER];
      }

      const userEntity = await internalUserRepo.create({
        usr: username,
        em: email,
        pwd: hashedPassword,
        fn: firstname,
        ln: lastname,
        roles: userRoles,
      });

      return userEntity;
    },

    update: async (id, { username, email, firstname, lastname, userType }) => {
      let userRoles = [];

      if (userType.toLowerCase() === ROLE_ADMIN.toLowerCase()) {
        userRoles = [ROLE_ADMIN];
      } else if (userType.toLowerCase() === ROLE_OFFICER.toLowerCase()) {
        userRoles = [ROLE_OFFICER];
      }

      const result = await internalUserRepo.update(
        id,
        {
          usr: username,
          em: email,
          fn: firstname,
          ln: lastname,
          roles: userRoles,
        },
        {
          runValidators: true,
        }
      );

      return result;
    },
  };
};

module.exports = InternalUserService;
