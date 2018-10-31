import { isFun, isExist } from './staticMethods.js'
import { validateBrowserCompatiblityAnimationEvent } from './compatiblity.js'
import { addEventListener, removeEventListener, classList } from './domMethods.js'
import { animatiomApi, supportBrowserAnimationEventOfName_end, supportBrowserAnimationEventOfName_start } from './defaultParameters.js'

class coanimation {
    constructor(options) {
        this.listItems = [];
        this.wait = [];
        this.animationName = 'bounceOut';
        this.animationConfig = {};

        this.usebind();
    }

    // base on co-ani plugins api
    animate(options) {
        this.listItems = [options]
        return this
    }

    usebind(self) {
        for(const items of animatiomApi) {
            coani.prototype[items] = this.callAnimationApi
        }
    }

    callAnimationApi(_animationName,_animationConfig) {
        this.animationName = _animationName;
        this.animationConfig = _animationConfig;
        // 开始执行初始回调  第一次执行动画 需要display : block
        var callback = _animationConfig.callback;
        if(_animationConfig.type == 'start' && typeof isFun(callback)) callback();
        return this;
    }

    excuteAnimation(nodelist,animationClass, showAndHideApi) {
        var getNodeList = document.querySelector(nodelist);
        var supportsAntEvent_end = validateBrowserCompatiblityAnimationEvent(getNodeList, supportBrowserAnimationEventOfName_end);
        var supportsAntEvent_start = validateBrowserCompatiblityAnimationEvent(getNodeList, supportBrowserAnimationEventOfName_start);

        if(showAndHideApi.type.toLowerCase() == 'end') classList(getNodeList,' ' + animationClass + ' animatedHalf', getNodeList);
        else classList(getNodeList,' ' + animationClass + ' animated', getNodeList);

        var callAnimationEventStart = () => {
            var typeStartWith = showAndHideApi.type;
            // 2种情况
            // 显示弹出框时 有一次动画开始 到结束过程
            // 隐藏弹出框时 也有一次动画开始 到结束过程
            // 不同之处就是隐藏时  本身就显示的弹出框 可见动画被监听
            // 而之前隐藏的弹出框  不可见 就不会立马被监听
            removeEventListener(getNodeList, supportsAntEvent_start, callAnimationEventEnd);
        };

        var callAnimationEventEnd = () => {
            var typeStartWith = showAndHideApi.type;

            // 显示和隐藏的弹出框 都会监听一次结束
            if(typeStartWith.toLowerCase() == 'end') {
                showAndHideApi.callback(animationClass)
                classList(getNodeList, classList(getNodeList).replace(' ' + animationClass + ' animatedHalf',''), '');
            }
            else {
                classList(getNodeList, classList(getNodeList).replace(' ' + animationClass + ' animated',''), '')
            }

            {
                removeEventListener(getNodeList, supportsAntEvent_end, callAnimationEventEnd);
                removeEventListener(getNodeList, supportsAntEvent_start, callAnimationEventStart);
            }
        };

        addEventListener(getNodeList, supportsAntEvent_end, callAnimationEventEnd);
        addEventListener(getNodeList, supportsAntEvent_start, callAnimationEventStart);
    }

    delay(options) {
        if(isExist(options)) this.wait.push(Number(options));
        return this;
    }

    render() {
        this.excuteAnimation(this.listItems.slice(0),this.animationName,this.animationConfig);
    }
}

export {
    coanimation
}