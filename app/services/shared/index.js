const repository = require('app/repos');

const CoreService = require('./core-service');
const BotService = require('./notifications/bot-service');
const MailService = require('./notifications/mailer-service');

module.exports = {
  coreService: CoreService({
    rfqRepo: repository.rfqRepo,
    rfqOrderRepo: repository.rfqOrderRepo,
    purchaseOrderRepo: repository.poRepo,
  }),
  botService: BotService(),
  mailService: MailService(),
};
