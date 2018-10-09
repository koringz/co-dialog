
codialog.prototype._footerText = function (obj) {
    // 底部有无按钮
    // 底部显示的是倒计时或者是其他信息
    // attr = [textGroup] or string
    if (typeof obj.footerText != 'undefined' && typeof obj.footerText == 'string'  && this.find(this.rootDirectory.footer,'[textGroup]')) {
        this.find(this.rootDirectory.footer,'[textGroup]').innerHTML = obj.footerText;
    }
    else if (typeof obj.footerText != 'undefined' && Object.prototype.toString.call(obj.footerText) == '[object Array]' && this.find(this.rootDirectory.footer,'[textGroup]')) {
        if (obj.footerText.length > 0) {
            this.find(this.rootDirectory.footer,'[textGroup]').innerHTML = obj.footerText.concat().join('');
        }
    }
    else {
        this.removeChild(this.find(footer,'[textGroup]'));
    }
}