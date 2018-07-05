$(function() {

	$.getJSON("assets/js/states.js")
	.done(function( data ) {
		$.each( data.states, function( i, item ) {

			$('#em-map-data').append(
			                         "<div class='mobile-state' id='mobile-"+ item.alpha_state_code +
			                         "'><div class='em-title'><div class='close-button'></div><span class='em-shortcode hidden'>" + item.alpha_state_code + "</span> " + item.alpha_state_full + 
			                         "</div><div class='em-stats' id='stats-mobile-"+ item.alpha_state_code +"'><span class='stat'>" + item.number_plants + 
			                         " Ethanol plant" + (item.number_plants != 1 ? "s" : "") + 
			                         " </span><span class='stat'>" + item.number_gallons_mil + 
			                         " Million gallons</span><span class='stat'>" + item.number_premiums_mil + 
			                         " Million in Premiums</span></div></div>");



			if (i >= (data.states.length - 1)) {
				plotData();
			}
		});
	});

	function plotData() {

		$('body').find('.enogen').append('<div id="desktop-modal"></div>');
		$('#em-map-data .em-stats').hide().parents('.mobile-state').addClass('closed');

		$('#em-map-data .mobile-state').each(function(i, el) {

			var state = $(el).find('.em-shortcode').text(),
			$infoBox = $("#desktop-modal"),
			$mapElement = $("#US-" + state);
			

			$('#mobile-' + state +' .em-title').on('click', function(event) {
				if ($('#mobile-' + state +' .em-stats').is(':visible')) {
					$('#mobile-' + state +' .em-stats').hide().parents('.mobile-state').removeClass('open').addClass('closed');
				} else {
					$('#mobile-' + state +' .em-stats').show().parents('.mobile-state').removeClass('closed').addClass('open');
				}
				 //hide all open
				 //toggle clicked title
			});

			$mapElement.css({ fill: "#419639" });

			$mapElement.on('click', function(event) {

				var timeOutCount = $infoBox.is(":visible") ? 300 : 0,
				mpos = $mapElement.position();

				event.preventDefault();

				if (timeOutCount != 0) {$infoBox.hide()}

				setTimeout( function() {
					var thisData = $('#mobile-' + state).html(),
						viewport = $(window).width();

					$infoBox.css({
						'position': 'absolute',
						'top': (mpos.top),
						'left': ((mpos.left + 300) > viewport ? (mpos.left - 300) : mpos.left),
						'display': 'block'
					});
					$infoBox.html(thisData).find('.em-stats').show(); //show stats in case hidden by mobile view
					$infoBox.find('.close-button').on('click', function(e) {
						$infoBox.hide();
					});	
				}, timeOutCount);

				});		

		});
	}

	$(window).resize(function(event) {
		$("#desktop-modal").hide();	
	});

});