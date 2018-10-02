
/*

addEventListener

removeEventListener

preventDefault

*/


        codialog.prototype.addEventListener = function (el, type, fallback) {
            if(el.addEventListener) {
                el.addEventListener(type, fallback, false)
            }
            else if(el.attachEvent) {
                el.attachEvent('on' + type, fallback)
            }
        };


        codialog.prototype.removeEventListener = function (el,type,callback){
            if(el.removeEventListener){
                el.removeEventListener(type,callback,false);
            }
            else{
                el.detachEvent('on' + type, callback);
            }
        };

        
        codialog.prototype.preventDefault = function (ev) {
            if(ev.preventDefault) {
                ev.preventDefault();
            }
            else if(ev.stopPropagation) {
                ev.stopPropagation()
            }
            else return false;
        }
