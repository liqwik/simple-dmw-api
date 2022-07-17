const HttpResponse = {
  ok: (ctx, data) => {
    ctx.status = 200;

    if (data) {
      ctx.body = data;
    }
  },
  accepted: (ctx, data) => {
    ctx.status = 202;

    if (data) {
      ctx.body = data;
    }
  },
  created: (ctx, data) => {
    ctx.status = 201;

    if (data) {
      ctx.body = data;
    }
  },
  validateFailed: (ctx, errors) => {
    ctx.status = 422;
    if (errors) {
      ctx.body = errors;
    }
  },
  badRequest: (ctx) => ctx.throw(400),
  unauthorized: (ctx) => ctx.throw(401),
  forbidden: (ctx) => ctx.throw(403),
  notFound: (ctx) => ctx.throw(404),
  notAccept: (ctx) => ctx.throw(406),
  duplicate: (ctx) => ctx.throw(409),
  exist: (ctx) => ctx.throw(406),
};

module.exports = HttpResponse;
