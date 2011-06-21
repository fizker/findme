var track = (function(global) {
	var tracking = false,
		googleMap,
		current;
	
	function setupSocketIO() {
		var socket = new io.Socket().connect(),
			input = $$('input[name=handle]')[0];
		
		socket.on('message', function socketListener(data) {
			data = JSON.parse(data);
			add(data);
		});
		socket.on('disconnect', function disconnect() {
			input.onchange = null;
		});
		
		input.onchange = function onchange() {
			store.set('name', this.value);
			socket.send(JSON.stringify({
				name: this.value
			}));
		};
		if(input.value) {
			input.onchange();
		}
	};
	setupSocketIO();
	
	function getUserHandle() {
		var input = $$('input[name=handle]')[0];
		store.set('name', input.value);
		return input.value;
	};
	
	function convertCurrentToPost() {
		var str = 'name='+current.name;
		if(current.coords) {
			str += '&coords[lat]='+current.coords.lat+'&coords[lng]='+current.coords.lng;
		}
		return str;
	}
	function geoReceived(location, error) {
		if(!current.coords) {
			googleMap.setCenter(new google.maps.LatLng(
				location.coords.latitude, location.coords.longitude
			));
		}
		current.coords = {
			lat: location.coords.latitude,
			lng: location.coords.longitude
		};
		add(current);
		AjaxRequest('/entries/'+current.name, {
			method: 'post', 
			data: convertCurrentToPost(),
			onload: function() {}
		});
	};
	geolocation.register(geoReceived);
	
	function start() {
		if(tracking) {
			return;
		}
		var handle = getUserHandle();
		if(!handle) {
			handle = prompt('Please enter a username');
			if(!handle) {
				return;
			}
			$$('input[name=handle]')[0].value = handle;
		};
		current = {
			name: handle
		};
		tracking = true;
		geolocation.request();
	};
	function stop() {
		if(!tracking) {
			return;
		}
		tracking = false;
		remove(current);
		current = null;
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
		remove(participant);
		if(!participant.coords) {
			return;
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
		if(participant) {
			if(participant.marker) {
				participant.marker.setMap(null);
			}
			delete participants[participant.name];
		}
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
