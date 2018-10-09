
codialog.prototype.closeEvent = function (obj) {
    var self = this;
    // 是否关闭dialog
    // 默认开启dialog
    // default: true
    if (typeof obj.isClose == 'boolean' && obj.isClose) {
        // 防止通过 this.dialogElement 元素查找失效
        var _currentDialogElement = this.$(this.dialogElement);

        var cacheCloseList = [];
        var headerClose = this.find(this.rootDirectory.header,'[close]');
        if(typeof headerClose != 'undefined', headerClose) {
            cacheCloseList.push(headerClose);
        }

        var footerCancle = this.find(this.rootDirectory.footerButton,'[cancle]');
        if(typeof footerButton!= 'undefined', footerCancle) {
            if(typeof footerCancle != 'undefined') {
                cacheCloseList.push(footerCancle);
            }
        }

        var footerConfirm = this.find(this.rootDirectory.footerButton,'[confirm]');
        if(typeof footerButton!= 'undefined', footerConfirm) {
            if(typeof footerConfirm != 'undefined') {
                cacheCloseList.push(footerConfirm);
            }
        }

        if(cacheCloseList.length > 0) {
            this.forEach(cacheCloseList, function (close, index) {
                close.onclick = function (e) {
                    self.hide((_currentDialogElement.className.length ? '.' + _currentDialogElement.className : '#' + _currentDialogElement.getAttribute('id')))
                    clearTimeout(self.setTimer);

                    // 确认按钮的回调函数
                    if(index == 2 && typeof obj.confirmCallback == 'function') {
                        obj.confirmCallback()
                    }
                    // 取消按钮的回调函数
                    else if(index == 1 && typeof obj.cancleCallback == 'function') {
                        obj.cancleCallback()
                    }

                    self.closeBackValue = true;
                }
            })
        }
    }
}