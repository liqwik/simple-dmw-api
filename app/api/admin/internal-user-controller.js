const HttpResponse = require('app/api/core/http-response');
const { internalUserService } = require('app/services/admin');
const {
  ALLOW_SUPER_ADMIN,
  ALLOW_OFFICER,
  roleDefinition,
} = require('app/utils/constant');
const { getPagination } = require('app/utils/pagination');
const { getFilterQuery } = require('app/utils/querystring-util');

const routePrefix = '/internal-users';

module.exports = {
  index: {
    route: routePrefix,
    guard: {
      allow: ALLOW_SUPER_ADMIN,
    },
    action: async (ctx) => {
      const { q, fq, sb } = ctx.query;
      const { limit, page } = getPagination(ctx.query);
      const filter = getFilterQuery(fq);

      const result = await internalUserService.getList(
        { filter, search: q, searchFields: ['nm', 'em'] },
        {
          limit,
          page,
          sort: sb,
        }
      );

      return HttpResponse.ok(ctx, result);
    },
  },

  count: {
    route: `${routePrefix}/c`,
    guard: {
      allow: ALLOW_SUPER_ADMIN,
    },
    action: async (ctx) => {
      const { q, fq } = ctx.query;
      const filter = getFilterQuery(fq);

      const total = await internalUserService.count({
        filter,
        search: q,
        searchFields: ['nm', 'em'],
      });

      return HttpResponse.ok(ctx, { total });
    },
  },

  get: {
    route: `${routePrefix}/:id`,
    guard: {
      allow: ALLOW_SUPER_ADMIN,
    },
    action: async (ctx) => {
      const { id } = ctx.params;
      const entity = await internalUserService.getDetail(id);

      if (!entity) return HttpResponse.notFound(ctx);

      return HttpResponse.ok(ctx, entity);
    },
  },

  create: {
    route: routePrefix,
    method: 'post',
    guard: {
      allow: ALLOW_SUPER_ADMIN,
    },
    action: async (ctx) => {
      const { usr, em, fn, ln, pwd, type } = ctx.request.body;

      if (
        !type ||
        (type !== roleDefinition.ADMIN &&
          type !== roleDefinition.OFFICER &&
          type !== roleDefinition.ASSISTANT)
      ) {
        return HttpResponse.notAccept(ctx);
      }

      await internalUserService.create({
        username: usr,
        email: em,
        firstname: fn,
        lastname: ln,
        password: pwd,
        userType: type,
      });

      return HttpResponse.ok(ctx);
    },
  },

  update: {
    route: `${routePrefix}/:id`,
    method: 'put',
    guard: {
      allow: ALLOW_SUPER_ADMIN,
    },
    action: async (ctx) => {
      const { id } = ctx.params;
      const { usr, em, fn, ln, type } = ctx.request.body;

      if (
        !type ||
        (type !== roleDefinition.ADMIN &&
          type !== roleDefinition.OFFICER &&
          type !== roleDefinition.ASSISTANT)
      ) {
        return HttpResponse.notAccept(ctx);
      }

      await internalUserService.update(id, {
        username: usr,
        email: em,
        firstname: fn,
        lastname: ln,
        userType: type,
      });

      return HttpResponse.ok(ctx);
    },
  },

  delete: {
    route: `${routePrefix}/:id`,
    method: 'delete',
    guard: {
      allow: ALLOW_SUPER_ADMIN,
    },
    action: async (ctx) => {
      const { id } = ctx.params;

      await internalUserService.softDelete(id);

      return HttpResponse.ok(ctx);
    },
  },

  promote: {
    route: `${routePrefix}/promote/:id`,
    method: 'put',
    guard: {
      allow: ALLOW_SUPER_ADMIN,
    },
    action: async (ctx) => {
      const { id } = ctx.params;
      const { role } = ctx.request.body;

      await internalUserService.update(id, { roles: role });

      return HttpResponse.ok(ctx);
    },
  },

  me: {
    route: `${routePrefix}/me`,
    guard: {
      allow: ALLOW_OFFICER,
    },
    action: async (ctx) => {
      const { user } = ctx.state;

      if (!user) return HttpResponse.notFound(ctx);

      const result = await internalUserService.getDetail(user._id);

      return HttpResponse.ok(ctx, result);
    },
  },
};
