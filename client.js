var mqtt = require('mqtt');
//var server = 'mqtt://test.mosquitto.org';
var server = 'http://localhost:1883';

module.exports = function(name, connectCB) {
  var client = mqtt.connect(server, {clean: false, clientId: name});

  client.on('message', function(topic, message) {
    console.log(name + ' Message: ' + message.toString());
  });

  client.on('connect', function(connack){
    console.log(name + ' connected');
    if (connectCB) connectCB();
  });

  return client;
};
