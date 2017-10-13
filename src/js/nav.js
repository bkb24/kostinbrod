var navComponents = {
	mainNav: null,
	contentWrap: null,
	content: null,
	headingImg: null,
	pageSlide: null
};

// Controller for the navigation part
var navController = (function (components, delay) {

	var pages = {
		HISTORY: 'history',
		ROMAN_PAST: 'roman-past',
		THEATERS: 'theaters',
		NIVA: 'niva'
	};

	var state = {
		animating: false,
		activeBtn: null,
		pages: {}
	};

	/**
	 * Animate content show
	 *
	 * @param  {string} content HTML content
	 */
	function showContent(content) {
		state.animating = true;
		htmlElement.animate({
	        scrollTop: components.mainNav.offset().top
	    }, 1000);

		// Change HTML and animate show HTML content
		components.content.html(content);
		components.contentWrap.slideDown(delay, function () {
			state.animating = false;
		});
	}

	/**
	 * Animate content hide
	 * @param  {Function} callback
	 */
	function hideContent(callback) {
		state.animating = true;
		components.contentWrap.slideUp(delay, callback);
	}

	/**
	 * Get content from cache or load it with AJAX
	 *
	 * @param  {string} page page name
	 * @param  {Function} callback
	 */
	function loadContent(page, callback) {
		// Get from cache
		if (state.pages.hasOwnProperty(page)) {
			callback(state.pages[page]);
			return;
		}

		$.ajax({
			url: location.href + 'partials/' + page + '.html',
			method: 'GET'
		}).done(function (content) {
			// Cache HTML content
			state.pages[page] = content;
			callback(content);
		});
	}

	/**
	 * Animate content show
	 *
	 * @param  {Object} el jQuery element
	 * @param  {string} page page name
	 */
	function showNewContent(el, page) {
		state.activeBtn = el.addClass('active');
		components.headingImg.addClass(page);
		loadContent(page, showContent);
	}

	/**
	 * Handle content hide
	 */
	function closeContent() {
		hideContent(function afterHide() {
			state.activeBtn.removeClass('active');
			var activePage = state.activeBtn.data('content');
			components.headingImg.removeClass(activePage);
			state.activeBtn = null;
			state.animating = false;
		});
	}

	/**
	 * Hide the current content and then show the new
	 *
	 * @param  {Object} el jQuery element
	 * @param  {string} page page name
	 */
	function changeContent(el, page) {
		hideContent(function afterHide() {
			var activePage = state.activeBtn.data('content');
			components.headingImg.removeClass(activePage);
			state.activeBtn.removeClass('active');
			showNewContent(el, page);
		});
	}

	/**
	 * Attach handlers on show, change or hide content
	 */
	function init() {
		// On main nav button click
		components.mainNav.on('click', '.nav-item', function () {
			// Don't run while animation is still running
			if (state.animating) return;

			var $current = $(this);
			var page = $current.data('content');
			var isActive = $current.hasClass('active');

			// If no active just show
			if (state.activeBtn === null) {
				showNewContent($current, page);
				return;
			}

			// If this is active hide the content
			if (isActive) {
				closeContent();
			// Hide the active content and show this
			} else {
				changeContent($current, page);
			}

		});

		// Content close link
		components.pageSlide.on('click', function (e) {
			// e.stopPropagation();
			if (state.animating) return;
				closeContent();
		});

	}

	return {
		init: init,
		state: state
	};

}(navComponents, 2000));
