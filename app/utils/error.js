function NotFound(msg) {
  console.log(msg);
}

function Forbidden(msg) {
  console.log(msg);
}

function ErrorFactory() {
  this.createError = function (statusCode, msg) {
    if (statusCode === 403) return new Forbidden(msg);
    if (statusCode === 404) return new NotFound(msg);

    return new Error(msg);
  };
}

module.exports = ErrorFactory;

/**
 * Usage: Factory Pattern
 *
 *
const ErrorFactory = require('app/utils/error');

const err = new ErrorFactory();

err.createError(404, 'test');
err.createError(403, 'asdf');

 *
 */
