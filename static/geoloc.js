var geolocation = (function() {
	"use strict";
	var callbackStack = [];
	
	function succ(loc) {
		callbackStack.forEach(function(callback) {
			callback(loc);
		});
	};
	function err(msg) {
		callbackStack.forEach(function(callback) {
			callback(null, msg);
		});
	};
	function request() {
		navigator.geolocation.getCurrentPosition(succ, err);
	};
	function register(callback) {
		return callbackStack.push(callback);
	};
	function deregister(key) {
		callbackStack.splice(key, 1);
	};
	return {
		request: request,
		register: register,
		deregister: deregister
	};
}());
