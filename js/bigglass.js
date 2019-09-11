; (function ($) {
    $('.photoshow').on('mousemove', function () {
        $('.photoglass').css({
            top: $('.photoshow').offset().top,
            left: $('.photoshow').width() + $('.photoshow').offset().left + 10
        });
        let moveL = event.pageX - $('.photoshow').offset().left - $('.move').width() / 2;
        let moveT = event.pageY - $('.photoshow').offset().top - $('.move').height() / 2;
        let maxL = $('.photoshow').width() - $('.move').width();
        let maxT = $('.photoshow').height() - $('.move').height();
        if (moveL < 0) moveL = 0;
        if (moveL > maxL) moveL = maxL;
        if (moveT < 0) moveT = 0;
        if (moveT > maxT) moveT = maxT;
        $('.move').css({
            left: moveL,
            top: moveT
        });
        $('.lookphoto').css({
            left: (moveL / maxL) * ($('.photoglass').width() - $('.lookphoto').width()),
            top: (moveT / maxT) * ($('.photoglass').height() - $('.lookphoto').height())
        });

    });

    $('.photoshow').hover(function () {
        $('.move').show();
        $('.photoglass').show();
    }, function () {
        $('.move').hide();
        $('.photoglass').hide();
    });

    // $('.photoshow').on('mouseover', function () {
    //     $('.move').show();
    //     $('.photoglass').show();
    // });
    // $('.photoshow').on('mouseleave', function () {
    //     $('.move').hide();
    //     $('.photoglass').hide();
    // });
})(jQuery);