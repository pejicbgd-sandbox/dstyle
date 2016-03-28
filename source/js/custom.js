(function($) {
	$('.price-icons').find('i').hover(function() {
        var $this = $(this);
        $this.toggleClass("rotate");
	});
})(jQuery);