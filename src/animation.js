import { isFun } from './staticMethods.js'
import validateBrowserCompatiblityAnimationEvent from './compatiblity.js'
import { addEventListener, removeEventListener, setClassName } from './domMethods.js'
import { animatiomApi, supportBrowserAnimationEventOfName_start, supportBrowserAnimationEventOfName_final } from './defaultParameters.js'

let aniConfig = {};
export default class animation {
    constructor (options) {
        this.animationElement = [];
        this.animationName = 'bounceOut';
    }

    // base on co-ani plugins api
    animate (options) {
        this.animationElement = [options];

        var that = this
        animatiomApi.map(items => {
            animation.prototype[items] = that.callAnimationApi
        })

        return this
    }

    callAnimationApi (_animationName,_animationConfig) {
        this.animationName = _animationName;
        aniConfig = _animationConfig;
        // 开始执行初始回调  第一次执行动画 需要display : block
        if (aniConfig.type === 'start' && isFun(aniConfig.callback)) {
            aniConfig.callback();
        }
        return this;
    }

    excuteAnimation (nodelist,animationClass, showAndHideApi) {
        var getNodeList = document.querySelector(nodelist);
        var supportsAntEvent_final = validateBrowserCompatiblityAnimationEvent(getNodeList, supportBrowserAnimationEventOfName_final);
        var supportsAntEvent_start = validateBrowserCompatiblityAnimationEvent(getNodeList, supportBrowserAnimationEventOfName_start);

        if (showAndHideApi.type.toLowerCase() == 'end') {
            setClassName([getNodeList], params => params + ` ${animationClass} animatedHalf`);
        }
        if (showAndHideApi.type.toLowerCase() == 'start') {
            setClassName([getNodeList], params => params + ` ${animationClass} animated`);
        }

        var callAnimationEventStart = () => {
            // 2种情况
            // 显示弹出框时 有一次动画开始 到结束过程
            // 隐藏弹出框时 也有一次动画开始 到结束过程
            // 不同之处就是隐藏时  本身就显示的弹出框 可见动画被监听
            // 而之前隐藏的弹出框  不可见 就不会立马被监听
            removeEventListener(getNodeList, supportsAntEvent_start, callAnimationEventFinal);
        };

        var callAnimationEventFinal = () => {
            // 显示和隐藏的弹出框 都会监听一次结束
            if (showAndHideApi.type.toLowerCase() == 'end') {
                showAndHideApi.callback(animationClass)
                setClassName([getNodeList], params => params.replace(new RegExp(` ${animationClass} animatedHalf`, 'gm'), '') );
            }

            if (showAndHideApi.type.toLowerCase() == 'start') {
                setClassName([getNodeList], params => params.replace(new RegExp(` ${animationClass} animated`, 'gm'), '') );
            }

            removeEventListener(getNodeList, supportsAntEvent_final, callAnimationEventFinal);
            removeEventListener(getNodeList, supportsAntEvent_start, callAnimationEventStart);
        };

        addEventListener(getNodeList, supportsAntEvent_final, callAnimationEventFinal);
        addEventListener(getNodeList, supportsAntEvent_start, callAnimationEventStart);
    }

    render () {
        this.excuteAnimation(this.animationElement.slice(0),this.animationName,aniConfig);
    }
}