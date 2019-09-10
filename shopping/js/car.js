   class Car {
        constructor() {
            this.url = "http://localhost/project/index/shopping/data/goods.json";
            this.tbody = document.querySelector("tbody");
            this.qx = document.querySelector('.qx');
            this.remove = document.querySelector(".remove");
            this.price = document.querySelector(".price");
            this.money = 0;
            this.load();
            this.addEvent();
        }
        load() {
            ajax({
                url: this.url,
                success: (res) => {
                    this.res = JSON.parse(res);
                    this.getCookie();
                }
            })
        }
        getCookie() {
            this.goods = getCookie("goods") ? JSON.parse(getCookie("goods")) : [];
            this.display()
        }
        display() {
            var str = "";
            for (var i = 0; i < this.res.length; i++) {
                for (var j = 0; j < this.goods.length; j++) {
                    if (this.res[i].goodsId == this.goods[j].id) {
                        str += `<tr index="${this.res[i].goodsId}">
                                    <td><input type="checkbox" class="cb" /></td>
                                    <td><img class="center-block" src="${this.res[i].url}"></td>
                                    <td>${this.res[i].name}</td>
                                    <td>${this.res[i].price}</td>
                                    <td><input type="number" value="${this.goods[j].num}" class="num" min=1></td>
                                    <td>${this.res[i].price*this.goods[j].num}</td>
                                    <td class="delete">删除</td>
                                </tr>`
                    }
                }
            }
            this.tbody.innerHTML = str;
        }
        addEvent() {
            this.tbody.addEventListener("click", (eve) => {
                var e = eve || window.event;
                var tar = e.target || e.srcElement;
                if (tar.className == "delete") {
                    this.id = tar.parentNode.getAttribute("index");
                    tar.parentNode.remove();
                    this.setCookie((i) => {
                        this.goods.splice(i, 1);
                        this.setMoney();
                    });
                }
                //复选框选中算价格
                if (tar.className == 'cb') {
                    this.td = tar.parentNode.parentNode.children;
                    // console.log(this.td[0].children[0].checked);
                    if (this.td[0].children[0].checked == true) {
                        this.money += parseInt(this.td[5].innerHTML);
                        this.price.innerHTML = this.money;
                    } else {
                        this.qx.checked = false;
                        this.money -= parseInt(this.td[5].innerHTML);
                        this.price.innerHTML = this.money;
                    }
                }
            });
            this.tbody.addEventListener("input", (eve) => {
                var e = eve || window.event;
                var tar = e.target || e.srcElement;
                if (tar.className == "num") {
                    this.val = tar.value;
                    this.id = tar.parentNode.parentNode.getAttribute("index");
                    this.td = tar.parentNode.parentNode.children;
                    this.setCookie((i) => {
                        this.goods[i].num = this.val;
                        this.td[5].innerHTML = this.val * this.td[3].innerHTML;
                        console.log(this.val,this.td[3].innerHTML);
                        this.setMoney();
                        // this.money += parseInt(this.val * this.td[3].innerHTML);
                        // this.price.innerHTML = this.money;
                    })
                }
            });
            this.qx.addEventListener("click", (eve) => {
                this.money = 0;
                for (var i = 0; i < this.goods.length; i++) {
                    this.tbody.children[i].children[0].children[0].checked = this.qx.checked;
                    if (this.qx.checked) {
                        this.money += parseInt(this.tbody.children[i].children[5].innerHTML);
                    }
                }
                this.price.innerHTML = this.money;
            });
            this.remove.onclick = () => {
                var t = confirm("确认清空购物车吗?");
                if (t) {
                    removeCookie("goods");
                    this.getCookie();
                }
            }
        }
        setMoney() {
            this.money = 0;
            for (var i = 0; i < this.goods.length; i++) {
                // console.log(this.tbody.children[i].children[0].children[0].checked);
                if (this.tbody.children[i].children[0].children[0].checked) {
                    this.money += parseInt(this.tbody.children[i].children[5].innerHTML);
                }
                // this.tbody.children[i].children[0].children[0].checked = this.qx.checked;
                // console.log(this.tbody.children[i].children[5].innerHTML);
                // if (this.qx.checked) {
                //     this.money += parseInt(this.tbody.children[i].children[5].innerHTML);
                // }
            }
            this.price.innerHTML = this.money;
        }

        setCookie(fn) {
            for (var i = 0; i < this.goods.length; i++) {
                if (this.goods[i].id == this.id) {
                    fn(i);
                }
            }
            setCookie("goods", JSON.stringify(this.goods), {
                expires: 1000
            });
        }
    }
    new Car();
