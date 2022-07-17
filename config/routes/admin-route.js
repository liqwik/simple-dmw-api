const _ = require('lodash');
const Router = require('@koa/router');
const passport = require('koa-passport');
const controllers = require('app/api/admin');
const authorization = require('middlewares/route/auth');
const bodyValidator = require('middlewares/route/validator');

const { ROLES_USER } = require('app/utils/constant');
const { apiVersion } = require('config');

const adminRoute = new Router({
  prefix: `/adm/${apiVersion}`,
});

/**
 * Auto register route base on key
 * ['route: String', 'method: String', 'guard: object', 'action: Function']
 */
_.map(controllers, (controller) => {
  _.map(controller, (obj) => {
    const method = obj.method || 'get';
    const route = obj.route || '/';
    const { action } = obj;
    const dataValidation = obj.validate || {};

    if (obj.guard) {
      const roles = obj.guard.allow || ROLES_USER;

      adminRoute[method](
        route,
        passport.authenticate('jwt'),
        authorization(roles),
        bodyValidator(dataValidation),
        action
      );
    } else {
      adminRoute[method](route, bodyValidator(dataValidation), action);
    }
  });
});

adminRoute.all('(.*)', async (ctx) => {
  ctx.status = 404;
});

module.exports = adminRoute;
