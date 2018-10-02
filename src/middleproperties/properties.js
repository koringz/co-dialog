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
        if(_hasOwnProperty(options, k)){
            arrKey.push(k)
        }
    }
    return arrKey
}

function _hasOwnProperty (options, keys) {
    return Object.prototype.hasOwnProperty.call(options, keys)
}

codialog.prototype.forEach = function (options, fallback, context) {
    if(isArr(options) && isFun(options.forEach)) {
        return options.forEach(fallback, context || {})
    }
    for(var i =0; i < options.length; i++) {
        if(isFun(fallback)) {
            buildFunction([options[i], i], fallback, context)
        }
    }
}

/*
function ast ([1,2]) {
    this
}
*/
function buildFunction (args, fn, self) {
    return fn.call(self || null, args)
}

codialog.prototype.assign = function (orignal, objectGroup) {
    orignal = orignal || {};
    objectGroup = objectGroup || {};

    if(isFun(Object.assign)) return Object.assign(orignal, objectGroup);

    if(isObj(objectGroup)) {
        for(var o in objectGroup) {
            orignal[o] = objectGroup[o];
        }
        return orignal;
    }
}

