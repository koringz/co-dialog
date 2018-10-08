
codialog.prototype.app = function (params) {
    var self = this;
    this.appExist(params) ? false: this.appPushNewElements(params);
    return this
}

codialog.prototype.appExist = function (el) {
    if (this.inArray(el,this.cacheDialogElement)) {
        this.dialogElement = el;
        return true;
    }
}

codialog.prototype.appPushNewElements = function (attr) {
    if (typeof attr == 'string') {
        if (attr.search(/^(\.|\#)/)+1) {
            var getElement = setAttribute(attr);

            getElement.innerHTML += codialogTemplate();

            document.body.appendChild(getElement);
        }

        appDialog.call(this, attr);

        this.cacheDialogElement.push(attr);
    }
}

function setAttribute (options) {
    var createDiv = document.createElement('div');

    if (options.charAt(0) == '.') {
        classOrId.class(createDiv, options.slice(1))
    }
    if (options.charAt(0) == '#') {
        classOrId.id(createDiv, options.slice(1))
    }

    return createDiv
}

var classOrId = {
    class: function (el, name) {
        if(el.classList) {
            el.setAttribute('class',name);
        }
        else {
            el.className = name;
        }
    },
    id: function (el, name) {
        el.setAttribute('id',name);
    }
}

var appDialog = function  (options) {
    this.didDialogList = [];
    this.dialogElement = options || null;
    this.strict = {
        header:'.dialog-header',
        body:'.dialog-body',
        footer:'.dialog-footer'
    };
}