const _ = require('lodash');
const Router = require('@koa/router');
const passport = require('passport');
const controllers = require('app/api/client/v1');
const authorization = require('middlewares/route/auth');
const bodyValidator = require('middlewares/route/validator');

const { ROLES_USER } = require('app/utils/constant');
const { apiVersion } = require('config');

const publicRoute = new Router({
  prefix: `/${apiVersion}`,
});

/** Auto register route base on key
 * ['route: String', 'method: String', 'guard: object', 'action: Function']
 */
_.map(controllers, (controller) => {
  _.map(controller, (obj) => {
    const method = obj.method || 'get';
    const route = obj.route || '/';
    const { action, validate } = obj;

    const dataValidation = validate || {};

    if (obj.guard) {
      const roles = obj.guard.allow || ROLES_USER;

      publicRoute[method](
        route,
        passport.authenticate('jwt', { session: false }),
        authorization(roles),
        bodyValidator(dataValidation),
        action
      );
    } else {
      publicRoute[method](
        route,
        passport.authenticate(['jwt', 'anonymous'], {
          session: false,
        }),
        bodyValidator(dataValidation),
        action
      );
    }
  });
});

publicRoute.all('(.*)', async (ctx) => {
  ctx.status = 404;
});

module.exports = publicRoute;
