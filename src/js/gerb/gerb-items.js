var Wings = {
	open: function (delay) {
		var keyPromise = gerbComponents.key.animate({ left: -98 }, delay).promise();
		var birdPromise = gerbComponents.bird.animate({ right: -100 }, delay).promise();
		return Promise.all([keyPromise, birdPromise]);
	},
	close: function (delay) {
		var keyPromise = gerbComponents.key.animate({ left: 7 }, delay).promise();
		var birdPromise = gerbComponents.bird.animate({ right: 5 }, delay).promise();
		return Promise.all([keyPromise, birdPromise]);
	}
}

var GerbItem = function (element, name, delay) {
	this.element = element;
	this.name = name;
	this.delay = delay;
}
GerbItem.prototype.open = function() {}
GerbItem.prototype.close = function () {}
GerbItem.prototype.getName = function () { return this.name; }
GerbItem.prototype.textSlideDown = function (delay) {
	return this.element.find('.text').slideDown(delay).promise();
}
GerbItem.prototype.textSlideUp = function (delay) {
	return this.element.find('.text').slideUp(delay).promise();
}
GerbItem.prototype.changeIcon = function (animating) {
	var icon = this.name + (animating ? '.gif' : '.png');
	this.element.find('.icon').css('background-image', 'url(public/img/gerb/' + icon + ')');
}
