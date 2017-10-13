var Key = function (element, delay) {
    GerbItem.apply(this, [element, 'key', delay]);
};
Key.prototype = Object.create(GerbItem.prototype);

Key.prototype.open = function(components) {
	var self = this;
	var bars = this.element.find('.bar');
	var delay = this.delay;

	var barsWidthPromise = bars.animate({ width: 180 }, delay).promise();
	var birdOffsetPromise = components.bird.animate({ right: -190 }, delay).promise();

	var endPromise = Promise.all([barsWidthPromise, birdOffsetPromise])
		.then(function slideText() {
		    return self.textSlideDown(delay);
		});

	// Small devices need little offset for the elements
    if ($(window).outerWidth() < 390) {
    	return endPromise.then(function () {
    		return self.element.animate({ left: -30 }, delay).promise();
    	});
    }
    return endPromise;
};

Key.prototype.close = function(components) {
	var self = this;
	var delay = this.delay;

	// Small devices need little offset for the elements
    if ($(window).outerWidth() < 390) {
		return self.element.animate({ left: 7 }, delay).promise()
			.then(function () {
	    		return self.closePromise(components);
			});
    }
    return self.closePromise(components);
}

Key.prototype.closePromise = function (components) {
	var bars = this.element.find('.bar');
	var delay = this.delay;

    return this.textSlideUp(delay)
    	.then(function slideBarsAndCloseBird() {
			var barsWidthPromise = bars.animate({ width: 0 }, delay).promise();
			var birdOffsetPromise = components.bird.animate({ right: 5 }, delay).promise();
  			return Promise.all([barsWidthPromise, birdOffsetPromise]);
    	});
}
