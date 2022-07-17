const TelegramBot = require('node-telegram-bot-api');

const telegramBotIns = (token) => new TelegramBot(token);

module.exports = telegramBotIns;
