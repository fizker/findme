FZ.touch.scroll($('content'));

var store = (function store(global) {
	var data = JSON.parse(global.localStorage.getItem('findme')) || {},
		dirty = false;
	
	function save() {
		if(dirty) {
			global.localStorage.setItem('findme', JSON.stringify(data));
		}
	};
	
	function set(key, value) {
		dirty = true;
		data[key] = value;
		save();
	};
	function get(key) {
		return data[key];
	};
	
	return {
		save: save,
		set: set,
		get: get
	};
})(this);

(function buttonSetup() {
	var buttons = document.body.down('.menu .buttons'),
		name = store.get('name');
	
	if(name) {
		buttons.down('input[name=handle]').value = name;
	}
	
	buttons.down('.trackme').addEvent('onclick', function() {
		track.toggle();
	});
	buttons.down('.autostart').addEvent('onclick', function() {
		store.set('autostart', !store.get('autostart'));
		track.start();
		buttons.down('.trackme').toggleOn();
	});
	buttons.down('.storeloc').addEvent('onclick', function() {
		track.storeLocation();
	});
	
	if(store.get('autostart')) {
		buttons.down('.autostart').toggle();
		buttons.down('.trackme').toggle();
		track.start();
	}
})(this);
