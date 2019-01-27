var Sun = function (element, delay) {
    GerbItem.apply(this, [element, 'sun', delay]);
}
Sun.prototype = Object.create(GerbItem.prototype);

Sun.prototype.open = function() {
	var self = this;
	self.element.find('.scroll').show();
	var delay = this.delay;

	return Wings.open(delay)
		.then(function slideText() {
			return self.textSlideDown(delay);
		});
};

Sun.prototype.close = function() {
	var scroll = this.element.find('.scroll');
	var delay = this.delay;

	return this.textSlideUp(delay)
		.then(function closeWings() {
			return Wings.close(delay);
		})
		.then(function hideScroll() {
			return scroll.hide().promise();
		});
};
