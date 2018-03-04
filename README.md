# TTN Listener

TTN Listener is a node application that will listen to The Things Network - TTN -
for messages. When a message is received it will forward it to an HTTP POST API.
The message is wrapped inside a `model` object, to be compatible with Rails
applications out of the box.

## Installation

`git clone https://github.com/sillevl/ttn-listener.git`

Installing the dependencies:

`npm install`

## Configuration

Make a copy of the `settings.example.json` file and name it `settings.json`. This can be done with the following command as well: `cp settings.example.json settings.json`.

Then update the changes in the file according to your setup.

```javascript
{
	  "ttn":{
    		"appEUI": "your-app-eui",
    		"accessKey": "your-access-key",
				"host": "staging.thethingsnetwork.org"
		},
		"http":{
				"host": "localhost",
				"port": 80,
				"path": "/api/foo/bar",
				"model": "yourModelName"
		}
}
```

## Running the application

`node server.js`

or

`npm start`

## TTN Listener as a daemon

TTN Listener can be setup as a daemon by using [pm2](https://github.com/Unitech/pm2).
More information is available on their website.
