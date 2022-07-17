const Redis = require('ioredis');

const redisInstance = (opts) => {
  const redis = new Redis(opts);

  redis
    .on('error', (e) => {
      console.error(e);
    })
    .on('ready', () => {
      console.log('ready');
    })
    .on('connect', () => {
      console.log('connect');
    })
    .on('close', () => {
      console.log('close');
    })
    .on('reconnecting', () => {
      console.log('reconnecting');
    })
    .on('end', () => {
      console.log('end');
    });

  return redis;
};

module.exports = redisInstance;
