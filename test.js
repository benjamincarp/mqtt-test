var async = require('async');
var ClientBuilder = require('./client');

var sender, listener;
var topic = 'bec/tester';

async.series([
  function(cb){
    listener = ClientBuilder('Listner', cb);
  },

  function(cb){
    listener.subscribe(topic, {qos: 1}, cb);
  },

  function(cb){
    sender = ClientBuilder('Sender', cb)
  },

  function(cb){
    sender.publish(topic, 'Message 1', {qos: 1}, cb);
  },

  function(cb){
    listener.end();
    console.log('Listener disconnected');

    var messages = [];
    for (var i=2; i<10; i++){
      messages[i] = 'Message ' + i;
    }

    async.eachSeries(messages,function(msg,eachCb){
      sender.publish(topic, msg, {qos: 1}, eachCb);
    },cb);
  }
],
  function(err){
    listener = ClientBuilder('Listner');
  }
);

