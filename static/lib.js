if(!Function.prototype.bind)
	Function.prototype.bind = function bind(context, firstBoundArg) {
		var func = this;
		var boundArgs = Array.prototype.slice.call(arguments, 1);
		return function() {
			var args = boundArgs.concat(Array.prototype.slice.call(arguments,0));
			return func.apply(context, args);
		};
	};

if(!Array.isArray)
	Array.isArray = function isArray(obj) {
		return obj instanceof Array;
	};
if(!Array.prototype.forEach)
	Array.prototype.forEach = function forEach(func, context) {
		var l = this.length,
			i, obj;
		for(i = 0; i < this.length; i++) {
			if(this.hasOwnProperty(i)) {
				obj = this[i];
				func.call(context, obj, i, this);
			}
		}
	};
if(!Array.prototype.some)
	Array.prototype.some = function some(func, context) {
		var l = this.length,
			i, obj;
		for(i = 0; i < this.length; i++) {
			if(this.hasOwnProperty(i)) {
				obj = this[i];
				if(func.call(context, obj, i, this)) {
					return true;
				}
			}
		}
		return false;
	};
if(!Array.prototype.every)
	Array.prototype.every = function every(func, context) {
		var l = this.length,
			i, obj;
		for(i = 0; i < this.length; i++) {
			if(this.hasOwnProperty(i)) {
				obj = this[i];
				if(!func.call(context, obj, i, this)) {
					return false;
				}
			}
		}
		return true;
	};
/*if(!Array.prototype.concat)
	Array.prototype.concat = function concat(array) {
		var conc = function(o) {
			this.push(o);
		},
			length = arguments.length, i,
			ret = this.slice(0);
		
		for(i = 0; i < length; i++) {
			array = arguments[i];
			Array.prototype.forEach.call(array, conc, ret);
		}
		return ret;
	};*/
if(!Array.prototype.indexOf)
	Array.prototype.indexOf = function indexOf(element, i) {
		var length = this.length, 
			obj;
		if(!i) {
			i = 0;
		}
		if(i < 0) {
			i = length + i;
			if(i < 0)
				i = 0;
		}
		
		for(; i < length; i++) {
			obj = this[i];
			if(obj === element) {
				return i;
			}
		}
		
		return -1;
	};
if(!Array.prototype.lastIndexOf)
	Array.prototype.lastIndexOf = function lastIndexOf(element, i) {
		var length = this.length, 
			obj;
		if(!i) {
			i = length - 1;
		} else if(i >= 0) {
			i = Math.min(i, length -1);
			if(i < 0)
				i = 0;
		} else {
			i = length + i;
		}
		
		for(; i >= 0; i--) {
			obj = this[i];
			if(obj === element) {
				return i;
			}
		}
		
		return -1;
	};
if(!Array.prototype.map)
	Array.prototype.map = function(callback, context) {
		var i, length = this.length,
			obj, mappedValue, ret = [];
		
		for(i = 0; i < length; i++) {
			obj = this[i];
			if(obj !== undefined) {
				mappedValue = callback(obj, i, this);
				ret[i] = mappedValue;
			}
		}
		
		return ret;
	};
/*
if(!Array.prototype.filter)
	Array.prototype.filter = function(callback, context) {};
if(!Array.prototype.reduce)
	Array.prototype.reduce = function(callback, initialValue) {};
if(!Array.prototype.reduceRight)
	Array.prototype.reduceRight = function(callback, initialValue) {};
*/
if(!String.prototype.time)
	String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); }

if(!Date.parseISOString)
	Date.parseISOString = function parseISOString(string) {
		var date = Date.parse(string);
		
		if(isNaN(date)) {
			Date.parseISOString = function parseISOString(string) {
				var date, time, timezone, negativeTimezone, s,
					milliseconds, a1, a2;
				if(string.match(/^[0-9]{4}-((0[0-9])|(1[0-2]))-(([012][0-9])|(3[01]))T(([01][0-9])|(2[0-4]))(:([0-5][0-9])|(60)){2}(\.[0-9]{3})?(Z|([+-]((0[0-9])|1[0-2]):([0-5][0-9])|(60)))$/)) {
					s = string.split(/[T]/);
					date = new Date(s[0].replace(/-/g, '/')+ ' 12:00:00');
					a1 = date.toString().split(/ /);
					a2 = a1.splice(4);
					
					negativeTimezone = s[1].indexOf('-')!==-1;
					s = s[1].split(/[Z+-]/);
					time = s[0].split(/[:.]/g);
					timezone = s[1];
					if(timezone) {
						timezone = (negativeTimezone?'-':'+')+timezone.replace(':', '');
					}
					
					if(time[3]) {
						milliseconds = time[3];
						time.pop();
					}
					a1.push(time.join(':'));
					
					a1.push('GMT'+timezone);
					string = a1.join(' ');
				}
				date = new Date(string);
				if(milliseconds) {
					date.setMilliseconds(milliseconds);
				}
				return date;
			};
		} else {
			Date.parseISOString = function parseISOString(string) {
				return new Date(string);
			};
		}
		return Date.parseISOString(string);
	};
(function $sign_methods() {
	if(!window.$)
		$ = function getElementById(id) {
		return document.getElementById.apply(document, arguments);
	};
	if(!window.$$)
		$$ = function () {
		return document.querySelectorAll.apply(document, arguments);
	}
}());
(function element_traversal() {
	"use strict";
	
	function update(html) {
		this.innerHTML = html || '';
		return this;
	};
	[Element.prototype, document, document.body, document.head, document.querySelector('html')].forEach(function extend(obj) {
		if(!obj.update)
			obj.update = update;
		if(!obj.select && obj.querySelectorAll)
			obj.select = function select() {
			return obj.querySelectorAll.apply(this, arguments);
		};
		if(!obj.down && obj.querySelector)
			obj.down = function down() {
			return obj.querySelector.apply(this, arguments);
		};
	});
}());

(function element_class() {
	var addClass, removeClass, hasClass, prepareClassList;
	
	prepareClassList = function prepareClassList() {
		var list = [], ret = [], checkDupes = {};
		Array.prototype.forEach.call(arguments, function(arg) {
			if(typeof(arg) === 'string') {
				if(arg && !checkDupes[arg]) {
					checkDupes[arg] = true;
					list.push(arg.split(' '));
				}
				return;
			}
			list.push(prepareClassList.apply(undefined, arg));
		});
		list = list.concat.apply([], list);
		checkDupes = {};
		list.forEach(function(arg) {
			arg = arg.trim();
			if(!arg || checkDupes[arg]) {
				return;
			}
			
			checkDupes[arg] = true;
			ret.push(arg);
		});
		return ret;
	};
	
	addClass = function addClass() { 
		var classNames = prepareClassList(this.className, arguments);
		this.className = classNames.join(' ');
		return this; 
	};
	removeClass = function addClass() {
		var current = [],
			toRemove = {};
		
		prepareClassList(arguments).forEach(function (o) {
			toRemove[o] = true;
		});
		prepareClassList(this.className).forEach(function (o) {
			if(!toRemove[o]) {
				current.push(o);
			}
		});
		this.className = current.join(' ');
		return this;
	};
	hasClass = function addClass() {
		var requirements = [],
			classNames = {};
		prepareClassList(this.className).forEach(function (cl) {
			classNames[cl] = true;
		});
		
		// Preparing requirements
		Array.prototype.forEach.call(arguments, function(arg) {
			requirements.push(prepareClassList(arg));
		});
		if(requirements.length === 0 && this.className) {
			return true;
		}
		
		// Testing; some returns true if any call to callback returns true.
		return requirements.some(function(classList) {
			// every returns true only if no call within returns false.
			return classList.every(function(cl) {
				return !!classNames[cl];
			});
		});
	};
	
	[Element.prototype, document, document.body, document.head, document.querySelector('html')].forEach(function extend(obj) {
		if(!obj.addClass)
			obj.addClass = addClass;
		if(!obj.removeClass)
			obj.removeClass = removeClass;
		if(!obj.hasClass)
			obj.hasClass = hasClass;
	});
	
	if(window.AJAX_TEST_DEBUG) {
		AJAX_TEST_DEBUG.prepareClassList = prepareClassList;
	}
}());

(function dom_manipulation() {
	if(!Element.create)
		Element.create = function create(html) {
			var parser = document.createElement('div');
			Element.create = function create(html) {
				var fragment, length;
				parser.innerHTML = html;
				length = parser.childElementCount;
				if(length === 0) {
					return null;
				}
				
				if(length === 1) {
					return parser.children[0];
				}
				
				fragment = document.createDocumentFragment();
				while(length--) {
					fragment.appendChild(parser.children[0]);
				}
				return fragment;
			};
			return Element.create(html);
		};
	if(!Element.prototype.remove)
		Element.prototype.remove = function remove() {
			if(this.parentNode) {
				this.parentNode.removeChild(this);
			}
		};
}());

var AjaxRequest = (function xmlhttp() {
	"use strict";
	var obj = function Ajax() {
		return create.apply({}, arguments);
	}, // various private methods
		init, open, parseOptions, parseReadyState, create, callback, empty = function() {},
	// content-type handlers
		contentTypes = {
			'application/json': function(res) {
				res.responseJSON = JSON.parse(res.responseText);
			}
		};
	
	function parseReadyState(state) {
		
	};
	
	function open(url, options) {
		var request = new XMLHttpRequest(),
			cb = callback.bind(undefined, options);
		request.open(options.method, 
				url, 
				options.async, 
				options.auth.user, 
				options.auth.pass
			);
			var header, headers = options.headers;
		for(header in headers) {
			request.setRequestHeader(header, headers[header]);
		}
		
		if(options.onprogress) {
			request.onprogress = cb;
		}
		request.onerror = request.onload = cb;
		if(options.data) {
			request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			request.send(options.data.toString());
		} else {
			request.send();
		}
	};
	
	function create(url, obj) {
		var options, request;
		if(!obj) throw new TypeError('2nd parameter must be either a function or an object!');
		// callback
		if(typeof(obj) == 'function') {
			obj = { onload: obj };
		}
		options = parseOptions(obj);
		
		open(url, options);
	};
	
	function parseOptions(opt) {
		opt = opt || {};
		if(!opt.onsuccess && !opt.onload)
			throw new TypeError('No callback given');
		opt.method = opt.method ? opt.method.toUpperCase() : 'GET';
		if(opt.async === undefined)
			opt.async = true;
		if(!opt.headers)
			opt.headers = {};
		if(!opt.data || opt.method == 'GET' || opt.method == 'HEAD')
			opt.data = undefined;
		if(!opt.auth)
			opt.auth = { user: undefined, pass: undefined };
		return opt;
	};
	
	function callback(options, response) {
		var target = response.target,
			status = target.status,
			contentHandler = contentTypes[target.getResponseHeader('content-type')];
		
		if(contentHandler) {
			contentHandler(target);
		}
		
		if(target.readyState === 3) {
			if(options.onprogress) {
				options.onprogress(target);
			}
			return;
		}
		
		// fail
		if(status == 0 || (400 <= status && status < 600)) {
			if(options.onerror) {
				options.onerror(target);
			}
		// success
		} else {
			if(options.onsuccess) {
				options.onsuccess(target);
			}
		}
		if(options.onload) {
			options.onload(target);
		}
	}
	
	if(window.AJAX_TEST_DEBUG) {
		AJAX_TEST_DEBUG.AjaxRequest = {
			parseOptions: parseOptions,
			callback: callback
		};
	}
	return obj;
}());

