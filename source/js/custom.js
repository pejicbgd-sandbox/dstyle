(function($) {
	$('.price-icons').find('i').hover(function() {
        var $this = $(this);
        $this.toggleClass("rotate");
	});

	$('.fancybox').fancybox({
		padding: 0,

				openEffect : 'elastic',
				openSpeed  : 150,

				closeEffect : 'elastic',
				closeSpeed  : 150,

				closeClick : true,

				helpers : {
					overlay : null
				}
	});
})(jQuery);
