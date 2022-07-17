const {
  generateToken,
  verifyPassword,
  detectIdentity,
} = require('app/utils/auth-util');
const { ROLE_SUPER_ADMIN, ROLE_ADMIN } = require('app/utils/constant');
const { jwtToken } = require('config');

const AuthService = function ({ internalUserRepo }) {
  return {
    boLogin: async (identity, password) => {
      if (!identity || !identity.length || !password)
        throw ErrorHandler(400, 'Identity and Password is require fields.');

      const identityObj = detectIdentity(identity);

      const entity = await internalUserRepo.findOne(identityObj);

      if (!entity) throw ErrorHandler(404, 'Entity not found');

      const isPwdAuth = await verifyPassword(password, entity.pwd);

      if (!isPwdAuth) throw ErrorHandler(409, 'Incorrect Password');

      const token = generateToken(entity._id, {
        type: 'bo',
        expiresIn: jwtToken.expiredAdminTokenIn,
      });

      const isAdmin =
        entity.roles[0] === ROLE_SUPER_ADMIN || entity.roles[0] === ROLE_ADMIN;

      return { t: token, isAdmin };
    },
  };
};

module.exports = AuthService;
