var Castle = function (element, delay) {
    GerbItem.apply(this, [element, 'castle', delay]);
}
Castle.prototype = Object.create(GerbItem.prototype);

Castle.prototype.open = function (components) {
	var self = this;
	var delay = this.delay;

	return Wings.open(delay)
		.then(function moveSunAndShowScroll() {
			return components.sun.animate({ top: 100 }, delay).promise();
		})
		.then(function moveSunAndOpenScroll() {
			var sunPromise = components.sun.animate({ top: 230 }, delay).promise();
			var textPromise = self.textSlideDown(delay);
			return Promise.all([sunPromise, textPromise]);
		});
}

Castle.prototype.close = function (components) {
	var delay = this.delay;
	var textPromise = this.textSlideUp(delay);
	var sunPromise = components.sun.animate({ top: 100 }, delay).promise();

	return Promise.all([textPromise, sunPromise])
		.then(function closeSun() {
			return components.sun.animate({ top: 62 }, delay).promise();
		})
		.then(function closeWings() {
			return Wings.close(delay);
		});
}
