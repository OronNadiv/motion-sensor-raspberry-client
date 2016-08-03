# Home Automation - Motion Sensor Raspberry Pi Client
This repository contains the raspberry-pi client for the alarm's motion sensor.

[![JavaScript Style Guide][standard-image]][standard-url]
[![Dependencies][dependencies-image]][dependencies-url]
[![DevDependencies][dependencies-dev-image]][dependencies-dev-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]

I suggest you first [read][overview-url] about the different components of the home automation application.
This will help you understand better the general architecture and different functions of the system.

## Hardware
* [Raspberry Pi B+ Ultimate Starter](http://www.amazon.com/gp/product/B00LAAZKXQ)
* [Bell Wires](http://www.amazon.com/Woods-5407-Solid-Twisted-500-Foot/dp/B001735UPY)
* [Infrared PIR Motion Sensor Detector](http://www.amazon.com/gp/product/B00FDPO9B8)

## Installation instructions
Click [here][client-installation-instruction-url] and follow the installation instructions for the raspberry-pi clients.

## Environment variables (configuration)
__MOTION\_SENSOR\_LOCATION__ (optional): Physical location of the motion sensor. Example: `Kitchen` Default: `Unknown`  
__LOGIN\_URL__ (required): url to the [authentication][auth-url] server.  Example: `login.herokuapp.com`  
__PINS\_CLIENT\_UP__ (optional): GPIO pin (output) that sets to high when client process is running. Default: `none`  
__PINS\_MOTION\_SENSOR__ (required): GPIO pin (input) of the motion sensor.  
__PRIVATE\_KEY__ (required): Generated private key.  Public key should be shared with the [authentication][auth-url] server. See [here][private-public-keys-url].  
__SERVER\_URL__ (required): url to the [garage door][garage-url] server. Example: `garage.herokuapp.com`  

\<TODO\> Circuit Diagram

### License
[AGPL-3.0](https://spdx.org/licenses/AGPL-3.0.html)

### Author
[Oron Nadiv](https://github.com/OronNadiv) ([oron@nadiv.us](mailto:oron@nadiv.us))

[dependencies-image]: https://david-dm.org/OronNadiv/motion-sensor-raspberry-client/status.svg
[dependencies-url]: https://david-dm.org/OronNadiv/motion-sensor-raspberry-client
[dependencies-dev-image]: https://david-dm.org/OronNadiv/motion-sensor-raspberry-client/dev-status.svg
[dependencies-dev-url]: https://david-dm.org/OronNadiv/motion-sensor-raspberry-client?type=dev
[travis-image]: http://img.shields.io/travis/OronNadiv/motion-sensor-raspberry-client.svg?style=flat-square
[travis-url]: https://travis-ci.org/OronNadiv/motion-sensor-raspberry-client
[coveralls-image]: http://img.shields.io/coveralls/OronNadiv/motion-sensor-raspberry-client.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/OronNadiv/motion-sensor-raspberry-client
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg
[standard-url]: http://standardjs.com

[overview-url]: https://oronnadiv.github.io/home-automation
[client-installation-instruction-url]: https://oronnadiv.github.io/home-automation/#installation-instructions-for-the-raspberry-pi-clients
[server-installation-instruction-url]: https://oronnadiv.github.io/home-automation/#installation-instructions-for-the-server-micro-services
[private-public-keys-url]: https://oronnadiv.github.io/home-automation/#generating-private-and-public-keys

[alarm-url]: https://github.com/OronNadiv/alarm-api
[auth-url]: https://github.com/OronNadiv/authentication-api
[camera-url]: https://github.com/OronNadiv/camera-api
[garage-url]: https://github.com/OronNadiv/garage-api
[notifications-url]: https://github.com/OronNadiv/notifications-api
[push-url]: https://github.com/OronNadiv/push-api
[storage-url]: https://github.com/OronNadiv/storage-api
[ui-url]: https://github.com/OronNadiv/home-automation-ui
