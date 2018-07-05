$(function() {

	//Add expand/contract ability to Events
	$('.eventRow').addClass('contracted');  // JS to contract the events so users w/o JS can still see

	$('.eventRow .learnMoreBtn').click(function(e) {
		var eventParent = $(this).parents('.eventRow');
		e.preventDefault();
		eventParent.toggleClass('contracted');

		eventParent.hasClass('contracted') ? $(this).find('span').text("Learn more") : $(this).find('span').text("See less")
	});

	$(window).resize(adjustDownloadButtons());
	

	//Add accessible placeholder form inputs
	$('.enogen form input[type="number"]')
	.focus(function(e) {
		$(this).siblings('.placeholder').addClass('active');
	})
	.blur(function(e) {
		var v = $(this).val();
		if (!v) {
			$(this).siblings('.placeholder').removeClass('active');
		};
	});

	//Run through download options, set height of description block to match the tallest
	//Aligns row of buttons
	function adjustDownloadButtons() {
		var downloadTitleHeight;
		$('.download-title').each(function(i, el) {
			//adjust all download-title elements to be the height of the tallest
			downloadTitleHeight = (downloadTitleHeight > $(el).height()) ? downloadTitleHeight : $(el).height();
		}).css('height', downloadTitleHeight);
	}
	
})