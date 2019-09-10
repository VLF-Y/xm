class List {
        constructor() {
            this.url = "http://localhost/project/index/shopping/data/goods.json";
            this.box = document.querySelector(".box");

            this.load();
            // 1.准备绑定点击事件
            this.addEvent();
        }
        load() {
            var that = this;
            ajax({
                url: this.url,
                success: function (res) {
                    that.res = JSON.parse(res)
                    that.display();
                }
            })
        }
        display() {
            console.log(this.res);
            var str = "";
            for (var i = 0; i < this.res.length; i++) {
                str += `<div class="goods" index="${this.res[i].goodsId}">
                            <img src="${this.res[i].url}" alt="">
                            <p>${this.res[i].name}</p>
                            <span>￥${this.res[i].price}</span>
                            <em>${this.res[i].tip}</em>
                            <i class="btn">加入购物车</i>
                        </div>`
            }
            this.box.innerHTML = str;
        }
        addEvent() {
            var that = this;
            this.box.addEventListener("click", function (eve) {
                var e = eve || window.event;
                var target = e.target || e.srcElement;
                if (target.className == "btn") {
                    console.log(1);
                    // 2.提前找到点击商品的唯一的id
                    that.id = target.parentNode.getAttribute("index");
                    // 3.准备存储localstorage
                    that.setLocal();
                }
            })
        }
        setLocal() {

            // 数据的格式：[{id:,num:,},{},{}]
            // 先读
            this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
            console.log(this.goods);

            if (this.goods.length < 1) {
                // 第一次存，直接存
                this.goods.push({
                    id: this.id,
                    num: 1
                })
            } else {
                // 准备存重复数据的索引
                var i;
                // 利用some遍历数组，检测是否有重复数据
                var o = this.goods.some((val, index) => {
                    // 每次将索引，保存出来，
                    i = index;
                    // 如果id重复了，返回true，同时some自动停止
                    return val.id == this.id;
                })
                // 如果some的返回值为true，表示肯定有一个值为true，那么表示有重复
                if (o) {
                    this.goods[i].num++
                } else { //否则没有重复，再新增数据
                    this.goods.push({
                        id: this.id,
                        num: 1
                    })
                }
                var onoff = true;
                for(var i=0;i<this.goods.length;i++){
                    if(this.goods[i].id === this.id){
                        // 存老的，老数据+1
                        this.goods[i].num ++;
                        onoff = false;
                    }
                }
                if(onoff){
                    // 存新的，增加新数据
                    this.goods.push({
                        id:this.id,
                        num:1
                    })
                }
            }

            setCookie("goods", JSON.stringify(this.goods), {
                expires: 1000
            });
        }
    }

    new List();

    