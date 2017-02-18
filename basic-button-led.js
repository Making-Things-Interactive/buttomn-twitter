var GPIO = require('onoff').Gpio; // for GPIO pin control


// define the pins
var led = new GPIO(18, 'out');
var button = new GPIO(17, 'in', 'both'); // we are looking for both the press and release of the button, so use 'both' edges

 
// watch the button for changes
button.watch(function(err, val) {

	// write the button value to the LED (1 or 0)
	led.writeSync(val)

});

// gracefully shut down the pins on quit
process.on('SIGINT', function() {
	led.unexport();
	button.unexport();
})