FZ.buttons = (function() {
	function addEvent(name, func) {
		var old = this[name] || function() {};
		this[name] = function(e) {
			var prevent = e.preventDefault,
				doPrevent = false;
			e.preventDefault = function() {
				doPrevent = true;
				prevent.call(this);
			};
			func.call(this, e);
			if(!doPrevent) {
				old.call(this, e);
			}
		};
	};
	function toggleOn() {
		this.addClass('active');
		this.toggledOn = true;
	}
	function toggleOff() {
		this.removeClass('active');
		this.toggledOn = false;
	};
	function toggle() {
		if(this.hasClass('toggle')) {
			this.toggleClass('active');
			this.toggledOn = !this.toggledOn;
		}
	};
	
	var isTouchEnabled = function() {
		var touch = Element.create('<div></div>').hasOwnProperty('ontouchstart');
		isTouchEnabled = function() {
			return touch;
		};
		return isTouchEnabled();
	};
	$$('.button').forEach(function(button) {
		button.addEvent = addEvent;
		button.toggle = toggle;
		button.toggleOn = toggleOn;
		button.toggleOff = toggleOff;
		if(isTouchEnabled()) {
			button.ontouchstart = function(e) {
				if(this.hasClass('toggle') && e.type != 'mouseover') {
					this.toggleClass('active');
				} else {
					this.addClass('active');
				}
				e.preventDefault();
			};
			button.ontouchmove = function(e) {
				e.preventDefault();
			};
			button.ontouchend = function() {
				if(!this.hasClass('toggle')) {
					this.removeClass('active');
				}
			};
		} else {
			button.onclick = function() {
				this.toggledOn = !this.toggledOn;
			};
			button.onmouseover = function(e) {
				this.addClass('active');
			};
			button.onmouseout = function(e) {
				if(!this.toggledOn) {
					this.removeClass('active');
				}
			};
		}
	});
	
	return {
		isTouchEnabled: isTouchEnabled
	};
})();
