const { parseDuplicateErrorToObject } = require('app/utils/error-util');
const winstonLogger = require('lib/logger/winston');

module.exports = async (ctx, next) => {
  try {
    return await next();
  } catch (err) {
    winstonLogger.error(
      `${ctx.ip} - [${ctx.request.method}] ${ctx.request.href} - ${
        err.status || 500
      }\n${err.stack || err}`
    );

    if (err && err.code === 11000) {
      ctx.status = 409;
      ctx.type = 'validation';
      ctx.body = {
        code: 409,
        data: parseDuplicateErrorToObject(err.keyValue),
      };

      return ctx;
    }

    if (err.status >= 500) {
      ctx.status = err.status || 500;
      ctx.body = {
        code: err.status,
        msg: err.message,
      };
    }

    ctx.status = err.statusCode || err.status || 422;
    ctx.body = {
      code: err.statusCode || err.status || 422,
      msg: err.message || 'Service not available',
    };

    if (err.detail) {
      ctx.body.detail = err.detail;
    }
  }

  return false;
};
