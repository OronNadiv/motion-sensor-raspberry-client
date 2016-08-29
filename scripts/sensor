# This file starts the raspberry pi client.
# Follow installation instructions in the README.md file.
# Then place this file in the user's root directory.

cd ~/motion-sensor-raspberry-client
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
nvm use
export PRIVATE_KEY=<PASTE GENERATED PRIVATE KEY>
export NODE_ENV=production
export LOGIN_URL=https://<LOGIN SERVER URL>
export PINS_MOTION_SENSOR=<MOTION SENSOR'S GPIO PIN>
export MOTION_SENSOR_LOCATION=<MOTION SENSOR PHYSICAL LOCATION>
export SERVER_URL=https://<ALARM SERVER URL>
npm start
