const HttpResponse = require('app/api/core/http-response');
const { documentService } = require('app/services/client');
const { getPagination } = require('app/utils/pagination');
const { getFilterQuery } = require('app/utils/querystring-util');

const routePrefix = '/documents';

module.exports = {
  index: {
    route: routePrefix,
    action: async (ctx) => {
      const { q, fq, sb, docStart, docEnd, isSign } = ctx.query;
      const { limit, page } = getPagination(ctx.query);
      const filter = getFilterQuery(fq);

      const result = await documentService.getList(
        {
          filter: { ...filter, docStart, docEnd, isSign },
          search: q,
          searchFields: ['docNo'],
        },
        { limit, page, sort: sb }
      );

      return HttpResponse.ok(ctx, result);
    },
  },

  count: {
    route: `${routePrefix}/c`,
    action: async (ctx) => {
      const { fq, q } = ctx.query;
      const filter = getFilterQuery(fq);

      const total = await documentService.count({
        filter,
        search: q,
        searchFields: ['docNo'],
      });

      return HttpResponse.ok(ctx, { total });
    },
  },
};
