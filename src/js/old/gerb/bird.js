var Bird = function (element, delay) {
    GerbItem.apply(this, [element, 'bird', delay]);
}
Bird.prototype = Object.create(GerbItem.prototype);

Bird.prototype.open = function (components) {
	var self = this;
	var bars = this.element.find('.bar');
	var delay = this.delay;

	var barsWidthPromise = bars.animate({ width: 180 }, delay + 80).promise();
	var birdOffsetPromise = components.key.animate({ left: -188 }, delay).promise();

	var endPromise = Promise.all([barsWidthPromise, birdOffsetPromise])
		.then(function slideText() {
		    return self.textSlideDown(delay);
		});

	// Small devices need little offset for the elements
    if ($(window).outerWidth() < 390) {
    	return endPromise.then(function () {
    		return self.element.animate({ right: -30 }, delay).promise();
    	});
    }
    return endPromise;
}

Bird.prototype.close = function (components) {
	var self = this;
	var delay = this.delay;

	// Small devices need little offset for the elements
    if ($(window).outerWidth() < 390) {
		return self.element.animate({ right: 5 }, delay).promise()
			.then(function () {
	    		return self.closePromise(components);
			});
    }
    return self.closePromise(components);
}

Bird.prototype.closePromise = function (components) {
	var bars = this.element.find('.bar');
	var delay = this.delay;

	return this.textSlideUp(delay)
    	.then(function slideBarsAndCloseKey() {
			var barsWidthPromise = bars.animate({ width: 0 }, delay).promise();
			var birdOffsetPromise = components.key.animate({ left: 7 }, delay + 80).promise();
  			return Promise.all([barsWidthPromise, birdOffsetPromise]);
    	});
}
