
codialog.prototype.show = function (options) {
    var self = this;
    var resetDefaultAnimation = 'bounceIn';

    function excuteShowAnimation (options, currentDialogNode) {
        // ie8 是否支持.
        if(document.querySelector && document.addEventListener) {
            // 兼容ie9
            if(co.validateAnimationEvent(currentDialogNode, co.supportBrowserAnimationEventOfName_end) == undefined) {
                currentDialogNode.style.display = 'block';
                self.resetScroll(true)
                return null;
            }
            if(!self.hasAnimation) resetDefaultAnimation = self.customAnimation || resetDefaultAnimation;
            // animation动画加载
            self.animate(options).delay(100)[resetDefaultAnimation]({
                type: 'start',
                callback: function () {
                    currentDialogNode.style.display = 'block';
                    self.resetScroll(true)
                }
            })
            .render();
        }
        else {
            currentDialogNode.style.display = 'block';
            self.resetScroll(true)
        }
    }

    if(typeof options == 'string') {
        if (this.inArray(options,this.cacheDialogElement)) {
            excuteShowAnimation(options + ' [dialog]', self.$(self.dialogElement))
        }
    }
    else if (typeof options != 'undefined' && Object.prototype.toString.call(options) == '[object Object]') {
        var getKeys = this.keys(options);
        if(getKeys[0].toLowerCase() == 'timeout' && isNaN(options[getKeys[0]])) {
            this.setTimer = setTimeout(function() {
                self.$(self.dialogElement).style.display = 'block';
                self.resetScroll(true)
                options[getKeys[1]] = null;
            }, options[getKeys[0]]);
        }
        if(getKeys[1]){
            if(getKeys[1].toLowerCase() == 'callback') options[getKeys[1]](this.$(this.dialogElement));
        }
    }
    else {
        excuteShowAnimation(self.dialogElement + ' [dialog]', self.$(self.dialogElement))
    }


    return this;
}