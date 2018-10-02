
codialog.prototype.width = function  (obj) {
    if (!isNaN(obj.width) || (typeof obj.width != 'string' ? false : this.trim(obj.width).search(/^[\d]+(\em|\px|\%|rem|\ex)$/g) >= 0)) {
        var varCurrentNode = this.find(this.rootDirectory.dialog,'[aria-dialogBox]');
        if(Number(obj.width)) varCurrentNode.style.width = obj.width + 'px';
        varCurrentNode.style.width = obj.width;
    }
    return this;
}

codialog.prototype.height = function  (obj) {
    if (!isNaN(obj.height) || (typeof obj.height != 'string' ? false : this.trim(obj.height).search(/^[\d]+(\em|\px|\%|rem|\ex)$/g) >= 0)) {
        var varCurrentNode = this.find(this.rootDirectory.dialog,'[aria-dialogBox]');
        if(Number(obj.height)) varCurrentNode.style.height = obj.height + 'px';
        varCurrentNode.style.height = obj.height;
    }
    return this;
}

codialog.prototype.adaptHeight = function (obj) {
    if (typeof obj.adaptHeight != 'undefined' && typeof obj.adaptHeight == 'boolean') {
        this.find(this.rootDirectory.dialog,'[aria-dialogBox]').setAttribute('style','height:inherit');
    }
    else return this;
}

codialog.prototype.adaptWidth = function (obj) {
    if (typeof obj.adaptWidth != 'undefined' && typeof obj.adaptWidth == 'boolean') {
        this.find(this.rootDirectory.dialog,'[aria-dialogBox]').setAttribute('style','width:inherit');
    }
    else return this;
}

codialog.prototype.left = function (obj) {
    /*if(this.rootDirectory.dialog.getAttribute('aria-dialog')) {
        if(Number(obj.width)) obj.width = Number(obj.width) / 3 + 'px';
        this.rootDirectory.dialog.style.left =  obj.width;
    }*/
    return this.rootDirectory.dialog.style.left
}

codialog.prototype.top = function (obj) {
    /*if(this.rootDirectory.dialog.getAttribute('aria-dialog')) {
        if(Number(obj.height)) obj.height = Number(obj.height) / 2 + 'px';
        this.rootDirectory.dialog.style.top =  obj.height;
    }*/
    return this.rootDirectory.dialog.style.top
}