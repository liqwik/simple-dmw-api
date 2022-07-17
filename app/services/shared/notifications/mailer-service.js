const Mailer = require('lib/mailer/index');
const config = require('config');

const MailService = function () {
  return {
    send: async (data) => {
      const { orderNo } = data;
      const { fname, lname, email } = data.shipping;

      try {
        // send mail with defined transport object
        await Mailer.sendMail({
          from: `${fname} ${lname} <${email}>`,
          to: config.mail.user, // list of receivers
          subject: `Customer Order - ${orderNo}`, // Subject line
          text: JSON.stringify(data), // plain text body
          html: 'html', // html body
        });
      } catch (e) {
        console.error(e);
      }
    },
  };
};

module.exports = MailService;
