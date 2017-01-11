//  Blur input when there is orientation change

(function ($) {
    $(window).on('orientationchange', function () {
        $(document.activeElement).trigger('blur');
    });
})(jQuery);
