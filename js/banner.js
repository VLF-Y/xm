; (function ($) {
    "use strict";
    $.fn.banner = function (options) {
        let { items, left, right, index, list, autoPlay, moveTime, delayTime } = options;
        let obj = {};
        obj.w = items.eq(0).width();
        obj.iPrev = obj.w - 1;
        index = index || 0;
        list = list === false ? false : true;
        autoPlay = autoPlay === false ? false : true;
        moveTime = moveTime || 200;     //图片切换时间
        delayTime = delayTime || 3000;

        items.css({
            left: obj.w
        }).eq(index).css({
            left: 0
        });

        if (list) {
            let str = "";
            for (let i = 0; i < items.length; i++) {
                str += `<li>${i + 1}</li>`;
            }
            obj.ul = $('<ul>').html(str);
            this.append(obj.ul);

            obj.ul.css({
                width: 24 * items.length,
                height: 24,
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 10,
                margin: '0 auto',
                listStyle: 'none',
                padding: 0,
                borderRadius: 15,
            }).children('li').css({
                color: '#fff',
                textAlign:'center',
                font:'14px/18px ""',
                width: 18,
                height: 18,
                cursor: 'pointer',
                background: '#000',
                borderRadius: '50%',
            }).eq(index).css({
                background: '#c81623'
            });

            obj.ul.children('li').on('click', function () {
                if ($(this).index() > index) {
                    obj.listMove($(this).index(), 1);
                }
                if ($(this).index() < index) {
                    obj.listMove($(this).index(), -1);
                }

                obj.ul.children('li').css({
                    background: '#000'
                }).eq($(this).index()).css({
                    background: '#c81623'
                });
                index = $(this).index();
            });
        }

        obj.listMove = function (iNow, type) {
            items.eq(index).css({
                left: 0
            }).stop().animate({
                left: -obj.w * type
            }, moveTime).end().eq(iNow).css({
                left: obj.w * type
            }).stop().animate({
                left: 0
            }, moveTime);
        }

        obj.rightClick = function () {
            if (index == items.length - 1) {
                obj.iPrev = index;
                index = 0;
            } else {
                obj.iPrev = index;
                index++;
            }
            obj.btnMove(-1);
        }

        if (left != undefined && left.length > 0 && right != undefined && right.length > 0) {
            left.on('click', function () {
                if (index == 0) {
                    obj.iPrev = index;
                    index = items.length - 1;
                } else {
                    obj.iPrev = index;
                    index--;
                }
                obj.btnMove(1);
            });
            right.on('click', obj.rightClick);
        }

        obj.btnMove = function (type) {
            items.eq(obj.iPrev).css({
                left: 0
            }).stop().animate({
                left: obj.w * type
            }, moveTime).end().eq(index).css({
                left: -obj.w * type
            }).stop().animate({
                left: 0
            }, moveTime);

            if (!list) return;
            obj.ul.children('li').css({
                background: '#000'
            }).eq(index).css({
                background: '#c81623'
            });
        }
        if (autoPlay) {
            var timer = setInterval(() => {
                obj.rightClick();
            }, delayTime);
            this.hover(function () {
                $('.btns').show();
                clearInterval(timer);
            }, function () {
                $('.btns').hide();
                timer = setInterval(() => {
                    obj.rightClick();
                }, delayTime);
            });
        }
    }
})(jQuery);