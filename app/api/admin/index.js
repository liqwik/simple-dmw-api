/* eslint-disable node/no-unsupported-features/es-syntax */
module.exports = {
  // eslint-disable-next-line global-require
  ...require('./references'),
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  ...MyModuleExports({
    baseDir: __dirname,
    suffixName: 'Controller',
  }),
};
