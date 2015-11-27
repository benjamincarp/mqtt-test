var mqtt = require('mqtt');
var brokers = require('./config/brokers');

/*
  This is just a wrapper class to add standard handlers for connect and message events to an MQTT client
*/

var server = brokers.local;
//var server = brokers.public;

module.exports = function(name, connectCB) {
  var client = mqtt.connect(server, {clean: false, clientId: name});

  client.on('message', function(topic, message, packet) {
    console.log(name + ' Message: ' + message.toString());
  });

  client.on('connect', function(connack){
    console.log(name + ' connected');
    if (connectCB) connectCB();
  });

  return client;
};
