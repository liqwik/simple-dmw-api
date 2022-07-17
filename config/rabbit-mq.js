module.exports = {
  address: process.env.RABBITMQ_ADDR || '',
  username: process.env.RABBITMQ_USERNAME || '',
  password: process.env.RABBITMQ_PASS || '',
};
