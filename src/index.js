import './addStyle.js'
import defaultRefs from './refs.js'
import getClass from './domClass.js'
import coanimation from './animation.js'
import resetScroll from './resetScroll.js'
import { classList } from './domMethods.js'
import useOptions from './use/useOptions.js'
import appPushNewElements from './app/appContext.js'
import excuteShowAnimation from './showAnimation.js'
import excuteHideAnimation from './hideAnimation.js'
import fromAttributesToFindElement from './domFind.js'
import * as staticMethods from './staticMethods.js'
import { $default, dialogClassNamePart } from './defaultParameters.js'

// co-dialog explanation of each methods
class codialog extends coanimation {
    constructor(options) {
        super(options);

        this.name = 'coog';
        this.xString = [];
        this.setTimer = null;
        this.tracker = false;
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
            // 添加一个追踪当前类的条件
            // 通过 this.app('.dialog').tracker
            // 验证存在为true 否则为false
            // 一般用在 onDialogBefore\onHeaderBefore\onBodyBefore\onFooterBefore\methods 等函数里
            // 当函数里面使用dom动态添加外部节点时, 可以避免多次`appendChildren`添加
            // 比如 if(coog.app('.dialog').tracker) return; else dom.appendChildren(node)
            this.tracker = true
        } else {
            var firstCheckedAppMethodOfParamsIsCorrect = appPushNewElements.call(this, params);
            if (!firstCheckedAppMethodOfParamsIsCorrect) {
                this.tracker = false
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

        const dialog            = this.find(currentDialogElement, '[dialog]');
        const mask              = this.find(currentDialogElement, '[mask]');
        const header            = this.find(currentDialogElement, '[header]');
        const body              = this.find(currentDialogElement, '[body]');
        const footer            = this.find(currentDialogElement, '[footer]');
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
                    return getClass(parent, options.slice(1))
                } else if (options.search(/^(\#)/) + 1) {
                    return parent.ownerDocument.getElementById(options.slice(1))
                } else if (options.search(/^(\s*)(\[.*\])(\s*)$/g) + 1) {
                    // arr 表示当前节点下面 存在多个节点
                    return fromAttributesToFindElement(parent.children, options.slice(1, options.length - 1), arr)
                } else return parent.getElementsByTagName(options)
            }
        }
    }
};

staticMethods.assign(codialog.prototype, staticMethods);

export default new(codialog);