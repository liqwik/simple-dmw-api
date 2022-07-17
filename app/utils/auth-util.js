const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const dayjs = require('dayjs');
const { BACKOFFICE_USER } = require('app/utils/constant');
const { jwtToken } = require('config');
const { isEmail, isPhoneNumber } = require('./validator');

const createPassword = async (length, characters) => {
  const chars =
    characters ||
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  return new Promise((resolve, reject) => {
    const charsLength = chars.length;
    if (charsLength > 256) {
      reject(
        new Error(
          'parm chars length greater than 256 characters masks desired key unpredictability'
        )
      );
    }

    const randomBytes = crypto.randomBytes(length);
    const result = new Array(length);
    let cursor = 0;
    // eslint-disable-next-line no-loops/no-loops, no-plusplus
    for (let i = 0; i < length; i++) {
      cursor += randomBytes[i];
      result[i] = chars[cursor % charsLength];
    }
    resolve(result.join(''));
  });
};

const generateToken = (content, opts) => {
  const options = {
    type: 'na',
    expiresIn: jwtToken.expireTokenIn,
    secret: jwtToken.secret,
    ...opts,
  };
  const data = { uid: content, type: options.type };

  return jwt.sign(data, options.secret, {
    expiresIn: options.expiresIn,
    audience: jwtToken.audience,
    issuer: jwtToken.issuer,
    algorithm: 'HS256',
  });
};

const generateRefreshToken = (content) =>
  generateToken(content, {
    secret: jwtToken.refreshSecret,
    expiresIn: jwtToken.expireRefreshTokenIn || '30d',
  });

const verifyRefreshToken = (refreshToken) =>
  jwt.verify(refreshToken, jwtToken.refreshSecret, {
    audience: jwtToken.audience,
    issuer: jwtToken.issuer,
    algorithm: 'HS256',
  });

const verifyToken = (token) =>
  jwt.decode(token, {
    secretOrKey: jwtToken.secret,
    audience: jwtToken.audience,
    issuer: jwtToken.issuer,
    algorithm: 'HS256',
  });

const hashPassword = async (password) => {
  if (!password) {
    throw new Error('Password was not provided');
  }

  const salt = await bcrypt.genSalt(10);
  const result = await bcrypt.hash(password, salt);

  return result;
};

const verifyPassword = async (candidate, actual) => {
  const result = await bcrypt.compare(candidate, actual);

  return result;
};

const authorizeRoles = (roles) => (ctx, next) => {
  const { user } = ctx.state;

  if (!user) ctx.throw(401);

  const hasRole = _.filter(user.roles, (role) => roles.includes(role));

  if (!hasRole || !hasRole.length) ctx.throw(401);

  return next();
};

const isBackofficeUser = (roles) => {
  const result = _.some(roles, (role) => _.includes(BACKOFFICE_USER, role));

  return result;
};

/**
 * @param {string} identity
 * @return {Object}
 */
const detectIdentity = (identity) => {
  if (isEmail(identity)) return { em: identity };

  if (isPhoneNumber(identity)) {
    return { ph: identity };
  }

  return { usr: identity };
};

const getIntervalWithCurrentTime = (date) => {
  const current = dayjs().local();
  const dateFinalized = dayjs.utc(date).local();
  const interval = current.diff(dateFinalized, 's');

  return interval;
};

/** check expired in 5 minutes */
const checkExpired = (iat, exp) => {
  const expiredAt = exp || 300;
  const issuedDate = dayjs.unix(iat);
  const interval = getIntervalWithCurrentTime(issuedDate);

  return interval > expiredAt;
};

module.exports = {
  isBackofficeUser,
  createPassword,
  generateToken,
  hashPassword,
  verifyPassword,
  authorizeRoles,
  detectIdentity,
  verifyToken,
  generateRefreshToken,
  verifyRefreshToken,
  checkExpired,
  getIntervalWithCurrentTime,
};
