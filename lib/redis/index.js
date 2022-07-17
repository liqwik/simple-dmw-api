const { redisConfig } = require('config');
const Redis = require('./instance');

module.exports = {
  sessionDB: Redis({ ...redisConfig, db: 0 }),
  cacheDB: Redis({ ...redisConfig, db: 1 }),
  tokenDB: Redis({ ...redisConfig, db: 2 }),
};
