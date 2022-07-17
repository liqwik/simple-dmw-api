const winston = require('winston');

const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

const opts = {
  info: {
    level: 'info',
    filename: `var/logs/${env}/info_log.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  error: {
    filename: `var/logs/${env}/error_log.log`,
    level: 'error',
    json: true,
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  },
  combined: {
    filename: `var/logs/${env}/combined_log.log`,
    level: 'info',
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: true,
    colorize: true,
    format: winston.format.colorize({ all: true }),
  },
};

const winstonLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.simple(),
    winston.format.colorize(),
    winston.format.timestamp()
  ),
  transports: [
    new winston.transports.Console(opts.console),
    new winston.transports.File(opts.info),
    new winston.transports.File(opts.error),
    new winston.transports.File(opts.combined),
  ],
});

module.exports = winstonLogger;
