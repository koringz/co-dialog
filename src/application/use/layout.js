 codialog.prototype.layout = function  (obj) {
    var self = this;
    var currentDialogElement = this.$(this.dialogElement);
    var dialog = this.rootDirectory.dialog;

    // layout 弹出框初始位置 上|下|左|右|居中|左上|左下|右上|右下
    if (typeof obj.layout == 'string' && obj.layout.length) {
        resize()
    }

    function resize () {
        var windowWidth = (document.documentElement || document.body).clientWidth;
        var windowHeidth = (document.documentElement || document.body).clientHeight;

        // offsetWidth 隐藏不能获取处理
        var isOpenDialog = false;
        currentDialogElement.style.zIndex = '-9999';
        if(currentDialogElement.style.display != 'block') {
            currentDialogElement.style.display = 'block';
            isOpenDialog = true;
        }
        
        var targetWidth = dialog.offsetWidth;
        var targetHeight = dialog.offsetHeight;

        if(isOpenDialog) {
            currentDialogElement.style.display = 'none';
            isOpenDialog = false;
        }
        currentDialogElement.style.zIndex = '9999';

        var getBraowserAxis = {
            x: windowWidth / 2,
            y: windowHeidth / 2
        };
        var getTargetAxis = {
            x: targetWidth / 2,
            y: targetHeight / 2
        };

        var currentPostion = obj.layout.toLowerCase().split(' ');
        var filterCurrentPostion = [];
        // 过滤空字符串
        for(var i = 0; i < currentPostion.length; i++){
            if(currentPostion[i].length) filterCurrentPostion.push(currentPostion[i]);
        }
        currentPostion = filterCurrentPostion;

        // 默认重心位置
        function layoutDefaultCenter () {
            dialog.style.left = getBraowserAxis.x - getTargetAxis.x + 'px';
            dialog.style.top = getBraowserAxis.y - getTargetAxis.y + 'px';
        }

        // 只有一个位置
        if(currentPostion.length == 1) {
            currentPostion = self.trim(currentPostion[0]);
            switch (currentPostion) {
                case 'center' :
                    layoutDefaultCenter();
                    break;
                case 'left' :
                    dialog.style.left = 10 + 'px';
                    dialog.style.top = getBraowserAxis.y - getTargetAxis.y + 'px';
                    break;
                case 'right' :
                    dialog.style.left = windowWidth - targetWidth - 10 + 'px';
                    dialog.style.top = getBraowserAxis.y - getTargetAxis.y + 'px';
                    break;
                case 'top' :
                    dialog.style.left = getBraowserAxis.x - getTargetAxis.x + 'px';
                    dialog.style.top = 10 + 'px';
                    break;
                case 'bottom' :
                    dialog.style.left = getBraowserAxis.x - getTargetAxis.x + 'px';
                    dialog.style.top = windowHeidth - targetHeight - 10 + 'px';
                    break;
                default: 
                    layoutDefaultCenter();
                    break;
            }
        }
        else if(currentPostion.length > 1) {
        // 有二个位置
            currentPostion = currentPostion.join(' ');
            if(currentPostion == 'left top' || currentPostion == 'top left') {
                dialog.style.left = 10 + 'px';
                dialog.style.top = 10 + 'px';
            }
            else if(currentPostion == 'left bottom' || currentPostion == 'bottom left') {
                dialog.style.left = 10 + 'px';
                dialog.style.top = windowHeidth - targetHeight - 10 + 'px';
            }
            else if(currentPostion == 'right top' || currentPostion == 'top right') {
                dialog.style.left = windowWidth - targetWidth + 10 + 'px';
                dialog.style.top = 10 + 'px';
            }
            else if(currentPostion == 'right bottom' || currentPostion == 'bottom right') {
                dialog.style.left = windowWidth - targetWidth + 'px';
                dialog.style.top = windowHeidth - targetHeight - 10 + 'px';
            }
            else {
                layoutDefaultCenter();
            }
        }
    }
}