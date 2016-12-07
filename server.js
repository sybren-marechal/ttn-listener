'use strict';

var ttn = require('ttn');
var settings = require('./settings.json');
var request = require('request');

var client = new ttn.Client(settings.ttn.host, settings.ttn.appEUI, settings.ttn.accessKey);

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
		url: 'http://' + settings.http.host + ':' + settings.http.port + settings.http.path,
		method: 'POST',
		json: true,
		body: {settings.http.model: msg}
	}
	request(options, function(err,res,body){
		console.log('status: ' + res.statusCode);
	});
});
