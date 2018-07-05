$(function() {
	// Add class to list items with children
	$('#navigationBar li:has(ul)').addClass('has-child');
	$('#searchBar li:has(ul)').addClass('has-child');

	// Mobile menu functions
	$('.mobile-menu').click(function() {
    	$('.menu-icon').toggleClass('active');
    	$('.menu-container').slideToggle();
  	});

  	// Search menu functions
	$('.search-menu').click(function() {
    	$('.search-icon').toggleClass('active');
    	$('.search-container').slideToggle();
  	});

	// Add class to anchor tags which do not contain links
	$('#navigationBar ul li a').each(function() {
		if ($(this).attr('href') === '#' ) {
			$(this).addClass('no-link');
		}
	});

	// Prevent default behavior of certain links
	$('#navigationBar li.has-child').find("a:first").click(function(e) {
		e.preventDefault();
	});

	// Show/Hide menus on click if mobile
	$('#navigationBar li.has-child > a, #navigationBar li.has-child .menu-heading, #searchBar li.has-child .menu-heading').click(function(e) {
		e.preventDefault();
		if ($(window).width() < 768) {
			$(this).toggleClass('open');
			$(this).next('ul').slideToggle();
		} else {
			$('.menu-heading','a').removeClass('open');
		}
	});
	$('#searchBar li.has-child > a').click(function(e) {
		e.preventDefault();
		$(this).toggleClass('open');
		$(this).next('ul').slideToggle(200);
	});

	// Hide reseller dropdown on mouseleave
	if ($(window).width() > 768) {
		$('ul#reseller').mouseleave(function () {
	    	$(this).slideUp(200);
	    	$(this).siblings().removeClass('open');
		});
	}

	// Resize events for navigation layout
	$(window).resize(function() {
    	var w = $(window).width(),
    		subMenu = $('#navigationBar ul'),
    		childMenu = $('#navigationBar ul li ul'),
    		resellerMenu = $('ul#reseller'),
    		resellerDrop = $('#searchBar ul li ul');
    	if (w > 767) {
    		$('#navigationBar li.has-child > a, #navigationBar li.has-child .menu-heading, #searchBar li.has-child > a').removeClass('open');
        	subMenu.hide();
        	childMenu.show();
        	resellerMenu.hide();
        	resellerDrop.show();
     	} else if (!$('body').hasClass('no-resp')) {
     		childMenu.hide();
     	}
    });

	// IE9 Placeholder fix
    /* <![CDATA[ */
	var input = document.createElement("input");
    if(('placeholder' in input) === false) { 
		$('[placeholder]').focus(function() {
			var i = $(this);
			if(i.val() === i.attr('placeholder')) {
				i.val('').removeClass('placeholder');
				if(i.hasClass('password')) {
					i.removeClass('password');
					this.type = 'password';
				}			
			}
		}).blur(function() {
			var i = $(this);	
			if(i.val() === '' || i.val() === i.attr('placeholder')) {
				if(this.type === 'password') {
					i.addClass('password');
					this.type = 'text';
				}
				i.addClass('placeholder').val(i.attr('placeholder'));
			}
		}).blur().parents('form').submit(function() {
			$(this).find('[placeholder]').each(function() {
				var i = $(this);
				if(i.val() === i.attr('placeholder')) {
					i.val('');
				}
			});
		});
	}
	/* ]]> */
});