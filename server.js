'use strict';

var request = require('request');
var settings = require('./settings.json');
var ttn = require('ttn');
var fs = require('fs');

var region = settings.ttn.host;
var appId = settings.ttn.appId;
var accessKey = settings.ttn.accessKey;
var options = {
				  protocol: 'mqtts',  // Assuming that the mqtt-ca certificate (https://www.thethingsnetwork.org/docs/applications/mqtt/quick-start.html) is in the same folder
					   ca: [ fs.readFileSync('mqtt-ca.pem') ],
					}

var client = new ttn.data.MQTT(region, appId, accessKey);

client.on('connect', function(connack) {
  console.log('[DEBUG]', 'Connect:', connack);
  console.log('[DEBUG]', 'Protocol:', client.mqtt.options.protocol);
  console.log('[DEBUG]', 'Host:', client.mqtt.options.host);
  console.log('[DEBUG]', 'Port:', client.mqtt.options.port);
});


client.on('error', function (err) {
	console.error('[ERROR]', err.message);
});

client.on('activation', function (e) {
	console.log('[INFO] ', 'Activated: ', e.devEUI);
});

client.on('message', function(id, message) {
	console.info('[INFO] ', 'Uplink: ' + JSON.stringify(message, null, 2));
  var options = {
		 url: 'http://' + settings.http.host + ':' + settings.http.port + settings.http.path,
		 method: 'POST',
		 json: true,
		 body: {coordinate: message}
  }
  request(options, function(err,res,body){
	  console.log('status: ' + res.statusCode);
	});
});


