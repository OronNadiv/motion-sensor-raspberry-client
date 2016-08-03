const config = require('./config')
const diehard = require('diehard')
const LED = require('./led')
const Promise = require('bluebird')
const Sensor = require('./sensor')

class Client {
  constructor () {
    this.sensor = new Sensor(config.location, config.pins.motionSensor)
    this.ledClientUp = new LED('PIN_CLIENT_UP', config.pins.clientUp)
  }

  run () {
    const self = this

    return Promise
      .resolve(self.ledClientUp.initialize())
      .then(() => self.ledClientUp.turnOn())
      .then(() => self.sensor.open())
      .then(() => self.sensor.monitor())
      .then(() => diehard.listen()) // diehard uses 'this' context.  That is why we have to call it this way.
  }
}

module.exports = Client
