require('dotenv').config();

const sessionConfig = require('./session');
const bodyParserConfig = require('./body-parser');
const jwtTokenConfig = require('./jwt-token');
const dbConfig = require('./database');
const cloudinaryConfig = require('./cloudinary');
const mailConfig = require('./mail');
const corsConfig = require('./cors');
const cryptoConfig = require('./crypto');
const nexmoConfig = require('./nexmo');
const rabbitMQConfig = require('./rabbit-mq');
const redisConfig = require('./redis');
const serverConfig = require('./server');

module.exports = {
  cryptoConfig,
  websiteUrl: process.env.WEBSITE_URL || 'http://localhost:3000',
  apiVersion: process.env.API_VERSION || 'v1',
  appKey: process.env.APP_KEY || 'BgZurR9gmRNC91pigzB8Qg',
  session: sessionConfig || {},
  bodyParserConfig: bodyParserConfig || {},
  jwtToken: jwtTokenConfig,
  server: serverConfig,
  db: dbConfig,
  cloud: cloudinaryConfig,
  redisConfig,
  mail: mailConfig,
  nexmo: nexmoConfig,
  corsOpts: corsConfig,
  rabbitMQ: rabbitMQConfig,
};
