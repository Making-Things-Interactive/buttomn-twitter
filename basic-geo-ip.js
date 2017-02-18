var request = require('request');
var ip = require('ip');

request('http://freegeoip.net/json/' + ip.address(), function(err, resp, body){
	
	var json = JSON.parse(body);

	console.log("Lat: " + json.latitude);
	console.log("Long: " + json.longitude);

});