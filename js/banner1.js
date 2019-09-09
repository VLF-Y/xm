    $('.banner1').banner({
        items: $('.banner1').find('img'), //必选,图片
        left: $('.banner1').find('#left'), //可选,左按钮,传了就有功能
        right: $('.banner1').find('#right'), //可选,右按钮,传了就有功能
        index: 0, //可选,下标,默认0
        list: true, //可选,下面的小按钮,默认true
        autoPlay: true, //可选,自动播放,默认true
        moveTime: 300, //可选,图片切换时间,默认200
        delayTime: 3000 //可选,自动切换时间,默认2000
    });
