import { isFalse } from './staticMethods.js'
import { supportBrowserAnimationEventOfName_end } from './defaultParameters.js'
import validateBrowserCompatiblityAnimationEvent from './compatiblity.js'
import resetScroll from './resetScroll.js'

export default function excuteHideAnimation (options, currentDialogNode) {
    // ie8 是否支持 animation.
    if(document.querySelector && document.addEventListener) {
        // 兼容ie9
        if(validateBrowserCompatiblityAnimationEvent(currentDialogNode, supportBrowserAnimationEventOfName_end) == undefined) {
            currentDialogNode.style.display = 'none';
            resetScroll(' codialog-show', false);
            return null;
        }
        // animation动画加载
        this.animate(options).delay(100).fadeOut('fadeOut',{
            type: 'end',
            callback: function () {
                currentDialogNode.style.display = 'none';
                resetScroll(' codialog-show', false);
            }
        }).render();
    }
    else {
        currentDialogNode.style.display = 'none';
        resetScroll(' codialog-show', false);
    }
}