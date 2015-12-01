[![Circle CI](https://circleci.com/gh/benjamincarp/mqtt-test.svg?style=svg)](https://circleci.com/gh/benjamincarp/mqtt-test)
# mqtt-test
Testbed for playing with MQTT communication

##Brokers
This project includes 3 options for MQTT brokers.
- a public broker through test.mosquitto.org
- a standalone instance of Mosca running locally (start with the command `mosca`)
- an instance of mosca embedded as a node module (start with the command `node mosca_broker.js`)

##Setup
If you are using the included Vagrant then all you should need to do is run `npm install`.  If oyu are running on your host machine, you will also need to globally install mongo, mosca, and mocha
