// 设置cookie
function setCookie(key,val,options){
    options = options || {};
    var expires = "";
    if(options.expires){
        var d = new Date();
        d.setDate(d.getDate()+options.expires);
        expires = ";expires="+d;
    }
    var path = options.path ? ";path="+options.path : "";

    document.cookie = `${key}=${val}${expires}${path}`;
}

// 删除cookie
function removeCookie(key,options){
    options = options || {};
    options.expires = -1;
    setCookie(key,"10",options)
}

// 获取cookie
function getCookie(key){
    var arr = document.cookie.split("; ");
    for(var i=0;i<arr.length;i++){
        if(arr[i].split("=")[0] == key){
            return arr[i].split("=")[1];
        }
    }
    return "";
}