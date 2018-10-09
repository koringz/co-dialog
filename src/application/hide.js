

codialog.prototype.hide = function (options) {
    var self = this;

    function excuteHideAnimation (options, currentDialogNode) {
        // ie8 是否支持.
        if(document.querySelector && document.addEventListener) {
            // 兼容ie9
            if(co.validateAnimationEvent(currentDialogNode, co.supportBrowserAnimationEventOfName_end) == undefined) {
                currentDialogNode.style.display = 'none';
                self.resetScroll(false)
                return null;
            }
            
            // animation动画加载
            self
            .animate(options)
            .delay(100)
            .fadeOut({
                type: 'end',
                callback: function () {
                    currentDialogNode.style.display = 'none';
                    self.resetScroll(false)
                }
            })
            .render();
        }
        else {
            currentDialogNode.style.display = 'none';
            self.resetScroll(false)
        }
    }

    if(typeof options == 'string') {
        if (this.inArray(options,this.cacheDialogElement)) {
            excuteHideAnimation(options + ' [mask]', self.$(options))
        }
    }
    else if (typeof options != 'undefined' && Object.prototype.toString.call(options) == '[object Object]') {
        var keys = this.keys(options);

        if('timeout' in options && Number(options[keys[0]])) {
            if(this.setTimer) clearTimeout(this.setTimer);
            self.setTimer = setTimeout(function() {

               self.$(self.dialogElement).style.display = 'none';
               self.resetScroll(false)
            }, options[keys[0]]);
        }

        if('callback' in options && typeof keys[1] == 'function'){
            options[keys[1]](this.$(this.dialogElement));
        }
    }
    else {
        self.$(self.dialogElement).style.display = 'none';
        self.resetScroll(false)
    }


    return this;
}

