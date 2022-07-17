const header = require('./header');

module.exports = (body) =>
  `
  <!DOCTYPE html>
  <html>
    ${header}
    ${body}
  </html>
  `;
