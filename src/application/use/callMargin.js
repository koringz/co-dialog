
codialog.prototype.callMargin = function (obj) {
    /*
    * 设置边距 *
    如果是数字 上下左右设置相同的值
    ======================================================================================
    if (typeof obj.headerMargin != 'undefined' && !isNaN(obj.headerMargin)) {
        $(this.dialogElement).find(this.strict.header).css({'padding' : obj.headerMargin });
    }
    ======================================================================================
    否则如果是对象的情况下
    就会传入水平和垂直属性的值
    有二种情况
    其一是全部是数字
    其二是全部使用px字符串
    */
    this.margin(obj,'header', 'headerMargin', 'padding');
    // body
    this.margin(obj,'body', 'bodyMargin', null);
    // footer
    this.margin(obj,'footer', 'footerMargin', 'padding');
}