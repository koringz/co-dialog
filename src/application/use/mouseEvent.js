 codialog.prototype.mouseEvent = function  (obj) {
    var self = this;
    // 默认点击mask隐藏弹出框 all actions 
    // 点击dialog不会隐藏弹出框 all actions
    var ignoreBorderSideClick = false;
    var dialog = this.rootDirectory.dialog;
    var mask = this.rootDirectory.mask;
    var currentDialogElement = this.$(this.dialogElement);

    mask.onclick = function (ea) {
        if(ignoreBorderSideClick) {
            ignoreBorderSideClick = false;
            return;
        }

        ea = ea || window.event;
        if((ea.target || ea.srcElement) == mask) {
            // 点击外边框 清除timeout未到时间关闭的定时器
            clearTimeout(self.setTimer);

            self.$(self.dialogElement).style.display = 'none';

            // 重置scrollTop属性
            self.classList(document.body, self.classList(document.body).replace(' codialog-show',''), '');
            self.classList(document.documentElement, self.classList(document.documentElement).replace(' codialog-show',''), '');
        }
    }

    mask.onmousedown = function () {
        dialog.onmouseup = function (ea) {
            dialog.onmouseup = null;

            ea = ea || window.event;
            if((ea.target || ea.srcElement) == dialog || dialog.contains(ea.target||ea.srcElement)) {
                ignoreBorderSideClick = true;
            }
        }
    }

    dialog.onmousedown = function () {
        mask.onmouseup = function (ea) {
            mask.onmouseup = null;

            ea = ea || window.event;
            if((ea.target || ea.srcElement) == mask) {
                ignoreBorderSideClick = true;
            }
        }
    }


    if (typeof obj.animation != 'undefined' && typeof obj.animation == 'boolean' && currentDialogElement) {
        if(!obj.animation) {
            if(typeof obj.customAnimation == 'string') {
                this.hasAnimation = false;
                this.customAnimation = obj.customAnimation;
            }
        }
        else this.hasAnimation = true;
    }
        
}