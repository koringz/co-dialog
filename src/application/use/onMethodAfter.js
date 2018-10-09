 codialog.prototype.onMethodAfter = function  (obj) {
        // 所有节点和函数都执行之后处理
        if (obj.onDialogAfter
            || obj.onHeaderAfter
            || obj.onBodyAfter
            || obj.onFooterAfter) {
            if(typeof obj.onDialogAfter == 'function') {
                obj.onDialogAfter.call(this.rootDirectory.dialog, this.rootDirectory.dialog);
            }
            if(typeof obj.onHeaderAfter == 'function') {
                obj.onHeaderAfter.call(this.rootDirectory.header, this.rootDirectory.header);
            }
            if(typeof obj.onBodyAfter == 'function') {
                obj.onBodyAfter.call(this.rootDirectory.body, this.rootDirectory.body);
            }
            if(typeof obj.onFooterAfter == 'function') {
                obj.onFooterAfter.call(this.rootDirectory.footer, this.rootDirectory.footer);
            }
        }
}