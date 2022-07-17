const _ = require('lodash');

module.exports = (roles) => (ctx, next) => {
  const { user } = ctx.state;

  if (!user) return ctx.throw(401);

  const hasRole = _.some(user.roles, (role) => roles.includes(role));

  if (!hasRole) return ctx.throw(401);

  return next();
};
