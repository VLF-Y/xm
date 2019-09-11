; (function ($) {
    class Display {
        constructor() {
            this.url = "http://localhost/project/index/js/goods.json";
            this.getAjax();
        }
        getAjax() {
            $.ajax({
                url: this.url,
                success: (res) => {
                    this.res = res;
                    this.display();
                }
            });
        }
        display() {
            let str = '';
            for (let i = 0; i < this.res.length; i++) {
                str += `<li>
                <div class="goods">
                    <div class="g-img" style="opacity: 1;"><a class="b" href="http://localhost/project/index/html/list.html?${this.res[i].goodsId}"> <img src="${this.res[i].url}"
                    width="135" height="135" href="#"></a></div>
                    <div class="g-name"><a target="_blank">${this.res[i].name}</a>
                    </div>
                    <div><span class="g-price"><em>￥</em>${this.res[i].price}</span></div>
                </div>
            </li>`;
            }
            $('#ulloveproduct').html(str);
        }
    }
    new Display();
})(jQuery);