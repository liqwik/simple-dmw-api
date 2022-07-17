const DangerConsole = require('./util/danger-console');
const InfoConsole = require('./util/info-console');
const SuccessConsole = require('./util/success-console');

/**
 * How to user
 *
      ColorConsole.danger('error');
      ColorConsole.success('success');
      ColorConsole.info('information');
 *
 */
const ColorConsole = {
  danger: (msg) => new DangerConsole(msg),
  info: (msg) => new InfoConsole(msg),
  success: (msg) => new SuccessConsole(msg),
};

module.exports = ColorConsole;
