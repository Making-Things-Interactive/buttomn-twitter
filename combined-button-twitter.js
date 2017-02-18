var Twitter = require('twitter'); // for the Twitter API
var env = require('dotenv').config(); // for loading API credentials
var moment = require('moment'); // for displaying dates nicely

var GPIO = require('onoff').Gpio; // for GPIO pin control

var request = require('request'); // for REST calls
var ip = require('ip'); // for getting your IP address



// define the pins
var button = new GPIO(17, 'in', 'rising'); // we are looking for both the press and release of the button, so use 'both' edges

// initialize the twitter client with your keys
var client = new Twitter({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});


// watch the button for changes
button.watch(function(err, val) {

	var lat;
	var long;

	// get the geo coordinates
	request('http://freegeoip.net/json/' + ip.address(), function(err, resp, body){
		
		var json = JSON.parse(body);

		lat = json.latitude;
		long = json.longitude;

	});

	// post a tweet
	client.post('statuses/update', {

		status: 'I pressed a button at ' + moment.format() + '!',
		lat: lat,
		long: long

	}, function(err, tweet, res) {

		if (!err) {
			console.log("You tweeted: " + tweet.text);
		} else {
			console.log(err);
		}

	});

});

// gracefully shut down the pins on quit
process.on('SIGINT', function() {
	led.unexport();
	button.unexport();
})