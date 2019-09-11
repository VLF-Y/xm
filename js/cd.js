; (function ($) {
    $(".mainCate").mouseenter(function () {
        $(".mainCate").find('.subCate').stop().hide();
        $(this).find('.subCate').stop().show();
    });
    $(".mainCate").mouseleave(function () {
        $(".mainCate").find('.subCate').stop().hide();
    });
})(jQuery);
