const path = require('path')
const moment = require('moment')
const winston = require('winston')
const logger = new winston.Logger({
  transports: [
    new (winston.transports.Console)({
      colorize: true,
      json: false,
      timestamp: () => moment().format()
    }),
    new (require('winston-daily-rotate-file'))({
      colorize: true,
      json: false,
      timestamp: () => moment().format(),
      filename: path.join(__dirname, `all.${process.env.MOTION_SENSOR_LOCATION}.log`),
      maxFiles: 30,
      maxsize: Math.pow(2, 20)
    })
  ],
  exceptionHandlers: [
    new (winston.transports.Console)({
      colorize: true,
      json: false,
      timestamp: () => moment().format(),

      humanReadableUnhandledException: true
    }),
    new winston.transports.File({
      colorize: true,
      json: false,
      timestamp: () => moment().format(),

      filename: path.join(__dirname, `exceptions.${process.env.MOTION_SENSOR_LOCATION}.log`),
      maxsize: Math.pow(2, 20),

      humanReadableUnhandledException: true
    })
  ],
  level: process.env.LOG_LEVEL || 'info',
  exitOnError: false
})

module.exports = logger
