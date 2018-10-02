codialog.prototype.onDialogBefore = function (opt) {}
codialog.prototype.onHeaderBefore = function (opt) {}
codialog.prototype.onBodyBefore = function (opt) {}
codialog.prototype.onFooterBefore = function (opt) {}

codialog.prototype.onHeader = function (child) {
    var self = this;
    var obj = new Object;
    return {
        $refs: (function () {
                    var refList = self.find(child.children,'[ref]', []);
                    self.forEach(refList, function (item) {
                        obj[item.getAttribute('ref')] = item;
                    });
                    return obj;
                })()
    }
}
codialog.prototype.onBody = function (child) {
    var self = this;
    var obj = new Object;
    return {
        $refs: (function () {
                    var refList = self.find(child.children,'[ref]', []);
                    self.forEach(refList, function (item) {
                        obj[item.getAttribute('ref')] = item;
                    });
                    return obj;
                })()
    }
}

codialog.prototype.onFooter = function (child) {
    var self = this;
    var obj = new Object;
    return {
        $refs: (function () {
                    var refList = self.find(child.children,'[ref]', []);
                    self.forEach(refList, function (item) {
                        obj[item.getAttribute('ref')] = item;
                    });
                    return obj;
                })()
    }
}
codialog.prototype.onDialogAfter = function (opt) {}
codialog.prototype.onHeaderAfter = function (opt) {}
codialog.prototype.onBodyAfter = function (opt) {}
codialog.prototype.onFooterAfter = function (opt) {}