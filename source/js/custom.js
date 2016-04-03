(function($) {
	$('.price-icons').find('i').hover(function() {
        var $this = $(this);
        $this.toggleClass("rotate");
	});

	$('.fancybox').data("fancyboxGroup", "gallery").fancybox({
		padding: 1,
		'transitionIn': 'fade',
		'transitionOut': 'fade',
		'speedIn': 600,
		'speedOut': 200
	});
})(jQuery);
