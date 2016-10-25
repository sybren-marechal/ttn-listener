'use strict';

var ttn = require('ttn');
var r = require('rethinkdb');
var settings = require('./settings.json');

var client = new ttn.Client('staging.thethingsnetwork.org', settings.appEUI, settings.accessKey);

var connection = null;
r.connect( {host: 'localhost', port: 28015}, function(err, conn) {
    if (err) throw err;
    connection = conn;

    // r.db('test').tableCreate('featherweather').run(connection, function(err, result) {
    //     if (err) throw err;
    //     console.log(JSON.stringify(result, null, 2));
    // });
});

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
    r.table("featherweather").insert(
        msg
    ).run(connection, function(err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result, null, 2));
    })
});

client.on('uplink', function (msg) {

	// respond to every third message
	if (msg.counter % 3 === 0) {
		console.log('[DEBUG]', 'Downlink');

		var payload = new Buffer('4869', 'hex');
		client.downlink(msg.devEUI, payload);
	}
});
