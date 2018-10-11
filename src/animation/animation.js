/* animate */
codialog.prototype.animate = function (options) {
    return new co(options)
}

// base on co-excuteAni plugins api
var co = function (options) {
    this.listItems = [options]
    this.wait = []
};

co.prototype.validateAnimationEvent = function (el, eventObjectName) {
    for(var k in eventObjectName) {
        if(el.style[k] != undefined) {
            return eventObjectName[k]
        }
    }
}

co.prototype.excuteAnimation = function (nodelist,x, showAndHideApi) {
    var getNodeList = document.querySelector(nodelist);
    var classList = codialog.prototype.classList;
    var supportsAntEvent_end = this.validateAnimationEvent(getNodeList, supportBrowserAnimationEventOfName_end);
    var supportsAntEvent_start = this.validateAnimationEvent(getNodeList, supportBrowserAnimationEventOfName_start);

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

        getNodeList.removeEventListener(supportsAntEvent_end, callAnimationEventEnd, false);
        getNodeList.removeEventListener(supportsAntEvent_start, callAnimationEventStart, false);
    };

    getNodeList.addEventListener(supportsAntEvent_end, callAnimationEventEnd, false);
    getNodeList.addEventListener(supportsAntEvent_start, callAnimationEventStart, false);
}

var createAnimationApi = function (param) {
    co.prototype[param] = function (options) {
        var _this = this;
        co.saveAnimation = function (nodelist ,delay) {
            _this.excuteAnimation(
                nodelist, 
                param, 
                (options instanceof Object ? 
                    options : 
                    { 
                        type: null, 
                        callback: function (){} 
                    }
                )
            );
        }

        // 开始执行初始回调 
        // 第一次执行动画 需要display : block
        if(options.type == 'start' && typeof options.callback === 'function') options.callback();
        return this;
    }
}

for(var k = 0, calen = animatiomApi.length; k < calen; k++) {
    createAnimationApi(animatiomApi[k]);
}

// 延迟处理当前节点整体的动画时间
co.prototype.delay = function (options) {
    if(typeof options != 'undefined') this.wait.push(Number(options));
    return this;
}

// 渲染当前脚本的动画效果
co.prototype.render = function () {
    // bindArrayParams =  [options]
    co.saveAnimation(this.listItems.slice(0), null , this.wait[0]);
}

co.validateAnimationEvent = co.prototype.validateAnimationEvent