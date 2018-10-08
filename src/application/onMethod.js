 codialog.prototype.onMethod = function  (obj) {
    // 在执行前处理节点属性设置
    if (obj.onDialogBefore
        || obj.onHeaderBefore
        || obj.onBodyBefore
        || obj.onFooterBefore) {

        if(typeof obj.onDialogBefore == 'function') {
            obj.onDialogBefore.call(this.rootDirectory.dialog, this.rootDirectory.dialog);
        }
        if(typeof obj.onHeaderBefore == 'function') {
            obj.onHeaderBefore.call(this.rootDirectory.header, this.rootDirectory.header);
        }
        if(typeof obj.onBodyBefore == 'function') {
            obj.onBodyBefore.call(this.rootDirectory.body, this.rootDirectory.body);
        }
        if(typeof obj.onFooterBefore == 'function') {
            obj.onFooterBefore.call(this.rootDirectory.footer, this.rootDirectory.footer);
        }
    }
}