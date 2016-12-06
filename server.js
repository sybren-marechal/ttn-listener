'use strict';

var ttn = require('ttn');
var settings = require('./settings.json');
var request = require('request');

var client = new ttn.Client('staging.thethingsnetwork.org', settings.appEUI, settings.accessKey);


client.on('connect', function () {
	console.log('[DEBUG]', 'Connected');
});

client.on('error', function (err) {
	console.error('[ERROR]', err.message);
});

client.on('activation', function (e) {
	console.log('[INFO] ', 'Activated: ', e.devEUI);
});

client.on('uplink', function (msg) {
	console.info('[INFO] ', 'Uplink: ' + JSON.stringify(msg, null, 2));
	var options = {
				url: 'http://localhost:4005/api/coordinate',
				method: 'POST',
				json: true,
				body: {coordinate: msg}
	}
	request(options, function(err,res,body){
					console.log('status: ' + res.statusCode);
	});
});

client.on('uplink', function (msg) {


});
