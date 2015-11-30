var expect = require('chai').expect;
var mqtt = require('mqtt');
var brokers = require('../config/brokers');

var test_topic_base = 'bec_mqtt_test/mocha/topic';

var listener, sender;

var topic;

for(var broker in brokers){
  describe('MQTT testing ' + broker + ' broker', function(){

    beforeEach(function(done){
      listener = mqtt.connect(brokers[broker], {clean: false, clientId: 'Listener'});
      listener.on('connect', function(){
        sender = mqtt.connect(brokers[broker], {clean: false, clientId: 'Sender'});
        sender.on('connect', function(){

          topic = test_topic_base + (Math.random() * 500).toFixed(0);
          return done();
        });
      });
    });

    afterEach(function(){
      listener.end(true, function(){
        sender.end(true);
      });
    });

    it('should receive a message published while the listener is online',function(done){
      var msg = "Here is a message";

      //set up the message handling before publishing
      listener.on('message', function(incoming_topic, message, packet){
        var msgString = message.toString();

        //if the message matches one we have a callback for, call the callback
        if(msgString === msg){
          return done();
        }
      });

      listener.subscribe(topic, {qos: 1}, function(){
        sender.publish(topic, msg, {qos: 1});
      });

    });

    it('should receive first message published while the listener is not online',function(done){
      var msg1 = "First";
      var msg2 = "Second";

      //subscribe to the topic
      listener.subscribe(topic, {qos: 1}, function(){

        //then drop offline
        listener.end(true, function(){
          //send both messages
          sender.publish(topic, msg1, {qos: 1});
          sender.publish(topic, msg2, {qos: 1});

          //now bring the listener back up
          listener = mqtt.connect(brokers[broker], {clean: false, clientId: 'Listener'});

          //set up the message handling
          listener.on('message', function(incoming_topic, message, packet){
            var msgString = message.toString();

            //if the message matches the first one, call the callback
            if(msgString === msg1){
              return done();
            }
          });
        });
      });
    });

    it('should receive second message published while the listener is not online',function(done){
      var msg1 = "First";
      var msg2 = "Second";

      //subscribe to the topic
      listener.subscribe(topic, {qos: 1}, function(){

        //then drop offline
        listener.end(true, function(){
          //send both messages
          sender.publish(topic, msg1, {qos: 1});
          sender.publish(topic, msg2, {qos: 1});

          //now bring the listener back up
          listener = mqtt.connect(brokers[broker], {clean: false, clientId: 'Listener'});

          //set up the message handling
          listener.on('message', function(incoming_topic, message, packet){
            var msgString = message.toString();

            //if the message matches the second one, call the callback
            if(msgString === msg2){
              return done();
            }
          });
        });
      });
    });
  });
}



