module.exports = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PWD,
  family: 4, // 4 (IPv4) or 6 (IPv6)
  db: 0,
  maxRetriesPerRequest: 10,
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);

    return delay;
  },
};
