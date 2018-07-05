(function(enogenUtil) {
	enogenUtil(window.jQuery, window, document);
}(function($, window, document) {

	$(function() {

		var downloadTitleHeight;

		$('.eventRow').addClass('contracted');  // JS to contract the events so users w/o JS can still see

		$('.eventRow .learnMoreBtn').click(function(e) {
			var eventParent = $(this).parents('.eventRow');
			e.preventDefault();
			eventParent.toggleClass('contracted');

			eventParent.hasClass('contracted') ? $(this).children('span').text('Learn more') : $(this).children('span').text('See less')
		});

		$('.download-title').each(function(i, el) {
			downloadTitleHeight < $(el).height() ? downloadTitleHeight = $(el).height();
		}).css('height', downloadTitleHeight);
		

	});


	
}));