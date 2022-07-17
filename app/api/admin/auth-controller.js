const { authService } = require('app/services/admin');
const { authValidate } = require('app/validations/admin/auth-validation');
const HttpResponse = require('../core/http-response');

module.exports = {
  adminLogin: {
    route: '/bo/lg',
    method: 'post',
    validate: authValidate,
    action: async (ctx) => {
      const { idtt, pwd } = ctx.request.body;
      const result = await authService.boLogin(idtt, pwd);

      return HttpResponse.ok(ctx, result);
    },
  },
};
