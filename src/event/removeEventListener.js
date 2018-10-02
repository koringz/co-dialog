
codialog.prototype.removeEventListener = function (el,type,callback){
    if(el.removeEventListener){
        el.removeEventListener(type,callback,false);
    }
    else{
        el.detachEvent('on' + type, callback);
    }
};