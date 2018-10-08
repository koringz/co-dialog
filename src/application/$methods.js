
codialog.prototype.$methods = function (callback) {
    this.header = this.onHeader({children: this.rootDirectory.header });
    this.body = this.onBody({children: this.rootDirectory.body });
    this.footer = this.onFooter({children: this.rootDirectory.footer });
    if (typeof callback == 'function') callback.call(this, this.dialogElement);
    return this;
}
