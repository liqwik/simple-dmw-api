const { reportService } = require('app/services/admin');
const { ALLOW_OFFICER } = require('app/utils/constant');
const HttpResponse = require('../core/http-response');

const routePrefix = '/reports';

module.exports = {
  getTotalDocByStatus: {
    route: `${routePrefix}/docs/status`,
    method: 'get',
    guard: {
      allow: ALLOW_OFFICER,
    },
    action: async (ctx) => {
      const { start, end } = ctx.query;
      const result = await reportService.getTotalDocByStatus(start, end);

      return HttpResponse.ok(ctx, result);
    },
  },

  getTotalDocByDocType: {
    route: `${routePrefix}/docs/doc-type`,
    method: 'get',
    guard: {
      allow: ALLOW_OFFICER,
    },
    action: async (ctx) => {
      const { start, end } = ctx.query;
      const result = await reportService.getTotalDocByDocType(start, end, true);

      return HttpResponse.ok(ctx, result);
    },
  },
};
