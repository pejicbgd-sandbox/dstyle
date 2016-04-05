(function($) {
	var $contactInfo = $('.info-wrapper');

	$('nav').find('a').click(function(e) {
		var target = $(this).attr('href');
		console.log(target);
		debugger;
		e.preventDefault();

		var scrollTarget = target.offset().top - 88;
		$('html, body').stop().animate({
			scrollTop: scrollTarget
		}, 1000);

	});
	$('.price-icons').find('i').hover(function() {
        var $this = $(this);
        $this.toggleClass("rotate");
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
		autoplayHoverPause:true
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

})(jQuery);

google.maps.event.addDomListener(window, 'load', initializeGoogleMap);
function initializeGoogleMap()
{
    var map,
        bounds = new google.maps.LatLngBounds(),
        mapOptions = {
            mapTypeId: 'roadmap',
            zoom: 18
        },
        //iconBase = "http://sandbox.passbrains.com/resources/images/icons-pin.png";

    map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var countryinfoWindow = new google.maps.InfoWindow(),
        countrymarker;

        countrymarker = new google.maps.Marker({
            position: new google.maps.LatLng(44.819909, 20.470312),
            map: map,
            //icon: iconBase,
            title: "Salon Lepote DStyle"
        });

        bounds.extend(countrymarker.position);

        google.maps.event.addListener(countrymarker, 'click', (function(countrymarker) {
            return function() {
                countryinfoWindow.setContent('<div class="info-content"><h3>Salon Lepote Dstyle</h3><p>&nbsp;</p></div>');
                countryinfoWindow.open(map, countrymarker);
            }
        })(countrymarker));

    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event)
    {
        this.setZoom(18);
        google.maps.event.removeListener(boundsListener);
    });
    map.fitBounds(bounds);
}
