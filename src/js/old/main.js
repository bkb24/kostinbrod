var htmlElement = null;
var scrollTopComponent = null;

$(function () {

	// Components
	htmlElement = $('html, body');
	scrollTopComponent = $('#scroll-to-top');

	// Gerb components
	gerbComponents.gerb = $('#gerb');
	gerbComponents.castle = gerbComponents.gerb.find('.castle');
	gerbComponents.sun = gerbComponents.gerb.find('.sun');
	gerbComponents.key = gerbComponents.gerb.find('.key');
	gerbComponents.bird = gerbComponents.gerb.find('.bird');

	// Nav components
	navComponents.mainNav = $('#main-nav');
	navComponents.contentWrap = $('.content-wrap');
	navComponents.content = navComponents.contentWrap.find('.content');
	navComponents.headingImg = navComponents.contentWrap.find('.title-img');
	navComponents.pageSlide = $('#page-slide');

	// Init gerb functionality
	gerbController.init();

	// Init navigation functionality
	navController.init();

	// Scroll top icon toggleShow
	$(window).scroll(function () {
		var y = window.pageYOffset;
		if (y > 370) {
			scrollTopComponent.fadeIn('slow');
		} else {
			scrollTopComponent.fadeOut('slow');
		}
	});

	// Get to top
	scrollTopComponent.on('click', function () {
		htmlElement.animate({ scrollTop: 0 }, 1000);
	});

});
