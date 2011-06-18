var fs = require('fs');

(function store(exports) {
	var loading = false,
		data = null,
		listeners = [];
	
	function listen(listener) {
		listeners.push(listener);
	};
	function load() {
		if(!data && !loading) {
			fs.readFile('data.json', dataLoaded);
			loading = true;
		}
	};
	var waitingForSave = false;
	
	function createDefaultData() {
		data = {
			entries: []
		};
	};
	
	function save() {
		return;
		if(!waitingForSave) {
			waitingForSave = true;
			setTimeout(function() {
				waitingForSave = false;
				fs.writeFile('data.json', JSON.stringify(data));
			}, 2000);
		}
	};
	function dataLoaded(err, contents) {
		if(err) {
			createDefaultData();
			save();
			return;
		}
		data = JSON.parse(contents);
		exports.data = data;
	};
	
	(function entries() {
		function getEntries() {
			return data.entries;
		};
		
		function getEntry(name) {
			var e;
			data.entries.some(function iterator(entry) {
				if(entry.name == name) {
					e = entry;
					return true;
				}
				return false;
			});
			return e;
		};
		function addEntry(name) {
			var entry = getEntry(name);
			if(!entry) {
				entry = {
					name: name,
					coords: {}
				};
				
				data.entries.push(entry);
				save();
			}
			return entry;
		};
		function updateEntry(name, data) {
			var entry = addEntry(name);
			Object.keys(data).forEach(function updater(key) {
				entry[key] = data[key];
			});
			save();
			return entry;
		};
		
		function deleteEntry(name) {
			var index;
			data.entries.some(function iterator(entry, i) {
				if(entry.name == name) {
					index = i;
					return true;
				}
				return false;
			});
			if(index != null) {
				data.entries.splice(index, 1);
			}
		};
		
		function clearEntries() {
			data.entries = [];
			save();
		};
		
		exports.clearEntries = clearEntries;
		exports.deleteEntry = deleteEntry;
		exports.addEntry = addEntry;
		exports.getEntries = getEntries;
		exports.getEntry = getEntry;
		exports.updateEntry = updateEntry;
	})();
	
	exports.data = data;
	exports.listen = listen;
	exports.load = load;
	exports.save = save;
	exports.dataLoaded = dataLoaded;
})(this);
