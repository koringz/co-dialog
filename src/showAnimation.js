import { isFalse } from './staticMethods.js'
import resetScroll from './resetScroll.js'
import validateBrowserCompatiblityAnimationEvent from './compatiblity.js'
import { supportBrowserAnimationEventOfName_end } from './defaultParameters.js'

export default function excuteShowAnimation (options, currentDialogNode) {
    var resetDefaultAnimation = 'bounceIn';

    // 兼容 animation.
    if( validateBrowserCompatiblityAnimationEvent(currentDialogNode, supportBrowserAnimationEventOfName_end) != undefined ) {
        if(isFalse(this.hasAnimation)) resetDefaultAnimation = this.customAnimation || resetDefaultAnimation;
        // animation动画加载
        this.animate(options).delay(100)[resetDefaultAnimation](resetDefaultAnimation,{
            type: 'start',
            callback: () => {
                currentDialogNode.style.display = 'block';
                resetScroll(' codialog-show', true);
            }
        })
        .render();
    }
    else {
        // ie9 不兼容 animation.
        currentDialogNode.style.display = 'block';
        resetScroll(' codialog-show', true);
    }
}