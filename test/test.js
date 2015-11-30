var expect = require('chai').expect;
var mqtt = require('mqtt');
var brokers = require('../config/brokers');

var listener, sender;

describe('MQTT#public_broker', function(){
  it('should connect a listener client',function(done){
    listener = mqtt.connect(brokers.public, {clean: false, clientId: 'Listener'});

    listener.on('connect', function(connack){
      expect(listener.connected).to.equal(true);
      done();
    });
  })
});
