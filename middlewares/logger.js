const morgan = require('morgan');
const winstonLogger = require('lib/logger/winston');

function handleMorgan() {
  const morganInstance = morgan('combined', { stream: winstonLogger.stream });

  return (ctx, next) =>
    new Promise((resolve, reject) => {
      morganInstance(ctx.req, ctx.res, (err) => {
        if (err) reject(err);

        resolve(ctx);
      });
    }).then(next);
}

module.exports = async (ctx, next) => {
  handleMorgan();

  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
};
