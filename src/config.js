const error = require('debug')('ha:config:error')

const _ = require('underscore')
const fs = require('fs')
const path = require('path')

const config = {production: process.env.NODE_ENV && process.env.NODE_ENV.toUpperCase() === 'PRODUCTION'}

config.location = process.env.MOTION_SENSOR_LOCATION || 'Unknown'

config.loginUrl = process.env.LOGIN_URL || (config.production ? null : 'http://localhost:3001')
if (!config.loginUrl) {
  error(`Login URL could not be found in the environment variable.
Please set 'LOGIN_URL'.`)
  process.exit(1)
}

config.pins = {
  clientUp: parseInt(process.env.PINS_CLIENT_UP || -1, 10),
  motionSensor: parseInt(process.env.PINS_MOTION_SENSOR || -1, 10)
}
if (!_.isNumber(config.pins.motionSensor) || config.pins.motionSensor < 0) {
  error(`Invalid PIN_MOTION_SENSOR value. Pin: ${config.pins.motionSensor}`)
}

config.privateKey = process.env.PRIVATE_KEY || (config.production ? null : fs.readFileSync(path.join(__dirname, '../test/private_key.pem')))
if (!config.privateKey) {
  error(`Private key could not be found in the environment variable.
Please set 'PRIVATE_KEY'.`)
  process.exit(1)
}

config.serverUrl = process.env.SERVER_URL || (config.production
    ? null
    : 'http://localhost:3002')

if (!config.serverUrl) {
  error(`Server URL could not be found in the environment variable.
Please set 'SERVER_URL'.`)
  process.exit(1)
}

module.exports = config
