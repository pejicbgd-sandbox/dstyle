(function($) {
	var $contactInfo = $('.info-wrapper');

	var debounce = function(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};

	var fadeInTop = function(handler) {
		if(handler) {
			handler.each(function() {
				var windowTop = $(window).scrollTop();
				var windowBottom = $(window).height() + windowTop;

				var topOsition = $(this).offset().top + 40;
				var elHeight = topOsition + $(this).innerHeight() - 40;
				if((windowBottom >= topOsition) && (windowTop <= elHeight))
				{
					$(this).addClass('fadeInTop');
				}
				else 
				{
					if($(this).hasClass('fadeInTop'))
					{
						$(this).removeClass('fadeInTop');
					}
				}
			});
		}
		
	};

	function validateInput(selector) {
		if(!selector.val()){
			selector.addClass('error');
		}
	}

	$('nav').find('a').click(function(e) {
		var target = $(this).attr('href');
		e.preventDefault();

		$('html, body').stop().animate({
			scrollTop: $(target).position().top - 7
		}, 1000);

	});
	
	$('.price-icons').find('i').hover(function() {
		var $this = $(this);
		$this.toggleClass("rotate");
	}).mouseenter(function() {
		var $this = $(this),
		holder = $('.price-content').find('h1'),
		target = $this.prev(); 

		if(target.hasClass('haircut')) 
		{
			holder.css({height: 0, opacity: 0}).attr("class", "").addClass("frizer").css({height: 220, opacity: 1});
		}
		else if(target.hasClass('massage'))
		{
			holder.css({height: 0, opacity: 0}).attr("class", "").addClass("maser").css({height: 220, opacity: 1});
		}
		else if(target.hasClass('chemistry'))
		{
			holder.css({height: 0, opacity: 0}).attr("class", "").addClass("hemija").css({height: 220, opacity: 1});
		}
	});

	$('.fancybox').data("fancyboxGroup", "gallery").fancybox({
		padding: 1,
		'transitionIn': 'fade',
		'transitionOut': 'fade',
		'speedIn': 600,
		'speedOut': 200,
		'maxWidth': 600
	});

	$('.owl-carousel').owlCarousel({
		pagination : false,
		loop: true,
		transitionStyle : "fade",
		slideSpeed : 1000,
		paginationSpeed : 1000,
		singleItem:true,
		autoplay:true,
		autoplayTimeout:3000,
		autoplayHoverPause:true,
		responsiveClass:true,
	    responsive:{
	        0:{
	            items:1,
	            nav:true
	        },
	        600:{
	            items:2,
	            nav:false
	        },
	        992:{
	            items:3,
	            nav:true
            }
	    }
	});

	$contactInfo.mouseenter(function() {
		$(this).find('i').animate({
			top: '-20px'
		}, 300);
	});

	$contactInfo.mouseleave(function() {
		$(this).find('i').animate({
			top: '0'
		}, 300);
	});

	var updateLayout = debounce(function() {
		var $nav = $('nav');
		if($(window).scrollTop() == 0 && $nav.hasClass('shrinked')) {
			$nav.removeClass('shrinked');
		} else {
			$nav.addClass('shrinked');
		}

		if($(window).width() > 992) {
			$('ul').show();
		}
	}, 500);

	$(window).scroll(function() {
		updateLayout();
		fadeInTop($('.parallax-content').find('p'));
		fadeInTop($('.parallax-title')); 
	});

	$(window).bind('mousewheel', function(e) {
		if (e.originalEvent.wheelDelta < 0 && $(window).scrollTop() == 0) {
			$('html, body').stop().animate({
				scrollTop: $('#usluge').position().top - 7
			}, 600);
		}
	});

	$('.fa-map-marker').click(function() {
		$('html, body').stop().animate({
				scrollTop: $('#map').position().top
			}, 600);
	});

	$('button').click(function() {
		var name = $('input[name="fullname"]'),
			email = $('input[name="email"]'),
			message = $('textarea'),
			flag = false;

		validateInput(name);
		validateInput(email);
		validateInput(message);

		flag = (name.hasClass('error') || email.hasClass('error') || message.hasClass('error'));
		if(!flag) {
			$.ajax({
			   url: "mailer.php",
			   type: "POST",
			   data: {name: name.val(), email: email.val(), message: message.val(), action: "sendContactForm"},
			   success: function(response) {
			   		var response = parseInt(response, 10);
			   		if(response == 1) {
			   			name.val('');
			   			email.val('');
			   			message.val('');
			   			$('.msg-holder').html('Hvala Vam na Vašoj poruci!');
			   		}
			   }
			});
		}
	});

	$('input[name="fullname"], input[name="email"], textarea').keyup(function() {
		var $this = $(this);
		if($this.hasClass('error')) {
			$this.removeClass('error');
		}
	});

	$(".menu-icon").click(function() {
		$('ul').slideToggle();
	});

	$('ul').find('a').click(function() {
		if($(window).width(992))
		{
			$(this).closest('ul').slideToggle();
		}
	});

	$(window).resize();

})(jQuery);

google.maps.event.addDomListener(window, 'load', initWindow);
function initWindow()
{
	var map,
	bounds = new google.maps.LatLngBounds(),
	mapOptions = {
		mapTypeId: 'roadmap',
		zoom: 16
	};
	var styles = [
	{
		"featureType": "landscape",
		"stylers": [
		{
			"saturation": -100
		},
		{
			"lightness": 65
		},
		{
			"visibility": "on"
		}
		]
	},
	{
		"featureType": "poi",
		"stylers": [
		{
			"saturation": -100
		},
		{
			"lightness": 51
		},
		{
			"visibility": "simplified"
		}
		]
	},
	{
		"featureType": "road.highway",
		"stylers": [
		{
			"saturation": -100
		},
		{
			"visibility": "simplified"
		}
		]
	},
	{
		"featureType": "road.arterial",
		"stylers": [
		{
			"saturation": -100
		},
		{
			"lightness": 30
		},
		{
			"visibility": "on"
		}
		]
	},
	{
		"featureType": "road.local",
		"stylers": [
		{
			"saturation": -100
		},
		{
			"lightness": 40
		},
		{
			"visibility": "on"
		}
		]
	},
	{
		"featureType": "transit",
		"stylers": [
		{
			"saturation": -100
		},
		{
			"visibility": "simplified"
		}
		]
	},
	{
		"featureType": "administrative.province",
		"stylers": [
		{
			"visibility": "off"
		}
		]
	},
	{
		"featureType": "water",
		"elementType": "labels",
		"stylers": [
		{
			"visibility": "on"
		},
		{
			"lightness": -25
		},
		{
			"saturation": -100
		}
		]
	},
	{
		"featureType": "water",
		"elementType": "geometry",
		"stylers": [
		{
			"hue": "#ffff00"
		},
		{
			"lightness": -25
		},
		{
			"saturation": -97
		}
		]
	}
	],
	map = new google.maps.Map(document.getElementById("map"), mapOptions);

	var infoWindow = new google.maps.InfoWindow(),
	countrymarker;

	countrymarker = new google.maps.Marker({
		position: new google.maps.LatLng(44.82000, 20.46952),
		map: map,
		title: "Salon Lepote DStyle"
	});

	bounds.extend(countrymarker.position);

	google.maps.event.addListener(countrymarker, 'click', (function(countrymarker) {
		return function() {
			infoWindow.setContent('<div class="info-content"><h4>Salon Lepote Dstyle</h4><p>Jelisavete Načić 20<br>11000 Beograd<br>+381 62 252-080<br>+381 63 252-081</p></div>');
			infoWindow.open(map, countrymarker);
		}
	})(countrymarker));

	var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event)
	{
		this.setZoom(16);
		google.maps.event.removeListener(boundsListener);
	});

	map.fitBounds(bounds);
	map.setOptions({styles: styles});
}

