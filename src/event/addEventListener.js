codialog.prototype.addEventListener = function (el, type, fallback) {
    if(el.addEventListener) {
        el.addEventListener(type, fallback, false)
    }
    else if(el.attachEvent) {
        el.attachEvent('on' + type, fallback)
    }
};