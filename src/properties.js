
/*


clone


assign

keys

forEach

*/
		

        var $default = {
            title: '',
            message: '',
            layout: 'center',
            type: 'alert',
            isGesture: true, // 处理 evnet
            isDrag: false, // 处理 evnet
            isClose: true, // 处理 evnet
            titleColor: '#9A9B9C', // 显示 ui
            closeColor: '#9A9B9C', // 显示 ui
            messageColor: '#696969', // 显示 ui
            showCloseButton: true, // 显示 ui
            showCancleButton: false, // 显示 ui
            showConfirmButton: true, // 显示 ui
            cancleButtonText: '取消', // 内容 ui
            confirmButtonText: '确定', // 内容 ui
            cancleButtonColor: '#fff', // 显示 ui
            confirmButtonColor: '#fff', // 显示 ui
            cancleButtonBackground: '#aaa', // 显示 ui
            confirmButtonBackground: '#45B680', // 显示 ui
            footerText : '', // 内容 ui
            timeout: null, // setTimeout
            animation: true, // 显示 ui
            customAnimation: 'bounceIn', // 显示 ui
            methods: function () {},
            onDialogBefore: function () {},
            onHeaderBefore: function () {},
            onBodyBefore: function () {},
            onFooterBefore: function () {},
            onDialogAfter: function () {},
            onHeaderAfter: function () {},
            onBodyAfter: function () {},
            onFooterAfter: function () {},
            confirmCallback: null,
            cancleCallback: null
        };



        codialog.prototype.clone = function (options) {
            if(options instanceof Object) {
                if(typeof JSON != 'undefined') return JSON.parse(JSON.stringify(options))
                else return options
            }
        }


        codialog.prototype.keys = function (options) {
            if(!options) return null;
            if(Object.keys) {
                return Object.keys(options);
            }
            var arrKey = []; 
            for(var k in options) {
                if(Object.prototype.hasOwnProperty.call(options, k)){
                    arrKey.push(k)
                }
            }
            return arrKey
        }


        codialog.prototype.forEach = function (options, fallback, context) {
            if(typeof options != 'undefined') {
                if(typeof options.forEach == 'function') {
                    options.forEach(fallback, context || {})
                    return;
                }
                for(var i =0; i < options.length; i++) {
                    typeof fallback == 'function' ? fallback.call(context || null, options[i], i) : null
                }
            }
        }

        codialog.prototype.assign = function (orignal, objectGroup) {
            if(typeof objectGroup == 'undefined') {
                return null;
            }
            if(typeof objectGroup == 'object') {
                if(objectGroup instanceof Array) {
                    return void Array;
                }
                else if( objectGroup instanceof Object) {
                    for(var o in objectGroup) {
                        orignal[o] = objectGroup[o];
                    }
                    return orignal;
                }
                else {
                    return null;
                }
            }
        }