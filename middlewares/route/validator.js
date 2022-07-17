const Joi = require('joi');

module.exports = (validationFields) => async (ctx, next) => {
  if (Object.keys(validationFields).length > 0) {
    const schema = Joi.object(validationFields);
    const { error } = schema.validate(ctx.request.body);

    if (error) {
      ctx.status = 422;
      ctx.body = {
        code: 422,
        msg: error.details.map((e) => e.message.toString()),
      };

      return false;
    }
  }

  return next();
};
