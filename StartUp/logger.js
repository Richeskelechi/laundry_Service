const winston = require('winston');

// Define log format
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Create a logger instance
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    logFormat
  ),
  transports: [
    new winston.transports.File({
      filename: 'Logger/error.log',
      level: 'error'
    }),
    new winston.transports.File({
      filename: 'Logger/success.log',
      level: 'info'
    })
  ]
});

module.exports = logger;
