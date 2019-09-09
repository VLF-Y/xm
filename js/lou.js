$("#Fildnav").children("li").click(function(){
    var index = $(this).index();
    var t = $(".Fildnav").eq(index)[0].offsetTop;
    $("html").animate({
        scrollTop:t
    })
})