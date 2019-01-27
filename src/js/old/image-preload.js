var images = [
	'public/img/gerb/bottom-bar-hover.png',
	'public/img/gerb/castle.gif',
	'public/img/gerb/sun.gif',
	'public/img/gerb/key.gif',
	'public/img/gerb/bird.gif',
	'public/img/nav/history-hover.png',
	'public/img/nav/niva-hover.png',
	'public/img/nav/roman-past-hover.png',
	'public/img/nav/theaters-hover.png',
	'public/img/scrolltop-hover.jpg'
];

var imagesPreloaded = [];

function preloadImages(arguments) {
	for (var i = 0; i < arguments.length; i++) {
		var img = document.createElement('img');
	    img.src = arguments[i];
		imagesPreloaded.push(img);
	}
}

preloadImages(images);
