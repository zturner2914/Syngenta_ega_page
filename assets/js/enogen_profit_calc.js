	$(function() {

		//parse URL parameters
		function getQueryParameters(str) {
			return (str || document.location.search).replace(/(^\?)/,'').split("&").map(function(n){return n = n.split("="),this[n[0]] = n[1],this}.bind({}))[0];
		};

		var queryParams = getQueryParameters();

		//if params exist, loop through and fill the form
		if (queryParams) {
			$.each( queryParams, function( key, value ) {
				var element = 'input[name="'+key+'"]';
				$(element).val(value).siblings('.placeholder').addClass('active');
			});
		}

		$('#profit-calculator input[type="reset"]').click(function(e) {
			$('.placeholder').removeClass('active');
			$('#profit-calculator :input[type="number"]').removeClass('error');
			$('#results-box').slideUp();

		});

		$('#profit-calculator').submit(function(event) {

				event.preventDefault();
				var errorFlag = false;

				// get all the input values
				var $inputs = $('#profit-calculator :input[type="number"]'),
				// make array to hold input values
					values = {};

				$inputs.each(function() { 
					if ($.isNumeric($(this).val())) {
						$(this).removeClass('error');
						values[this.name] = parseFloat($(this).val(), 10);
					} else {
						$(this).addClass('error');
						errorFlag = true;
					}

				});
				console.log('values', values);

				
				if (errorFlag != true) {

						var resultsObj = {},
						$plots = $('span.form-number');

					/* 
					Variables below match to cells in Excel spreadsheet, for easy referencing
					back and forth. (Especially if any changes happen.)
					The values array items (values.C1, etc) are user input data.
					*/

					resultsObj['B8'] = ((((values.C1 * values.C5) - values.C6) * values.C2) + ((((values.C1 * values.C5) - values.C6) * values.C3))) + ((((values.C1 * values.C5) - values.C6) * values.C4));
					resultsObj['B10'] = (((values.C1 + 0.4) * values.C5) - values.C6) * values.C2;
					resultsObj['B12'] = (((values.C1 * values.C5) - values.C6) * values.C3);
					resultsObj['B13'] = (((values.C1 * values.C5) - values.C6) * values.C4);
					resultsObj['B11'] = Math.abs(((0.4 * values.C2 * values.C5) / resultsObj.B8) * 100);
					console.log('resultsObjb11', resultsObj['B11']);
					resultsObj['B14'] = (resultsObj.B10 + resultsObj.B11 + resultsObj.B12 + resultsObj.B13);
					resultsObj['C15'] = resultsObj.B10 - (((values.C1 * values.C5) - values.C6) * values.C2);
					resultsObj['E15'] = resultsObj.C15 / values.C2;
					resultsObj['B17'] = ((((values.C1 + 0.5) * values.C5) - values.C6) * values.C2) + ((((values.C1 + 0.1) * values.C5) - values.C6) * values.C3) + (((values.C1 * values.C5) - values.C6) * values.C4);
					resultsObj['B18'] = Math.abs((((((0.5 * values.C5) * values.C2) + ((0.1 * values.C5) * values.C3)) / resultsObj.B8) * 100));
					console.log('resultsObj', resultsObj['B18']);
					resultsObj['C19'] = resultsObj.B17 - resultsObj.B8;
					resultsObj['E19'] = resultsObj.C19 / (values.C2 + values.C3);


					$plots.each(function(i, el) {
						var plotVar = $(el).attr('id');
						$(el).text(resultsObj[plotVar].toFixed(2));
					});

					/* fill in our pie chart labels, CSS effects.
						if percentage is crazy, don't bother showing the chart
					 */

					var pies = ['B11','B18'];

					$.each(pies, function(i, val) {
						 $('#' + val).text(resultsObj[val].toFixed(0)+"%");
						 if (resultsObj[val] > 100 || resultsObj[val] < 0) {
						 	$('#' + val + '-holder svg').hide();
						 } else {
						 	$('#' + val + '-holder svg').show();
						 	$('#' + val + '-pie').css('stroke-dasharray', resultsObj[val] + ' 100');
						 }
					});

					$('#error-message').hide();
					$('#results-box').slideDown();

				} else {

					$('#results-box').slideUp();
					$('#error-message').show();
				}
				

		});
	});