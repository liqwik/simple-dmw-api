module.exports = {
  host: process.env.MAIL_HOST || '',
  port: process.env.MAIL_PORT || '',
  user: process.env.MAIL_AUTH_USER || '',
  pass: process.env.MAIL_AUTH_PASS || '',
};
