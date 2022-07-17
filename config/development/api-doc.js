const app = require('core/app');
const swaggerJsdoc = require('swagger-jsdoc');
const { koaSwagger } = require('koa2-swagger-ui');

const apiDoc = function (opts) {
  const options = {
    definition: {
      openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
      info: {
        title: 'Qoodot API Doc', // Title (required)
        version: '1.0.2', // Version (required)
        description: 'qoodot',
      },
    },
    apis: ['config/api-docs/index.js'], // files containing annotations as above
    ...opts,
  };

  const swaggerSpec = swaggerJsdoc(options);

  app.use(
    koaSwagger({
      routePrefix: '/docs', // route where the view is returned
      swaggerOptions: {
        spec: swaggerSpec,
        supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
        docExpansion: 'none',
        jsonEditor: false,
        defaultModelRendering: 'schema',
        showRequestHeaders: false,
        swaggerVersion: '1.0.1', // read from package.json,
        validatorUrl: null, // disable swagger-ui validator
      },
    })
  );
};

module.exports = apiDoc;
