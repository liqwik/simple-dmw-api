const ratelimit = require('koa-ratelimit');

const ratelimitIns = (opts) => {
  /**
 *
    driver memory or redis [redis]
    db redis connection instance or Map instance (memory)
    duration of limit in milliseconds [3600000]
    errorMessage custom error message
    id id to compare requests [ip]
    headers custom header names
    max max requests within duration [2500]
    disableHeader set whether send the remaining, reset, total headers [false]
    remaining remaining number of requests ['X-RateLimit-Remaining']
    reset reset timestamp ['X-RateLimit-Reset']
    total total number of requests ['X-RateLimit-Limit']
    whitelist if function returns true, middleware exits before limiting
    blacklist if function returns true, 403 error is thrown
    throw call ctx.throw if true
 *
 */

  const options = {
    driver: 'memory',
    db: new Map(),
    duration: opts.duration || 60000,
    errorMessage: opts.errMsg || {
      code: 429,
      message: 'Too many requests',
    },
    id: (ctx) => ctx.ip,
    headers: opts.headers || {},
    max: opts.maxRequest || 100,
    disableHeader: opts.disableHeader || true,
    whitelist: (ctx) => {
      // console.log('=== whitelist ===', ctx);
      // some logic that returns a boolean
    },
    blacklist: (ctx) => {
      // console.log('=== blacklist ===', ctx);
      // some logic that returns a boolean
    },
  };

  return ratelimit(options);
};

module.exports = ratelimitIns;
