function getOptions(type){
    switch (type) {
        case "error":
            return {title: "Algo inesperado aconteceu", resetOnHover: true}
        case "success":
            return {title: "Sucesso"}
        default:
            return {title: "Notificação"}
    }
}

function notify(msg, type){
    var options = getOptions(type);
    options.message = msg;
    iziToast[type](options);
}

$(document).ready(function(evt){
    var msgs = getUrlParam("msg");
    var types = getUrlParam("type");
    for(var i in msgs){
        var msg = msgs[i];
        var type = types[i];
        notify(msg,type);
    }

});
