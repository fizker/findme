var track = (function(global) {
	var tracking = false;
	
	function start() {
		if(tracking) {
			return;
		}
		tracking = true;
		console.log('start tracking user');
	};
	function stop() {
		if(!tracking) {
			return;
		}
		console.log('stop tracking user');
	};
	
	function toggle() {
		if(tracking) {
			stop();
		} else {
			start();
		}
	};
	function storeLocation() {
		console.log('storing location');
	};
	
	return {
		start: start,
		stop: stop,
		toggle: toggle,
		storeLocation: storeLocation
	};
})(this);
