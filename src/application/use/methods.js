
codialog.prototype.methods = function (obj) {
    // 所有子节点都会被获取 进行修改
    // 但是都在before执行之后才执行methods
    /*
        $(this.dialogElement).find('[ref]').each(function (index,item) {
            item.removeAttribute('ref');
        });
    */
    if (typeof obj['methods'] == 'function') {
        this.$methods();
        obj.methods.call(this,this.dialogElement);
    }
}