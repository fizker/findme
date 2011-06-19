var track = (function(global) {
	var tracking = false,
		googleMap;
	
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
	
	(function initGoogleMaps() {
		var script = document.createElement('script');
		script.src = 'https://maps.google.com/maps/api/js?v=3.5&sensor=true&callback=googleMapsLoaded';
		global.googleMapsLoaded = function googleMapsLoaded() {
			googleMap = new google.maps.Map($('content'), {
				zoom: 12, 
				center: new google.maps.LatLng(55.683282795434636, 12.56270599365234),
				mapTypeId: google.maps.MapTypeId.ROADMAP
			});
			global.map = googleMap;
		};
		document.body.appendChild(script);
	})();
	
	var participants = {};
	function add(participant) {
		if(participants[participant.name]) {
			remove(participant);
		}
		participants[participant.name] = participant;
		participant.marker = new google.maps.Marker({
			map: googleMap,
			position: new google.maps.LatLng(participant.coords.lat, participant.coords.lng),
			title: participant.name,
			animation: google.maps.Animation.DROP
		});
	};
	function remove(participant) {
		participant = participants[participant.name];
		participant.marker.setMap(null);
		delete participants[participant.name];
	};
	
	return {
		addParticipant: add,
		removeParticipant: remove,
		start: start,
		stop: stop,
		toggle: toggle,
		storeLocation: storeLocation
	};
})(this);
