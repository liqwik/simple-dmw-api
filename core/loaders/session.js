const app = require('core/app');
const session = require('koa-session');
const { sessionConfig } = require('config');

module.exports = () => {
  /**
   * or if you prefer all default config, just use => app.use(session(app));
   */
  app.use(session(sessionConfig, app));
};
