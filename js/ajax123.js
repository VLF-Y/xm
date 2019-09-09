// ajax({
//     type:"get",             //可选，默认get
//     url:"",                 //必选
//     success:function(){},   //必选
//     error:function(){},     //可选，默认不处理
//     data:{}                 //可选，默认不发
//     timeout:毫秒数          //可选，默认500，延迟时间，超出时间，错误，主要用在jsonp身上
// })

function ajax(options) {
    let { type, url, data, timeout } = options;
    type = type || "get";
    data = data || {};
    timeout = timeout || 500;

    var str = "";
    for (var i in data) {
        str += `${i}=${data[i]}&`;
    }

    if (type == "get" || type == "jsonp") {
        var d = new Date();
        url = url + "?" + str + "__qft=" + d.getTime();
    }

    var p = new Promise(function (success, error) {
        if (type === "jsonp") {
            var script = document.createElement("script");
            script.src = url;
            document.body.appendChild(script);

            window[data[data.columnName]] = function (res) {
                success && success(res);
                error = null;
            }

            setTimeout(() => {
                error && error("timeout");
                success = null;
            }, timeout);
        } else {
            var xhr = new XMLHttpRequest();
            xhr.open(type, url, true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    success(xhr.responseText);
                } else if (xhr.readyState == 4 && xhr.status != 200) {
                    error && error(xhr.status);
                }
            }

            if (type == "get") {
                xhr.send();
            } else if (type == "post") {
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.send("user=admin&pass=123");
            };
        }
    });
    return p;
}
