const { isFalse } = require('./staticMethods.js');
const { supportBrowserAnimationEventOfName_end } = require('./defaultParameters.js')
const { validateBrowserCompatiblityAnimationEvent } = require('./compatiblity.js')
const { resetScroll } = require('./resetScroll.js')

export const excuteShowAnimation = function (options, currentDialogNode) {
    var self = this;
    var resetDefaultAnimation = 'bounceIn';

    // ie8 是否支持 animation.
    if(document.querySelector && document.addEventListener) {
        // 兼容ie9
        if(validateBrowserCompatiblityAnimationEvent(currentDialogNode, supportBrowserAnimationEventOfName_end) == undefined) {
            currentDialogNode.style.display = 'block';
            resetScroll(' codialog-show', true);
            return null;
        }
        if(isFalse(self.hasAnimation)) resetDefaultAnimation = this.customAnimation || resetDefaultAnimation;
        // animation动画加载
        self.animate(options).delay(100)[resetDefaultAnimation](resetDefaultAnimation,{
            type: 'start',
            callback: function () {
                currentDialogNode.style.display = 'block';
                resetScroll(' codialog-show', true);
            }
        })
        .render();
    }
    else {
        currentDialogNode.style.display = 'block';
        resetScroll(' codialog-show', true);
    }
}