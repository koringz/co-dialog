
codialog.prototype.use = function (obj, success_config) {
    var currentDialogElement = this.$(this.dialogElement);

    this.assign(this.rootDirectory, {
        dialog  : this.find(currentDialogElement, '[dialog]'),
        mask    : this.find(currentDialogElement, '[mask]'),
        header  : this.find(currentDialogElement, '[header]'),
        body    : this.find(currentDialogElement, '[body]'),
        footer  : this.find(currentDialogElement, '[footer]'),
        footerButton: this.find(this.find(currentDialogElement, '[footer]'),'[buttonGroup]')
    });

    // 情况1：传入''字符串
    this.x_string(obj,arguments)

    // 情况2：传入{}对象 禁修改默认属性
    obj = this.assign(this.clone($default), obj);
    
    if (typeof obj != 'undefined' && Object.prototype.toString.call(obj) == '[object Object]') {

        this.onMethodBefore(obj);

        this.overtime(obj);

        this.showMask(obj);

        this.isDrag(obj);

        this._footerText(obj);

        this.textContent(obj);


        this.methods(obj);

        this.callMargin(obj);
        
        this.closeEvent(obj);

        this.showButton(obj);

        this.onMethodAfter(obj);

        this.layout(obj);

        // 弹出框固定宽度
        this.width(obj);
        // 弹出框固定高度
        this.height(obj);
        // 自适应高度
        this.adaptHeight(obj);
        // 自适应宽度
        this.adaptWidth(obj);
        // 水平居中
        this.left(obj);
        // 垂直居中
        this.top(obj);
    }

    this.mouseEvent(obj);

    return this
}
