import style from './../assets/css/co-dialog.min.css';

const {
    isUndefined,
    isExist,
    isFun,
    isObj,
    isNull,
    isArr,
    isStr,
    isBoolean,
    isTrue,
    isFalse,
    isNum,
    isEmptyObj,
    isNan,
    search,
    trim,
    forEach,
    clone,
    assign,
    objectKey,
    inArray,
    isArray,
    addEventListener,
    removeEventListener,
    paramsAndCallback,
    classOrId,
    createDivAndSetAttribute,
    classList
} = require('./staticMethods.js');

const {
    $default,
    dialogTemplate,
    animatiomApi,
    supportBrowserAnimationEventOfName_end,
    supportBrowserAnimationEventOfName_start
} = require('./defaultParameters.js')

const {
    defaultRefs
} = require('./refs.js')

const {
    coani
} = require('./animation.js')

const {
    excuteHideAnimation
} = require('./hideAnimation.js')

const {
    excuteShowAnimation
} = require('./showAnimation.js')

const {
    resetScroll
} = require('./resetScroll.js')

const {
    useOptions
} = require('./use/useOptions.js')

// co-dialog explanation of each methods
class codialog {
    constructor(options) {
        this.didDialogList = [];
        this.dialogElement = options || null;
        this.strict = {
            header: '.dialog-header',
            body: '.dialog-body',
            footer: '.dialog-footer'
        };
        this.cacheDialogElement = [];
        this.setTimer = null;
        this.name = 'codialog';
        this.mouseoutcount = 0;
        this.rootDirectory = {};
        this.closeBackValue = false;
        this.xString = [];
        this.hasAnimation = true;
        this.customAnimation = 'bounceOut'

        defaultRefs(this)
    }

    app(params) {
        if (inArray(params, this.cacheDialogElement)) {
            this.dialogElement = params;
        } else {
            var firstCheckedAppMethodOfParamsIsCorrect = this.appPushNewElements(params);
            if (!firstCheckedAppMethodOfParamsIsCorrect) {
                return window.console.warn('this methods .app("' + params + '") accepts wrong parameters.', 'you must define correct "class" and "id" and "_"') && false
            }
        }
        return this
    }

    appPushNewElements(attr) {
        if (isStr(attr), attr.search(/^(\.|\#)/) + 1, attr.slice(1).search(/^[\_|(a-zA-Z)]/) + 1) {
            var getElement = createDivAndSetAttribute(attr);
            getElement.innerHTML += dialogTemplate();
            document.body.appendChild(getElement);

            this.dialogElement = attr || null;
            this.cacheDialogElement.push(attr);
            return true
        } else return false
    }

    hide(options) {
        var self = this;
        var _currentElements = this.$(this.dialogElement);

        if (isStr(options)) {
            if (inArray(options, this.cacheDialogElement)) {
                excuteHideAnimation.call(this, options + ' [mask]', this.$(options))
            }
        } else if (isObj(options)) {
            var _timeout = Number(options.timeout);
            if ('timeout' in options && isNum(_timeout) && _timeout > 0) {
                this.setTimer = setTimeout(function() {
                    _currentElements.style.display = 'none';
                    resetScroll(' codialog-show', false);
                    clearTimeout(self.setTimer);
                },
                _timeout);
            }
            if ('callback' in options && isFun(options.callback)) {
                options.callback(_currentElements);
            }
        } else if (isUndefined(options)) {
            _currentElements.style.display = 'none';
            resetScroll(' codialog-show', false);
        }

        return this;
    }

    show(options) {
        var self = this;
        var _currentElements = this.$(this.dialogElement);

        if (isStr(options)) {
            if (inArray(options, this.cacheDialogElement)) {
                excuteShowAnimation(this, options + ' [dialog]', _currentElements);
            }
        } else if (isObj(options)) {
            var _timeout = Number(options.timeout);
            if ('timeout' in options && isNum(_timeout) && _timeout > 0) {
                this.setTimer = setTimeout(function() {
                    _currentElements.style.display = 'block';
                    resetScroll(' codialog-show', true);
                    options.timeout = null;
                    clearTimeout(self.setTimer);
                },
                _timeout);
            }
            if ('callback' in options && isFun(options.callback)) {
                options.callback(_currentElements);
            }
        } else if (isUndefined(options)) {
            excuteShowAnimation.call(this, self.dialogElement + ' [dialog]', _currentElements);
        }

        return this;
    }

    $(options) {
        if (options.nodeType === 9) return options.documentElement;
        else if (isFun(options.HTMLDocument)) return options;
        return this.find(document.body, options)
    }

    getElementsByClassName(parent, childClass) {
        if (isFun(parent.getElementsByClassName)) {
            var divTagName = parent.getElementsByTagName('*');
            var divTagNameLength = divTagName.length;
            var saveSensitiveElement = [];
            for (var i = 0; i < divTagNameLength; i++) {
                if (isStr(divTagName[i].className)) {
                    var getClassNameGroup = divTagName[i].className.split(' ');
                    if (inArray(childClass, getClassNameGroup)) {
                        saveSensitiveElement.push(divTagName[i]);
                        break;
                    }
                }
            }
            return saveSensitiveElement[0]
        }
    }

    find(parent, options, arr) {
        var self = this;
        if (typeof parent == 'object') {
            if (isStr(options)) {
                if (options.search(/^(\.)/) + 1) {
                    return self.getElementsByClassName(parent.nodeType == 9 ? document: parent, options.slice(1))
                } else if (options.search(/^(\#)/) + 1) {
                    return parent.ownerDocument.getElementById(options.slice(1))
                } else if (options.search(/^(\s*)(\[.*\])/g) + 1) {
                    var saveChildList = [];

                    // arr 表示当前节点下面 存在多个节点
                    function fromAttributesToFindElement(parentElement, attr, arr) {
                        if (parentElement.length) {
                            for (var i = 0,
                            parentLength = parentElement.length; i < parentLength; i++) {

                                // 检查属性 [mask] 为字符串 获得当前节点
                                if (isStr(parentElement[i].getAttribute(attr))) {
                                    saveChildList.push(parentElement[i]);
                                    // 数组 继续执行for循环
                                    if (isArray(arr)) continue;
                                    else break; // break;退出兼容ie9and10 
                                } else {
                                    if (parentElement.length == 1) {
                                        // 长度为1 往下找
                                        return fromAttributesToFindElement(parentElement[i].children, attr, arr)
                                    }
                                    if (parentLength > 1 && i < parentLength) {
                                        // 存在多个节点
                                        continue;
                                    } else {
                                        return;
                                    }
                                }
                            }
                            if (isArray(arr)) return saveChildList;
                            return saveChildList[0]
                        }
                    }
                    return fromAttributesToFindElement(parent.children, options.slice(1, options.length - 1), arr)

                } else return parent.getElementsByTagName(options)
            }
        }
    }

    use(obj, success_config) {
        var self = this;
        var currentDialogElement = this.$(this.dialogElement);

        var dialog = this.find(currentDialogElement, '[dialog]');
        var mask = this.find(currentDialogElement, '[mask]');
        var header = this.find(currentDialogElement, '[header]');
        var body = this.find(currentDialogElement, '[body]');
        var footer = this.find(currentDialogElement, '[footer]');

        assign(this.rootDirectory, {
            dialog: dialog,
            mask: mask,
            header: header,
            body: body,
            footer: footer
        });

        // 情况1：传入''字符串
        if (arguments.length && isStr(obj) && (this.xString, this.xString = arguments)) {
            switch (this.xString.length) {
            case 1:
                obj = {
                    message: this.xString[0],
                    onHeaderBefore: function() {
                        this.style.display = 'none'
                    }
                };
                break;
            case 2:
                var getSecondPart = this.xString[1];
                obj = {
                    title: this.xString[0],
                    message: isStr(getSecondPart) ? getSecondPart: 'No message text'
                };
                break;
            case 3:
                var getSecondPart = this.xString[1];
                var getType = this.xString[2];
                obj = {
                    title: this.xString[0],
                    message: isStr(getSecondPart) ? getSecondPart: 'No message',
                    type: isStr(getType) ? getType: ''
                };
                break;
            default:
                var getSecondPart = this.xString[1];
                var getType = this.xString[2];
                obj = {
                    title: this.xString[0],
                    message: isStr(getSecondPart) ? getSecondPart: 'No message',
                    type: isStr(getType) ? getType: ''
                };
                break;
            }
            this.xString = [];
        }

        // 情况2：传入{}对象
        var footerButtonGroup = this.find(footer, '[buttonGroup]');
        // 多次调用 禁修改默认属性
        var disabledChangedDefault = clone($default);

        obj = assign(disabledChangedDefault, obj);

        var arrel = {
            obj,
            dialog, mask, header, body, footer, footerButtonGroup, currentDialogElement
        }
        useOptions.apply(this, [arrel]);

        // 默认点击mask隐藏弹出框 all actions 
        // 点击dialog不会隐藏弹出框 all actions
        var ignoreBorderSideClick = false;

        mask.onclick = function(ea) {
            if (ignoreBorderSideClick) {
                ignoreBorderSideClick = false;
                return;
            }

            ea = ea || window.event;
            if ((ea.target || ea.srcElement) == mask) {
                // 点击外边框 清除timeout未到时间关闭的定时器
                clearTimeout(self.setTimer);
                self.$(self.dialogElement).style.display = 'none';

                // 重置scrollTop属性
                classList(document.body, classList(document.body).replace(' codialog-show', ''), '');
                classList(document.documentElement, classList(document.documentElement).replace(' codialog-show', ''), '');
                document.body.style.paddingRight = '0'
            }
        }

        mask.onmousedown = function() {
            dialog.onmouseup = function(ea) {
                dialog.onmouseup = null;

                ea = ea || window.event;
                if ((ea.target || ea.srcElement) == dialog || dialog.contains(ea.target || ea.srcElement)) {
                    ignoreBorderSideClick = true;
                }
            }
        }

        dialog.onmousedown = function() {
            mask.onmouseup = function(ea) {
                mask.onmouseup = null;

                ea = ea || window.event;
                if ((ea.target || ea.srcElement) == mask) {
                    ignoreBorderSideClick = true;
                }
            }
        }

        if (isBoolean(obj.animation) && currentDialogElement) {
            if (!obj.animation) {
                if (isStr(obj.customAnimation)) {
                    this.hasAnimation = false;
                    this.customAnimation = obj.customAnimation;
                }
            } else this.hasAnimation = true;
        }
        return this
    }

    $methods(callback) {
        this.header = this.onHeader({
            children: this.rootDirectory.header
        });
        this.body = this.onBody({
            children: this.rootDirectory.body
        });
        this.footer = this.onFooter({
            children: this.rootDirectory.footer
        });
        if (isFun(callback)) callback.call(this, this.dialogElement);
        return this;
    }

}

(function(d, s) {
    var sty = d.createElement('style');
    var head = d.getElementsByTagName('head')[0];
    sty.type = 'text/css';

    if (head.appendChild(sty), sty.stylesheet) {
        sty.stylesheet.cssText = s;
    } else {
        try {
            sty.innerHTML = s;
        } catch(e) {
            sty.innerText = s;
        }
    }
})(document, style);

// base on co-ani plugins api
codialog.prototype.animate = function(options) {
    return new coani(options)
}

const coog = new(codialog);

export default coog