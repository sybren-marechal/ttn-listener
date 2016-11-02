'use strict';

var ttn = require('ttn');
var request = require('request');
// var r = require('rethinkdb');
var settings = require('./settings.json');

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

client.on('uplink', function (weather) {
	console.info('[INFO] ', 'Uplink: ' + JSON.stringify(weather, null, 2));
  var options = {
    url: settings.api_url,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({weather})
  }
  console.log (JSON.stringify({weather}))

  request.post(options, function (error, response, body) {
    console.log(error)
    if(!error) {console.log(response.statusCode)}
    if (!error && response.statusCode == 200) {
      console.log(body) // Show the HTML for the Google homepage.
    }
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
