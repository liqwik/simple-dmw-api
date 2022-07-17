const HttpResponse = require('app/api/core/http-response');
const { userService } = require('app/services/admin');
const { getFilterQuery } = require('app/utils/querystring-util');
const { ALLOW_ADMIN, ALLOW_OFFICER } = require('app/utils/constant');
const { getPagination } = require('app/utils/pagination');

const routePrefix = '/users';

module.exports = {
  index: {
    route: routePrefix,
    guard: {
      allow: ALLOW_OFFICER,
    },
    action: async (ctx) => {
      const { q, fq, sb } = ctx.query;
      const { limit, page } = getPagination(ctx.query);
      const filter = getFilterQuery(fq);

      const result = await userService.getList(
        { filter, search: q, searchFields: ['fn', 'ln'] },
        { limit, page, sort: sb || '-createdAt' }
      );

      return HttpResponse.ok(ctx, result);
    },
  },

  count: {
    route: `${routePrefix}/c`,
    guard: {
      allow: ALLOW_OFFICER,
    },
    action: async (ctx) => {
      const { q, fq } = ctx.query;
      const fieldsFilter = getFilterQuery(fq);

      const result = await userService.count({
        filter: fieldsFilter,
        search: q,
      });

      return HttpResponse.ok(ctx, { total: result });
    },
  },

  detail: {
    route: `${routePrefix}/:id`,
    guard: {
      allow: ALLOW_ADMIN,
    },
    action: async (ctx) => {
      const { id } = ctx.params;

      const entity = await userService.getDetail(id);

      if (!entity) return HttpResponse.notFound(ctx);

      return HttpResponse.ok(ctx, entity);
    },
  },

  create: {
    route: routePrefix,
    method: 'post',
    guard: {
      allow: ALLOW_ADMIN,
    },
    action: async (ctx) => {
      const { user } = ctx.state;
      const body = { ...ctx.request.body, createdBy: user, updatedBy: user };

      const entity = await userService.create(body);

      return HttpResponse.ok(ctx, entity);
    },
  },

  update: {
    route: `${routePrefix}/:id`,
    method: 'put',
    guard: {
      allow: ALLOW_ADMIN,
    },
    action: async (ctx) => {
      const { id } = ctx.params;
      const { user } = ctx.state;
      const body = { ...ctx.request.body, updatedBy: user };

      await userService.update(id, body);

      return HttpResponse.ok(ctx);
    },
  },

  delete: {
    route: `${routePrefix}/:id`,
    method: 'delete',
    guard: {
      allow: ALLOW_ADMIN,
    },
    action: async (ctx) => {
      const { id } = ctx.params;

      await userService.delete(id);

      return HttpResponse.ok(ctx);
    },
  },
};
