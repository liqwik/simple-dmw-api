const { telegramBotIns } = require('lib/bot/telegram');

const BotService = function () {
  return {
    telegram: () => {
      const bot = telegramBotIns(process.env.TLG_BOT_TOKEN);

      return {
        sendPO: (message, { lat, lng }) => {
          let opts = {
            parse_mode: 'HTML',
          };

          if (lat && lng) {
            opts = {
              ...opts,
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: 'Delivery Location',
                      url: `https://maps.google.com/?q=${lat},${lng}`,
                    },
                  ],
                ],
              },
            };
          }

          bot.sendMessage(process.env.TLG_BOT_CHAT_ID, message, opts);
        },

        sendLocation: (lat, lng) => {
          bot.sendLocation(process.env.TLG_BOT_CHAT_ID, lat, lng);
        },
      };
    },
  };
};

module.exports = BotService;
