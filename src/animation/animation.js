/* animate */


codialog.prototype.animate = function (options) {
    return _coanimation(options)
}



// animation
// base on co-animation plugins api
var co = function () {};
co.count = void null;
co.delay = new Array();
co.listItems = new Array();
co.bufferTimer = new Array();
co.animatiomApi = new Array();
co.saveAnimation = new Array();
co.saveApiMethods = new Array();
co.saveAllNodeAnimation = new Array();
co.animatiomApi = [
    'bounce','flash','pulse','rubberBand','shake', 'headShake',
    'swing', 'tada', 'wobble', 'jello', 'bounceIn', 'bounceInDown',
    'bounceInLeft', 'bounceInRight', 'bounceInUp', 'bounceOut', 'bounceOutDown', 'bounceOutLeft',
    'bounceOutRight', 'bounceOutUp', 'fadeIn', 'fadeInDown', 'fadeInDownBig', 'fadeInLeft',
    'fadeInLeftBig', 'fadeInRight', 'fadeInRightBig', 'fadeInUp', 'fadeInUpBig', 'fadeOut',
    'fadeOutDown', 'fadeOutDownBig', 'fadeOutLeft', 'fadeOutLeftBig', 'fadeOutRight', 'fadeOutRightBig',
    'fadeOutUp', 'fadeOutUpBig', 'flipInX', 'flipInY', 'flipOutX', 'flipOutY',
    'lightSpeedIn', 'lightSpeedOut', 'rotateIn', 'rotateInDownLeft', 'rotateInDownRight', 'rotateInUpLeft',
    'rotateInUpRight',  'rotateOut', 'rotateOutDownLeft', 'rotateOutDownRight', 'rotateOutUpLeft', 'rotateOutUpRight',
    'hinge', 'jackInTheBox', 'rollIn', 'rollOut', 'zoomIn', 'zoomInDown',
    'zoomInLeft', 'zoomInRight', 'zoomInUp', 'zoomOut', 'zoomOutDown', 'zoomOutLeft',
    'zoomOutRight', 'zoomOutUp', 'slideInDown', 'slideInLeft', 'slideInRight', 'slideInUp',
    'slideOutDown', 'slideOutLeft', 'slideOutRight', 'slideOutUp'
];
co.supportBrowserAnimationEventOfName_end = {
    "animation"      : "animationend",
    "OAnimation"     : "oAnimationEnd",
    "MozAnimation"   : "animationend",
    "WebkitAnimation": "webkitAnimationEnd",
    'MSAnimation': 'MSAnimationEnd'
};
co.supportBrowserAnimationEventOfName_start = {
    "animation"      : "animationstart",
    "OAnimation"     : "oAnimationStart",
    "MozAnimation"   : "animationstart",
    "WebkitAnimation": "webkitAnimationStart",
    'MSAnimation': 'MSAnimationStart'
};
co.validateAnimationEvent = function (el, eventObjectName) {
    var SPAEON = eventObjectName;
    for(var k in SPAEON) {
        if(el.style[k] != undefined) {
            return SPAEON[k]
        }
    }
}

co.prototype.animation = function (nodelist,currentNodeAnimation,x,fallback, showAndHideApi) {
    var getNodeList = document.querySelector(nodelist);
    var classList = codialog.prototype.classList;
    var supportsAntEvent_end = co.validateAnimationEvent(getNodeList, co.supportBrowserAnimationEventOfName_end);
    var supportsAntEvent_start = co.validateAnimationEvent(getNodeList, co.supportBrowserAnimationEventOfName_start);

    if(showAndHideApi.type.toLowerCase() == 'end') classList(getNodeList,' ' + x + ' animatedHalf', getNodeList);
    else classList(getNodeList,' ' + x + ' animated', getNodeList);
    
    var callAnimationEventStart = function () {
        var typeStartWith = showAndHideApi.type;
        // 2种情况 
        // 显示弹出框时 有一次动画开始 到结束过程
        // 隐藏弹出框时 也有一次动画开始 到结束过程
        // 不同之处就是隐藏时  本身就显示的弹出框 可见动画被监听 
        // 而之前隐藏的弹出框  不可见 就不会立马被监听
        getNodeList.removeEventListener(supportsAntEvent_start, callAnimationEventEnd, false);
    };

    var callAnimationEventEnd = function () {
        var typeStartWith = showAndHideApi.type;

        // 显示和隐藏的弹出框 都会监听一次结束
        // if(typeStartWith.toLowerCase() == 'start' && ('callback' in showAndHideApi)) {
            // typeof showAndHideApi.callback == 'function' ? showAndHideApi.callback(x) : showAndHideApi;
        // }

        if(typeStartWith.toLowerCase() == 'end'/* && ('callback' in showAndHideApi)*/) {
            showAndHideApi.callback(x)
            // typeof showAndHideApi.callback == 'function' ? showAndHideApi.callback(x) : showAndHideApi;
            classList(getNodeList, classList(getNodeList).replace(' ' + x + ' animatedHalf',''), '');
        }
        else {
            classList(getNodeList, classList(getNodeList).replace(' ' + x + ' animated',''), '')
        }
        // fallback(nodelist,currentNodeAnimation);
        getNodeList.removeEventListener(supportsAntEvent_end, callAnimationEventEnd, false);
        getNodeList.removeEventListener(supportsAntEvent_start, callAnimationEventStart, false);
    };

    getNodeList.addEventListener(supportsAntEvent_end, callAnimationEventEnd, false);
    getNodeList.addEventListener(supportsAntEvent_start, callAnimationEventStart, false);
}

var createAnimationApi = function (param) {
    if(co.prototype.hasOwnProperty(param)) return null;
    else {
        co.prototype[param] = function (options) {
            var _this = this;
            co.saveAnimation = function (nodelist, nooo ,delay) {
                _this.animation(nodelist, nooo, param, delay, (options instanceof Object ? options : { type: null, callback: function (){} }));
            }

            // 开始执行初始回调 
            // 第一次执行动画 需要display : block
            if(options.type == 'start' && typeof options.callback === 'function') options.callback();
            return this;
        }
    }
}

for(var k = 0, calen = co.animatiomApi.length; k < calen; k++) {
    createAnimationApi(co.animatiomApi[k]);
}

// 延迟处理当前节点整体的动画时间
co.prototype.delay = function (options) {
    if(typeof options !== 'undefined') co.delay.push(Number(options));
    return this;
}

// 停止调用api方法
// 监听Animation动画
co.prototype.stop = function () {
    return this;
}

co.invokeRender = function (options) {
    return this.prototype.render(options);
}

// 渲染当前脚本的动画效果
co.prototype.render = function (bindArrayParams) {
    // bindArrayParams =  [options]
    co.saveAnimation(co.listItems.shift(), null , co.delay[0]);
}

function readyRender (options) {
    return this;
}

readyRender.prototype = co;

function _coanimation (options) {
    return co.listItems.push(options ? options : null), new co;
}

_coanimation.prototype.render = function (options) {
    var instReadyRender = new readyRender();
    return instReadyRender.invokeRender.apply(instReadyRender, [options]);
}
