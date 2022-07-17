const nodemailer = require('nodemailer');
const config = require('config');

const Mailer = nodemailer.createTransport({
  host: config.mail.host,
  port: config.mail.port,
  secure: config.mail.port === 465, // true for 465, false for other ports
  auth: {
    user: config.mail.user, // generated ethereal user
    pass: config.mail.pass, // generated ethereal password
  },
});

module.exports = Mailer;
