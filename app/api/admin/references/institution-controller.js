const HttpResponse = require('app/api/core/http-response');
const { institutionService } = require('app/services/admin');
const { ALLOW_ADMIN, ALLOW_OFFICER } = require('app/utils/constant');
const { getPagination } = require('app/utils/pagination');
const { getFilterQuery } = require('app/utils/querystring-util');

const routePrefix = '/institutions';

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

      const result = await institutionService.getList(
        {
          filter: { ...filter, isActive: true },
          search: q,
          searchFields: ['name', 'code'],
        },
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
      allow: ALLOW_OFFICER,
    },
    action: async (ctx) => {
      const { fq, q } = ctx.query;
      const filter = getFilterQuery(fq);

      const total = await institutionService.count({
        filter,
        search: q,
        searchFields: ['name', 'code'],
      });

      return HttpResponse.ok(ctx, { total });
    },
  },

  get: {
    route: `${routePrefix}/:id`,
    guard: {
      allow: ALLOW_OFFICER,
    },
    action: async (ctx) => {
      const { id } = ctx.params;
      const entity = await institutionService.getDetail(id);

      if (!entity) return HttpResponse.notFound(ctx);

      return HttpResponse.ok(ctx, entity);
    },
  },

  create: {
    route: routePrefix,
    method: 'post',
    guard: {
      allow: ALLOW_OFFICER,
    },
    action: async (ctx) => {
      const { user } = ctx.state;

      const body = Object.assign(ctx.request.body, {
        createdBy: user,
        updatedBy: user,
      });

      const result = await institutionService.create(body);

      return HttpResponse.ok(ctx, result);
    },
  },

  update: {
    route: `${routePrefix}/:id`,
    method: 'put',
    guard: {
      allow: ALLOW_OFFICER,
    },
    action: async (ctx) => {
      const { id } = ctx.params;
      const { user } = ctx.state;
      const body = Object.assign(ctx.request.body, {
        updatedBy: user,
      });

      const result = await institutionService.update(id, body);

      if (!result) return HttpResponse.notFound(ctx);

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

      const result = await institutionService.hardDelete(id);

      if (!result) return HttpResponse.notFound(ctx);

      return HttpResponse.ok(ctx);
    },
  },
};
