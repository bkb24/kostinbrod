var gerbComponents = {
	gerb: null,
	castle: null,
	sun: null,
	key: null,
	bird: null
};

/**
 * Controller for the gerb interactions
 *
 * @param  {Object} components gerbComponents
 * @param  {Number} delay used for jQuery animations
 */
var gerbController = (function(components, delay) {

	var gerbElements = {};

	var state = {
		opened: null,
		animating: false
	};

	// Init scroll open animation objects
	function initElements() {
		gerbElements.castle = new Castle(components.castle, delay);
		gerbElements.sun = new Sun(components.sun, delay);
		gerbElements.key = new Key(components.key, delay);
		gerbElements.bird =  new Bird(components.bird, delay);
	}

	// On closed scroll set the data to be ready for the next change
	function onGerbElementClose() {
		state.animating = false;
		state.opened.changeIcon(false);
		state.opened = null;
	}

	// Actions on scroll open
	function openGerbElement(element) {
		state.opened = element;
		state.opened.changeIcon(true);
		state.opened.open(components)
			.then(function () {
				state.animating = false;
			});
	}

	// Attach needed event handlers on gerb interaction
	function init() {

		initElements();

		components.gerb
			.on('click', '.icon', function () {
				if (state.animating === true) return;

				var thisName = $(this).parent('.gerb-item').data('name');
				state.animating = true;
				var endPromise = null;

				// If there is an opened scroll
				if (state.opened) {
					state.opened.close(components)
						.then(function () {
							state.opened.changeIcon(false);
							if (state.opened.getName() === thisName) {
								onGerbElementClose();
							} else {
								openGerbElement(gerbElements[thisName]);
							}
						});
				} else {
					openGerbElement(gerbElements[thisName])
				}
			})
			// On bottom bar close the scroll
			.on('click', '.bottom-bar', function () {
				state.opened.close(components)
					.then(function () {
						onGerbElementClose();
					});
			});
	}

	return {
		init: init
	}

})(gerbComponents, 1000);
