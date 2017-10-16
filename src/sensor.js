const verbose = require('debug')('ha:sensor:verbose')
const info = require('debug')('ha:sensor:info')
const error = require('debug')('ha:sensor:error')

const config = require('./config')
const diehard = require('diehard')
const Promise = require('bluebird')
const gpio = Promise.promisifyAll(require('pi-gpio'))
const JWTGenerator = require('jwt-generator')
const jwtGenerator = new JWTGenerator({loginUrl: config.loginUrl, privateKey: config.privateKey, useRetry: true})
const http = require('http-as-promised')
const url = require('url')

class Sensor {
  constructor (location, pin) {
    this.location = location
    this.pin = pin
  }

  _sendMotion (isHigh, isRetry = false) {
    const self = this

    info('sendMotion called.',
      'isRetry:', isRetry)

    return Promise
      .resolve(isRetry
        ? jwtGenerator.makeNewToken({subject: '/motions', audience: 'urn:home-automation/alarm'})
        : jwtGenerator.makeToken({subject: '/motions', audience: 'urn:home-automation/alarm'}))
      .then(token => {
        info('token generated.  token:', !!token)
        return http({
          url: url.resolve(config.serverUrl, 'motions'),
          method: 'POST',
          auth: {
            bearer: token
          },
          form: {sensor_name: self.location}
        })
      })
      .then(() => {
        info('Server state update complete successfully.')
        self.lastState = isHigh
      })
      .catch(err => {
        error('Error while updating motion. err:', err)
        return Promise
          .delay(1000)
          .then(() => self._sendMotion(isHigh, true))
      })
      .finally(() => {
        self.isUpdatingServer = false
      })
  }

  open () {
    const self = this
    info('Opening input motion sensor pin.',
      'Pin', self.pin)
    return Promise
      .resolve(gpio.openAsync(self.pin, 'input'))
      .then(() => {
        info('Opened input motion sensor pin. Pin', self.pin)
        diehard.register(done => {
          info('Closing input motion sensor pin. Pin', self.pin)
          gpio.close(self.pin, () => {
            info('Closed input motion sensor pin. Pin', self.pin)
            done()
          })
        })
      })
  }

  monitor () {
    const self = this

    self.lastState = false
    self.isUpdatingServer = false
    setInterval(() => {
      verbose('setInterval called.')
      Promise
        .resolve(gpio.readAsync(self.pin))
        .then(isHigh => {
          verbose('isHigh read.  isHigh:', isHigh)
          if (self.lastState === isHigh || self.isUpdatingServer) {
            verbose('returning.',
              'lastState:', self.lastState,
              'isHigh:', isHigh,
              'isUpdatingServer:', self.isUpdatingServer)
            return
          }
          info('Alarm sensor state changed.',
            'State: ', isHigh ? 'Motion detected' : 'Motion Not Detected')
          if (!isHigh) {
            self.lastState = isHigh
            return
          }
          self.isUpdatingServer = true
          return self._sendMotion(isHigh)
        })
        .catch(err => {
          error('Error reading sensor.  Exiting process.  err:', err)
          process.exit(2)
        })
    }, 1000)
  }
}

module.exports = Sensor
