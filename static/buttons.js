(function() {
	$$('.button').forEach(function(button) {
		button.onmouseover = button.ontouchstart = function(e) {
			this.addClass('active');
			e.preventDefault();
		};
		button.ontouchmove = function(e) {
			e.preventDefault();
		};
		button.onmouseout = button.ontouchend = function() {
			this.removeClass('active');
		};
	});
});
