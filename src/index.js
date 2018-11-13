import 'babel-polyfill'
import style from './../assets/css/co-dialog.min.css';
import * as staticMethods from './staticMethods.js'
import { defaultRefs } from './refs.js'
import { excuteHideAnimation } from './hideAnimation.js'
import { excuteShowAnimation } from './showAnimation.js'
import { resetScroll } from './resetScroll.js'
import { useOptions } from './use/useOptions.js'
import { getElementsByClassName } from './domClass.js'
import { coanimation } from './animation.js'
import { appPushNewElements } from './app/appContext.js'
import { fromAttributesToFindElement } from './domFind.js'
import { classList } from './domMethods.js'
import { $default } from './defaultParameters.js'

const dialogClassNamePart = {
    header: '.dialog-header',
    body: '.dialog-body',
    footer: '.dialog-footer'
}

// co-dialog explanation of each methods
class codialog extends coanimation {
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

        defaultRefs(codialog.prototype)
    }

    app(params) {
        if (this.inArray(params, this.cacheDialogElement)) {
            this.dialogElement = params;
        } else {
            var firstCheckedAppMethodOfParamsIsCorrect = appPushNewElements.call(this, params);
            if (!firstCheckedAppMethodOfParamsIsCorrect) {
                return window.console.warn(`this methods .app("${params}") accepts wrong parameters.you must define correct "class" and "id" and "_"`) && false
            }
        }
        return this
    }

    hide(options) {
        var self = this;
        var _currentElements = this.$(this.dialogElement);

        if (this.isObj(options)) {
            var _timeout = Number(options.timeout);

            if('timeout' in options) {
                if (this.isNum(_timeout) && _timeout > 0) {
                    this.setTimer = setTimeout(() => {
                        if(self.setTimer) {
                            clearTimeout(self.setTimer);
                        }

                        {
                            _currentElements.style.display = 'none';
                            resetScroll(' codialog-show', false);
                        }
                    },
                    _timeout);
                }
                if (this.isFun(options.callback)) {
                    options.callback(_currentElements);
                }
            }

        } else if (this.isUndefined(options)) {
            excuteHideAnimation.call(this, `${this.dialogElement} [mask]`, _currentElements)
        }

        return this;
    }

    show(options) {
        var self = this;
        var _currentElements = this.$(this.dialogElement);

        if (this.isObj(options)) {
            var _timeout = Number(options.timeout);

            if('timeout' in options) {
                if (this.isNum(_timeout) && _timeout > 0) {
                    this.setTimer = setTimeout(() => {
                        if (self.setTimer) {
                            clearTimeout(self.setTimer);
                        }

                        {
                            _currentElements.style.display = 'block';
                            resetScroll(' codialog-show', true);
                        }

                        options.timeout = null;
                    },
                    _timeout);
                }
                if (this.isFun(options.callback)) {
                    options.callback(_currentElements);
                }
            }
        } else if (this.isUndefined(options)) {
            excuteShowAnimation.call(this, `${this.dialogElement} [dialog]`, _currentElements);
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
        const footerButtonGroup = this.find(footer, '[buttonGroup]');

        this.assign(this.rootDirectory, { dialog, mask, header, body, footer });

        // 情况1：传入''字符串
        if (this.isStr(obj) && (this.xString = arguments, this.xString)) {
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
                    obj = {
                        title: this.xString[0],
                        message: this.isStr(this.xString[1]) ? this.xString[1]: 'No message text'
                    };
                    break;
                case 3:
                    obj = {
                        title: this.xString[0],
                        message: this.isStr(this.xString[1]) ? this.xString[1]: 'No message',
                        type: this.isStr(this.xString[2]) ? this.xString[2]: ''
                    };
                    break;
                default:
                    obj = {
                        title: this.xString[0],
                        message: this.isStr(this.xString[1]) ? this.xString[1]: 'No message',
                        type: this.isStr(this.xString[2]) ? this.xString[2]: ''
                    };
                    break;
            }
            this.xString = [];
        }

        // 多次调用 禁修改默认属性
        obj = this.assign(this.clone($default), obj);

        useOptions.apply(this, [{ obj, dialog, mask, header, body, footer, footerButtonGroup, currentDialogElement }]);

        // 默认点击mask隐藏弹出框 点击dialog不会隐藏弹出框
        var ignoreBorderSideClick = false;

        mask.onclick = (ea) => {
            if (ignoreBorderSideClick) {
                return ignoreBorderSideClick = false, null;
            }
            ea = ea || window.event;
            if ((ea.target || ea.srcElement) == mask) {
                // 点击外边框 清除timeout未到时间关闭的定时器
                if (self.setTimer) {
                    clearTimeout(self.setTimer);
                }

                self.$(self.dialogElement).style.display = 'none';

                {
                    // 重置scrollTop属性
                    classList(document.body, classList(document.body).replace(' codialog-show', ''), '');
                    classList(document.documentElement, classList(document.documentElement).replace(' codialog-show', ''), '');
                    document.body.style.paddingRight = 0
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

        mask.onmousedown = () => {
            dialog.onmouseup = (ea) => {
                dialog.onmouseup = null;
                ea = ea || window.event;
                if ((ea.target || ea.srcElement) == dialog || dialog.contains(ea.target || ea.srcElement)) {
                    ignoreBorderSideClick = true;
                }
            }
        }

        if (this.isBoolean(obj.animation) && currentDialogElement) {
            if (!obj.animation) {
                if (this.isStr(obj.customAnimation)) {
                    this.hasAnimation = false;
                    this.customAnimation = obj.customAnimation;
                }
            } else this.hasAnimation = true;
        }
        return this
    }

    $(options) {
        if (options.nodeType === 9) return options.documentElement;
        else if (this.isFun(options.HTMLDocument)) return options;
        return this.find(document.body, options)
    }

    find(parent, options, arr) {
        var self = this;
        if (typeof parent == 'object') {
            if (this.isStr(options)) {
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
};

Object.assign(codialog.prototype, staticMethods);

;((d, s) => {
    let styl = d.createElement('style');
    let head = d.getElementsByTagName('head')[0];
    styl.type = 'text/css';
    if (head.appendChild(styl), styl.stylesheet) {
        styl.stylesheet.cssText = s;
    } else {
        try {
            styl.innerHTML = s;
        } catch(e) {
            styl.innerText = s;
        }
    }
})(document, style);

export default new(codialog);