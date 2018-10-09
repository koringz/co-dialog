
codialog.prototype.showButton = function (obj) {
    // 是否显示关闭按钮 默认显示
    var getClose = this.find(this.rootDirectory.header,'[close]'); // 防止自定义获取不到节点
    if (typeof obj.showCloseButton != 'undefined' && typeof obj.showCloseButton == 'boolean' && !obj.showCloseButton && getClose) {
        if(typeof getClose != 'undefined') {
            getClose.style.display = 'none';
        }
    }

    // 显示取消按钮 默认隐藏
    var getCancle = this.find(this.rootDirectory.footerButton,'[cancle]'); // 防止自定义获取不到节点
    if (typeof obj.showCancleButton != 'undefined' && typeof obj.showCancleButton == 'boolean' && obj.showCancleButton && getCancle) {
        if(typeof getCancle != 'undefined', getCancle) {
            getCancle.style.display = 'inline-block';
        }
    }

    // 显示确定按钮 默认显示
    var getConfirm = this.find(this.rootDirectory.footerButton,'[confirm]'); // 防止自定义获取不到节点
    if(typeof obj.showConfirmButton != 'undefined' && typeof obj.showConfirmButton == 'boolean' && getConfirm) {
        if(obj.showConfirmButton) {
            getConfirm.style.display = 'inline-block';
        }
        else {
            getConfirm.style.display = 'none';
        }
    }
}