if(typeof(FZ) == 'undefined') {
	var FZ = {};
}
FZ.touch = (function touch(global) {
	"use strict";
	function getCoords(e) {
		if(e.targetTouches && e.targetTouches.length) {
			e = e.targetTouches[0];
		}
		return {
			x: e.clientX,
			y: e.clientY
		};
	};
	function summonGhost(element) {
		var ghost = Element.create(element.outerHTML);
		ghost.addClassName('ghost');
		element.style.position = 'absolute';
		element.parentNode.insertBefore(ghost, element);
		return ghost;
	};
	function resetElement(element, values) {
		values.forEach(function(val) {
			element.style[val] = '';
		});
	}
	function getElementAt(coords) {
		if(!coords) {
			return null;
		}
		
		this.element.hide();
		var elm = global.document.elementFromPoint(coords.x, coords.y);
		this.element.show();
		if(elm && !elm.match(this.options.droppables))
			return elm.up(this.options.droppables);
		return elm;
	};
	function updatePosition(element, pos) {
		element.style.top = pos.y + 'px';
		element.style.left = pos.x + 'px';
		// We know that the elements have 10px padding and 2px border, so we subtract 24 from the size.
		if(pos.w) {
			element.style.width = (pos.w-24) + 'px';
		}
		if(pos.h) {
			element.style.height = (pos.h-24) + 'px';
		}
	};
	function createEvent(target) {
		return {
			element: this.element,
			target: target,
			userData: this.options.userData
		};
	};
	
	function scrollable(element) {
		var scroll;
		document.body.ontouchstart = function(e) {
			e.preventDefault();
		};
			
		element.ontouchstart = function(e) {
			if(scroll) {
				return;
			}
			
			//content.update('Drag started');
			e.preventDefault();
		};
		element.ontouchmove = function(e) {
			
			e.preventDefault();
		};
		element.ontouchend = element.ontouchcancel = function(e) {
		};
	};
	
	return {
		scroll: scrollable
	};
})(this);
