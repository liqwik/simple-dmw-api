const ratelimitIns = require('lib/rate-limit');
const { sessionDB, tokenDB } = require('lib/redis');

module.exports = {
  defaultRateLimit: ratelimitIns({
    db: sessionDB,
  }),
  authRateLimit: ratelimitIns({
    db: sessionDB,
    duration: 5000,
    maxRequest: 3,
  }),
  refreshTokenRateLimit: ratelimitIns({
    db: tokenDB,
    duration: 10000,
    maxRequest: 10,
  }),
};
