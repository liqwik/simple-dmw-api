const mongoSanitize = require('lib/mongo-sanitize');

module.exports = async (ctx, next) => {
  mongoSanitize.sanitize(ctx.request.body);

  await next();
};
