const TransactionEvent = require('app/events/transaction-event');

module.exports = (app) => {
  TransactionEvent(app);
};
