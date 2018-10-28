import 'babel-polyfill'
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
    paramsAndCallback 
} = require('./staticMethods.js');

const { 
    addEventListener,
    removeEventListener,
    classOrId,
    classList 
} = require('./domMethods.js')

const {
    $default,
    animatiomApi,
    supportBrowserAnimationEventOfName_end,
    supportBrowserAnimationEventOfName_start
} = require('./defaultParameters.js')

const {
    defaultRefs
} = require('./refs.js')

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

const {
    getElementsByClassName
} = require('./domClass.js')

const {
    coani
} = require('./animation.js')

const {
    appPushNewElements
} = require('./app/appContext.js')

const {
    fromAttributesToFindElement
} = require('./domFind.js')

const dialogClassNamePart = {
    header: '.dialog-header',
    body: '.dialog-body',
    footer: '.dialog-footer'
}

// co-dialog explanation of each methods
class codialog extends coani {
    constructor(options) {
        super(options);

        this.name = 'coog';
        this.xString = [];
        this.setTimer = null;
        this.mouseoutcount = 0;
        this.rootDirectory = {};
        this.didDialogList = [];
        this.hasAnimation = true;
        this.closeBackValue = false;
        this.cacheDialogElement = [];
        this.customAnimation = 'bounceOut'
        this.strict = dialogClassNamePart;
        this.dialogElement = options || null;

        defaultRefs(this)
    }

    app(params) {
        if (inArray(params, this.cacheDialogElement)) {
            this.dialogElement = params;
        } else {
            var firstCheckedAppMethodOfParamsIsCorrect = appPushNewElements.call(this, params);
            if (!firstCheckedAppMethodOfParamsIsCorrect) {
                return window.console.warn('this methods .app("' + params + '") accepts wrong parameters.', 'you must define correct "class" and "id" and "_"') && false
            }
        }
        return this
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
                this.setTimer = setTimeout(() => {
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
                excuteShowAnimation.call(this, options + ' [dialog]', _currentElements);
            }
        } else if (isObj(options)) {
            var _timeout = Number(options.timeout);
            if ('timeout' in options && isNum(_timeout) && _timeout > 0) {
                this.setTimer = setTimeout(() => {
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

    use(obj, success_config) {
        const self = this;
        const currentDialogElement = this.$(this.dialogElement);

        const dialog    = this.find(currentDialogElement, '[dialog]');
        const mask      = this.find(currentDialogElement, '[mask]');
        const header    = this.find(currentDialogElement, '[header]');
        const body      = this.find(currentDialogElement, '[body]');
        const footer    = this.find(currentDialogElement, '[footer]');

        assign(this.rootDirectory, {
            dialog  : dialog,
            mask    : mask,
            header  : header,
            body    : body,
            footer  : footer
        });

        // 情况1：传入''字符串
        if (arguments.length && isStr(obj) && (this.xString, this.xString = arguments)) {
            switch (this.xString.length) {
                case 1:
                    obj = {
                        message: this.xString[0],
                        onHeaderBefore() {
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
        var arrel = { obj, dialog, mask, header, body, footer, footerButtonGroup, currentDialogElement }

        useOptions.apply(this, [arrel]);

        // 默认点击mask隐藏弹出框 all actions 
        // 点击dialog不会隐藏弹出框 all actions
        var ignoreBorderSideClick = false;

        mask.onclick = (ea) => {
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

        mask.onmousedown = () => {
            dialog.onmouseup = (ea) => {
                dialog.onmouseup = null;
                ea = ea || window.event;
                if ((ea.target || ea.srcElement) == dialog || dialog.contains(ea.target || ea.srcElement)) {
                    ignoreBorderSideClick = true;
                }
            }
        }

        dialog.onmousedown = () => {
            mask.onmouseup = (ea) => {
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
        if (isFun(callback)) callback.call(this, this.dialogElement);
        return this;
    }

    $(options) {
        if (options.nodeType === 9) return options.documentElement;
        else if (isFun(options.HTMLDocument)) return options;
        return this.find(document.body, options)
    }

    find(parent, options, arr) {
        var self = this;
        if (typeof parent == 'object') {
            if (isStr(options)) {
                if (options.search(/^(\.)/) + 1) {
                    return getElementsByClassName(parent, options.slice(1))
                } else if (options.search(/^(\#)/) + 1) {
                    return parent.ownerDocument.getElementById(options.slice(1))
                } else if (options.search(/^(\s*)(\[.*\])/g) + 1) {
                    // arr 表示当前节点下面 存在多个节点
                    return fromAttributesToFindElement(parent.children, options.slice(1, options.length - 1), arr)
                } else return parent.getElementsByTagName(options)
            }
        }
    }
}

;((d, s) => {
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


const coog = new(codialog);

export default coog