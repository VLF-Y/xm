class Login {
    constructor() {
        this.user = document.getElementByClassName("itxt")
        this.pass = document.getElementById("txtLoginPwd")
        this.btn = document.getElementById("loginsubmit")

        this.addEvent();
        this.getLocal();
    }
    addEvent() {
        this.btn.onclick = () => {
            console.log(this.user.value, this.pass.value);
            this.login();
        }
    }
    getLocal() {
        // 之前有没有
        this.userMsg = localStorage.getItem("userMsg");
        this.userMsg = this.userMsg ? JSON.parse(this.userMsg) : [];
    }
    login() {
        var i = 0;
        var o = this.userMsg.some((val, index) => {
            i = index;
            return val.user == this.user.value && val.pass == this.pass.value;
        })
        if (o) {
            alert('cg');
            this.userMsg[i].onoff = 1;
            setTimeout(() => {
                location.href = "index.html";
            }, 2000);
        } else {
            alert('sb');
        }
        localStorage.setItem("userMsg", JSON.stringify(this.userMsg))
    }
}

new Login();