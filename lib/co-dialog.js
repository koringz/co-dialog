/*
 * author: koringz
 * descri: create a beautiful dialog
 * version: v2.0.1
 * website: koringz.github.io/codialog/
*/

(function (foctory) {
    !function (factory) {
        if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
            var target = module['exports'] || exports;
            factory(target);
        } else if (typeof define === 'function' && define['amd']) {
            define(['exports'], factory);
        } else {
            factory(window['coog'] = {});
        }
    }(function (exports) {
        'use strict;'
        var $coog = typeof exports !== "undefined" ? exports : {};

        // default static methods 
        function isUndefined (options) {
            return typeof options == 'undefined'
        }

        function isExist (options) {
            return !isUndefined(options)
        }

        function isFun (options) {
            return isExist(options) && typeof options == 'function'
        }

        function isObj (options) {
            return isExist(options) && Object.prototype.toString.call(options) == '[object Object]'
        }

        function isNull (options) {
            return isExist(options) && Object.prototype.toString.call(options) == '[object Null]'
        }

        function isArr (options) {
            return isExist(options) && options instanceof Array
        }

        function isStr (options) {
            return isExist(options) && typeof options == 'string'
        }

        function isBoolean (options) {
            return isExist(options) && typeof options == 'boolean'
        }

        function isTrue (options) {
          return isBoolean(options) && options
        }

        function isFalse (options) {
          return isBoolean(options) && !options
        }

        function isNum (options) {
            return isExist(options) && typeof options == 'number'
        }

        // 验证是否为空对象
        function isEmptyObj (io) {
            for (var dist in io) {
                return !1
            }
            return !0
        }

        function isNan (options) {
            return isExist(options) && isNaN(options)
        }

        // the first params exists
        // and the second params is the callback methods
        // this parameters will injected to fallback methods
        // we can used the params as array objects
        // call paramsAndCallback()
        function paramsAndCallback (params, fallback) {
          if(params) {
            fallback(params)
          }
        }

        var classOrId = {
            _class: function (el, name) {
                if(el.classList) {
                    el.setAttribute('class',name);
                }
                else {
                    el.className = name;
                }
            },
            _id: function (el, name) {
                el.setAttribute('id',name);
            }
        }
        
        function createDivAndSetAttribute (options) {
            var createDiv = document.createElement('div');

            if (options.charAt(0) == '.') {
                classOrId._class(createDiv, options.slice(1))
            }
            if (options.charAt(0) == '#') {
                classOrId._id(createDiv, options.slice(1))
            }

            return createDiv
        }

        function clone (options) {
            if(options instanceof Object) {
                if(isExist(JSON)) return JSON.parse(JSON.stringify(options))
                else return options
            }
        }

        function preventDefault (ev) {
            if(ev.preventDefault) {
                ev.preventDefault();
            }
            else if(ev.stopPropagation) {
                ev.stopPropagation()
            }
            else return false;
        }

        function removeChild (child) {
            if(isExist(child)) return null;

            if (child.parentElement.removeChild) {
                return child.parentElement.removeChild(child)
            }
            return child.parentElement.removeNode(child)
        }

        function search (options,val) {
            if(isStr(options) && options.search(val) + 1) {
                return !0
            }
            return !1
        }

        function forEach (options, fallback, context) {
          if(isExist(options)) {
            if(isFun(options.forEach)) {
              options.forEach(fallback, context || {})
              return;
            }
            for(var i =0; i < options.length; i++) {
              isFun(fallback) ? fallback.call(context || null, options[i], i) : nul
            }
          }
        }

        function trim (options) {
            if (search(options,' ')) {
                return options.replace(/(\s*)/g, '')
            }
            return options
        }

        function assign (orignal, objectGroup) {
            if(isUndefined(objectGroup)) {
                return null;
            }
            if(isObj(objectGroup)) {
                for(var o in objectGroup) {
                    orignal[o] = objectGroup[o];
                }
                return orignal;
            }
        }

        function addEventListener (el, type, fallback) {
            if(el.addEventListener) {
                el.addEventListener(type, fallback, false)
            }
            else if(el.attachEvent) {
                el.attachEvent('on' + type, fallback)
            }
        }

        function removeEventListener (el,type,callback){
            if(el.removeEventListener){
                el.removeEventListener(type,callback,false);
            }
            else{
                el.detachEvent('on' + type, callback);
            }
        };

        
        function isArray (arr) {
            if(Array.isArray) {
                return Array.isArray(arr)
            }
            else if(isArr(arr)) {
                return true
            }
            else return false;
        }

        function objectKey (options) {
            if(!options) return null;
            if(Object.keys) {
                return Object.keys(options);
            }
            var arrKey = []; 
            for(var k in options) {
                if(Object.prototype.hasOwnProperty.call(options, k)){
                    arrKey.push(k)
                }
            }
            return arrKey
        }

        function inArray (val, arr) {
            if(isStr(val) || isNum(arr)) {
                for(var i =0, len = arr.length; i < len; i++) {
                    if(arr[i] == val) {
                        return 1
                    }
                }
                return !1
            }
            return !1
        }

        // the first parameter is target node 
        // the second params is a string
        // after the second pointer all parameter are node elements 
        function classList (nowNodeList, params) {
            var argTransformToArray = [Array.prototype.slice.apply(arguments).slice(2)]

            if(isStr(params)) {
                if(nowNodeList.classList) {
                    nowNodeList.setAttribute('class', eachClassName(argTransformToArray[0], 'classList') + params);
                }
                else if(nowNodeList.className) {
                    nowNodeList.setAttribute('class', eachClassName(argTransformToArray[0], 'className') + params);
                }
                return null;
            }
            else return nowNodeList.className || nowNodeList.classList;
        }

        // compatiblity
        function eachClassName (_splitArrItems, className) {
            var params = '';
            for(var len = _splitArrItems.length, kk = 0; kk < len; kk++) {
                // disabled changed the parameters of type. maybe there are HTML elements
                if(typeof _splitArrItems[kk] == 'object') {
                    params += _splitArrItems[kk][className]
                }
            }
            return params
        }

        // validate style exist
        var validateBrowserCompatiblityAnimationEvent = function (el, eventObjectName) {
            for(var k in eventObjectName) {
                if(isExist(el.style[k])) {
                    return eventObjectName[k]
                }
            }
        }

        // 重置scrollTop属性
        var resetScroll = function (attr, isTruth) {
            var bodyNode = document.body;
            // 设置body时 不能给body css设置 width:100%
            // 防止padding不起作用
            var previousBody = bodyNode.offsetWidth
            if(isTruth) {
                classList(bodyNode, attr, document.body);
                classList(document.documentElement, attr, document.documentElement);
                var currentBody = bodyNode.offsetWidth
                bodyNode.style.paddingRight = currentBody - previousBody + 'px'
            }
            else {
                var ignoreZoreClass = classList(document.body) || classList(document.documentElement);
                if(isExist(ignoreZoreClass)) {
                    classList(document.body, classList(document.body).replace(attr,''), '');
                    classList(document.documentElement, classList(document.documentElement).replace(attr,''), '');
                    bodyNode.style.paddingRight = '0'
                }
                else return null;
            }
        }


        // static parameters
        var $default = {
            title: '', // 内容 ui
            message: '', // 内容 ui
            footerText : '', // 内容 ui
            layout: 'center',
            timeout: null, // setTimeout
            isGesture: true, // 处理 evnet
            isDrag: false, // 处理 evnet
            isClose: true, // 处理 evnet
            onResize: true, // 处理 event
            type: '', // 显示 ui
            isMask: true, // 显示 ui
            animation: true, // 显示 ui
            customAnimation: 'bounceIn', // 显示 ui
            titleColor: '#9A9B9C', // 显示 ui
            closeColor: '#9A9B9C', // 显示 ui
            messageColor: '#696969', // 显示 ui
            showCloseButton: true, // 显示 ui
            showCancleButton: false, // 显示 ui
            showConfirmButton: true, // 显示 ui
            cancleButtonText: '取消', // 内容 ui
            confirmButtonText: '确定', // 内容 ui
            cancleButtonColor: '#fff', // 显示 ui
            confirmButtonColor: '#fff', // 显示 ui
            cancleButtonBackground: '#aaa', // 显示 ui
            confirmButtonBackground: '#45B680', // 显示 ui
            methods: function () {},
            onDialogBefore: function () {},
            onHeaderBefore: function () {},
            onBodyBefore: function () {},
            onFooterBefore: function () {},
            onDialogAfter: function () {},
            onHeaderAfter: function () {},
            onBodyAfter: function () {},
            onFooterAfter: function () {},
            confirmCallback: null,
            cancleCallback: null
        };

        var dialogTemplate = function (_root) {
            var str = '';
            // 属性设置="" 兼容ie10
            str += '<div mask="" class="codialog-mask" aria-hidden="false">';
            str += '<div dialog="" class="codialog-frame" role="dialog" aria-dialog="true">';
            str += '<div aria-dialogBox="true" class="codialog-box">';
            str += '<div class="codialog-fixed">';
            str += '<div class="codialog-styles">';
            str += '<div header="" class="codialog-styles-head dialog-header">';
            str += '<div class="codialog-head-content">';
            str += '<div title="" ref="title" class="codialog-head-title codialog-head-info">';
            str += '<span ></span>';
            str += '</div>';
            str += '<div close="" ref="close" class="codialog-head-close">';
            str += '<button type="button" class="addClose">×</button>';
            str += '</div>';
            str += '</div>';
            str += '</div>';
            str += '<div body="" class="codialog-styles-content dialog-body">';
            str += '<div class="codialog-content-message" dialog-body-overflow>';
            str += '<div class="codialog-icon codialog-icon-success">';
            str += '<div class="codialog-success-ring"></div>';
            str += '<span class="codialog-icon-success--line-small"></span>';
            str += '<span class="codialog-icon-success--line-long"></span>';
            str += '</div>';
            str += '<div class="codialog-icon codialog-icon-error">'
            str += '<span class="codialog-icon-error--line-left"></span>';
            str += '<span class="codialog-icon-error--line-right"></span>';
            str += '</div>';
            str += '<div class="codialog-icon codialog-icon-warning">'
            str += '<span class="codialog-icon-error--text">!</span>';
            str += '</div>';
            str += '<div class="codialog-icon codialog-icon-info">'
            str += '<span class="codialog-icon-info--text">!</span>';
            str += '</div>';
            str += '<div class="codialog-icon codialog-icon-question">'
            str += '<span class="codialog-icon-question--text">?</span>';
            str += '</div>';
            str += '<div message="" ref="message" class="codialog-message-text message-text codialog-text">';
            str += '<span ></span>';
            str += '</div>';
            str += '</div>';
            str += '</div>';
            str += '<div footer="" class="codialog-styles-foot dialog-footer">';
            str += '<div class="codialog-foot-button codialog-foot-text">';
            str += '<div textGroup="" ref="text" class="codialog-text-group"></div>';
            str += '<div buttonGroup="" ref="button" class="codialog-button-group">';
            str += '<button type="button" confirm="" class="primary group-btn">确定</button>';
            str += '<button type="button" cancle="" class="cancle group-btn">取消</button>';
            str += '</div>';
            str += '</div>';
            str += '</div>';
            str += '</div>';
            str += '</div>';
            str += '</div>';
            str += '</div>';
            str += '</div>';
            return str
        }

        var animatiomApi = [
            'bounce','flash','pulse','rubberBand','shake', 'headShake',
            'swing', 'tada', 'wobble', 'jello', 'bounceIn', 'bounceInDown',
            'bounceInLeft', 'bounceInRight', 'bounceInUp', 'bounceOut', 'bounceOutDown', 'bounceOutLeft',
            'bounceOutRight', 'bounceOutUp', 'fadeIn', 'fadeInDown', 'fadeInDownBig', 'fadeInLeft',
            'fadeInLeftBig', 'fadeInRight', 'fadeInRightBig', 'fadeInUp', 'fadeInUpBig', 'fadeOut',
            'fadeOutDown', 'fadeOutDownBig', 'fadeOutLeft', 'fadeOutLeftBig', 'fadeOutRight', 'fadeOutRightBig',
            'fadeOutUp', 'fadeOutUpBig', 'flipInX', 'flipInY', 'flipOutX', 'flipOutY',
            'lightSpeedIn', 'lightSpeedOut', 'rotateIn', 'rotateInDownLeft', 'rotateInDownRight', 'rotateInUpLeft',
            'rotateInUpRight',  'rotateOut', 'rotateOutDownLeft', 'rotateOutDownRight', 'rotateOutUpLeft', 'rotateOutUpRight',
            'hinge', 'jackInTheBox', 'rollIn', 'rollOut', 'zoomIn', 'zoomInDown',
            'zoomInLeft', 'zoomInRight', 'zoomInUp', 'zoomOut', 'zoomOutDown', 'zoomOutLeft',
            'zoomOutRight', 'zoomOutUp', 'slideInDown', 'slideInLeft', 'slideInRight', 'slideInUp',
            'slideOutDown', 'slideOutLeft', 'slideOutRight', 'slideOutUp'
        ];
        var supportBrowserAnimationEventOfName_end = {
            "excuteAnimation"      : "animationend",
            "OAnimation"     : "oAnimationEnd",
            "MozAnimation"   : "animationend",
            "WebkitAnimation": "webkitAnimationEnd",
            'MSAnimation': 'MSAnimationEnd'
        };
        var supportBrowserAnimationEventOfName_start = {
            "excuteAnimation"      : "animationstart",
            "OAnimation"     : "oAnimationStart",
            "MozAnimation"   : "animationstart",
            "WebkitAnimation": "webkitAnimationStart",
            'MSAnimation': 'MSAnimationStart'
        };

        // co-dialog explanation of each methods
        var codialog = function (options) {
            // 使用codialog节点元素列表
            this.didDialogList = [];
            // 目前codialog节点元素
            this.dialogElement = options || null;
            // codialog节点子元素结构
            this.strict = {
                header:'.dialog-header',
                body:'.dialog-body',
                footer:'.dialog-footer'
            };
            // 暂存codialog节点元素
            this.cacheDialogElement = [];
            // 清除定时器
            this.setTimer = null;
            // 使用codialog组件名称
            this.name = 'codialog';
            // 划出节点的定时器
            this.mouseoutcount = 0;
            // 根节点
            this.rootDirectory = {};
            // 关闭事件的返回值
            this.closeBackValue = false;
            // use 基础显示
            this.xString = [];
            // hasAnimation 验证动画
            this.hasAnimation = true;
            // 自定义动画
            this.customAnimation = 'bounceOut'
        }

        codialog.prototype.app = function (params) {
            var self = this;
            if(inArray(params,this.cacheDialogElement))  {
                this.dialogElement = params;
            }
            else {
                var firstCheckedAppMethodOfParamsIsCorrect = this.appPushNewElements(params);
                if(!firstCheckedAppMethodOfParamsIsCorrect) {
                    return window.console.warn('this methods .app("'+params+'") accepts wrong parameters.', 'you must define correct "class" and "id" and "_"') && false
                }
            }
            return this
        }

        codialog.prototype.appPushNewElements = function (attr) {
            if (isStr(attr), attr.search(/^(\.|\#)/)+1,attr.slice(1).search(/^[\_|(a-zA-Z)]/)+1) {
                var getElement = createDivAndSetAttribute(attr);
                getElement.innerHTML += dialogTemplate();
                document.body.appendChild(getElement);

                this.dialogElement = attr || null;
                this.cacheDialogElement.push(attr);
                return true
            }
            else return false 
        }

        codialog.prototype.hide = function (options) {
            var self = this;
            var _currentElements = this.$(this.dialogElement);

            if(isStr(options)) {
                if (inArray(options, this.cacheDialogElement)) {
                    excuteHideAnimation.call(this,options + ' [mask]', this.$(options))
                }
            }
            else if (isObj(options)) {
                var _timeout = Number(options.timeout);
                if('timeout' in options && isNum(_timeout) && _timeout > 0) {
                    this.setTimer = setTimeout(function() {
                        _currentElements.style.display = 'none';
                        resetScroll(' codialog-show',false);
                        clearTimeout(self.setTimer);
                    }, _timeout);
                }
                if('callback' in options && isFun(options.callback)){
                    options.callback(_currentElements);
                }
            }
            else if (isUndefined(options)) {
                _currentElements.style.display = 'none';
                resetScroll(' codialog-show',false);
            }

            return this;
        }

        /** **
        ## 显示元素
        > 原理同上
        ** **/
        codialog.prototype.show = function (options) {
            var self = this;
            var _currentElements = this.$(this.dialogElement);

            if(isStr(options)) {
                if (inArray(options,this.cacheDialogElement)) {
                    excuteShowAnimation(this, options + ' [dialog]', _currentElements);
                }
            }
            else if (isObj(options)) {
                var _timeout = Number(options.timeout);
                if('timeout' in options && isNum(_timeout) && _timeout > 0) {
                    this.setTimer = setTimeout(function() {
                        _currentElements.style.display = 'block';
                        resetScroll(' codialog-show', true);
                        options.timeout = null;
                        clearTimeout(self.setTimer);
                    }, _timeout);
                }
                if('callback' in options && isFun(options.callback)){
                    options.callback(_currentElements);
                }
            }
            else if (isUndefined(options)) {
                excuteShowAnimation.call(this, self.dialogElement + ' [dialog]', _currentElements);
            }

            return this;
        }

        var excuteHideAnimation = function (options, currentDialogNode) {
            var self = this;

            // ie8 是否支持 animation.
            if(document.querySelector && document.addEventListener) {
                // 兼容ie9
                if(validateBrowserCompatiblityAnimationEvent(currentDialogNode, supportBrowserAnimationEventOfName_end) == undefined) {
                    currentDialogNode.style.display = 'none';
                    resetScroll(' codialog-show', false);
                    return null;
                }
                // animation动画加载
                this.animate(options).delay(100).fadeOut('fadeOut',{
                    type: 'end',
                    callback: function () {
                        currentDialogNode.style.display = 'none';
                        resetScroll(' codialog-show', false);
                    }
                }).render();
            }
            else {
                currentDialogNode.style.display = 'none';
                resetScroll(' codialog-show', false);
            }
        }

        var excuteShowAnimation = function (options, currentDialogNode) {
            var self = this;
            var resetDefaultAnimation = 'bounceIn';

            // ie8 是否支持 animation.
            if(document.querySelector && document.addEventListener) {
                // 兼容ie9
                if(validateBrowserCompatiblityAnimationEvent(currentDialogNode, supportBrowserAnimationEventOfName_end) == undefined) {
                    currentDialogNode.style.display = 'block';
                    resetScroll(' codialog-show', true);
                    return null;
                }
                if(isFalse(self.hasAnimation)) resetDefaultAnimation = this.customAnimation || resetDefaultAnimation;
                // animation动画加载
                self.animate(options).delay(100)[resetDefaultAnimation](resetDefaultAnimation,{
                    type: 'start',
                    callback: function () {
                        currentDialogNode.style.display = 'block';
                        resetScroll(' codialog-show', true);
                    }
                })
                .render();
            }
            else {
                currentDialogNode.style.display = 'block';
                resetScroll(' codialog-show', true);
            }
        }

        codialog.prototype.$ = function (options) {
            if(options.nodeType === 9) return options.documentElement;
            else if(isFun(options.HTMLDocument)) return options;
            return this.find(document.body, options)
        }

        codialog.prototype.getElementsByClassName = function (parent, childClass) {
            if(isFun(parent.getElementsByClassName)) {
                var divTagName = parent.getElementsByTagName('*');
                var divTagNameLength = divTagName.length;
                var saveSensitiveElement = [];
                for(var i =0; i < divTagNameLength; i++) {
                    if(isStr(divTagName[i].className)) {
                        var getClassNameGroup = divTagName[i].className.split(' ');
                        if(inArray(childClass, getClassNameGroup)){
                            saveSensitiveElement.push(divTagName[i]);
                            break;
                        }
                    }
                }
                return saveSensitiveElement[0]
            }
        }

        codialog.prototype.find = function (parent, options, arr) {
            var self = this;
            if(typeof parent == 'object') {
                if(isStr(options)) {
                    if(options.search(/^(\.)/)+1) {
                        return self.getElementsByClassName(parent.nodeType == 9 ? document : parent, options.slice(1))
                    }
                    else if(options.search(/^(\#)/)+1){
                        return parent.getElementById(options.slice(1))
                    }
                    else if(options.search(/^(\s*)(\[.*\])/g)+1){
                        var saveChildList = [];

                        // arr 表示当前节点下面 存在多个节点
                        function fromAttributesToFindElement (parentElement, attr, arr) { 
                            if(parentElement.length) {
                                for(var i = 0, parentLength = parentElement.length; i < parentLength; i++) {

                                    // 检查属性 [mask] 为字符串 获得当前节点
                                    if(isStr(parentElement[i].getAttribute(attr))) {
                                        saveChildList.push(parentElement[i]);
                                        // 数组 继续执行for循环
                                        if(isArray(arr)) continue;
                                        else break; // break;退出兼容ie9and10 
                                    }
                                    else {
                                        if(parentElement.length == 1) {
                                            // 长度为1 往下找
                                            return fromAttributesToFindElement(parentElement[i].children,attr,arr)
                                        }
                                        if(parentLength > 1 && i < parentLength){
                                            // 存在多个节点
                                            continue;
                                        }
                                        else {
                                            return;
                                        }
                                    }
                                }
                                if(isArray(arr)) return saveChildList;
                                return saveChildList[0]
                            }
                        }
                        return fromAttributesToFindElement(parent.children, options.slice(1, options.length-1),arr)

                    }
                    else return parent.getElementsByTagName(options)
                } 
            }
        }

        codialog.prototype.use = function (obj, success_config) {
            var self = this;
            var currentDialogElement = this.$(this.dialogElement);

            var dialog  =  this.find(currentDialogElement, '[dialog]');
            var mask    =  this.find(currentDialogElement, '[mask]');
            var header  =  this.find(currentDialogElement, '[header]');
            var body    =  this.find(currentDialogElement, '[body]');
            var footer  =  this.find(currentDialogElement, '[footer]');

            assign(this.rootDirectory, {
                dialog  : dialog,
                mask    : mask,
                header  : header,
                body    : body,
                footer  : footer
            });

            // 情况1：传入''字符串
            if (arguments.length && isStr(obj) && (this.xString , this.xString = arguments)) {
                switch (this.xString.length) {
                    case 1:
                        obj = {
                            message: this.xString[0],
                            onHeaderBefore: function () {
                                this.style.display = 'none'
                            }
                        };
                        break;
                    case 2:
                        var getSecondPart = this.xString[1];
                        obj = {
                            title: this.xString[0],
                            message: isStr(getSecondPart)? getSecondPart : 'No message text'
                        };
                        break;
                    case 3:
                        var getSecondPart = this.xString[1];
                        var getType = this.xString[2];
                        obj = {
                            title: this.xString[0],
                            message: isStr(getSecondPart)? getSecondPart : 'No message',
                            type: isStr(getType)? getType : ''
                        };
                        break;
                    default:
                        var getSecondPart = this.xString[1];
                        var getType = this.xString[2];
                        obj = {
                            title: this.xString[0],
                            message: isStr(getSecondPart)? getSecondPart : 'No message',
                            type: isStr(getType)? getType : ''
                        };
                        break;
                }
                this.xString = [];
            }

            // 情况2：传入{}对象
            var footerButtonGroup =  this.find(footer,'[buttonGroup]');
            // 多次调用 禁修改默认属性
            var disabledChangedDefault = clone($default);

            obj = assign(disabledChangedDefault, obj);
            if (isObj(obj)) {
                // 在执行前处理节点属性设置
                if (obj.onDialogBefore
                    || obj.onHeaderBefore
                    || obj.onBodyBefore
                    || obj.onFooterBefore) {

                    if(isFun(obj.onDialogBefore)) {
                        obj.onDialogBefore.call(dialog, dialog);
                    }
                    if(isFun(obj.onHeaderBefore)) {
                        obj.onHeaderBefore.call(header, header);
                    }
                    if(isFun(obj.onBodyBefore)) {
                        obj.onBodyBefore.call(body, body);
                    }
                    if(isFun(obj.onFooterBefore)) {
                        obj.onFooterBefore.call(footer, footer);
                    }
                }

                // 超时自动关闭
                if (isNum(obj.timeout) && Number(obj.timeout) > 0){
                    this.hide({
                        timeout: obj.timeout
                    })
                }

                /** **
                ** 是否显示遮罩层 **
                - 添加了动画效果
                - dialog层嵌套在mask遮罩层里面
                - 不能给dialog设置position属性
                - 只能给dialog设置backgound背景透明
                ** **/
                if (isFalse(obj.isMask) && this.find(currentDialogElement,'[mask]')) {
                    this.find(currentDialogElement,'[mask]').style.backgroundColor = 'transparent';
                }

                // 开启抓手特效
                // 只有点击之后才有手势效果
                if (isTrue(obj.isDrag)) {
                    var ready = true;
                    var dragCurrentDialog = {};
                    var mouseCurrentPosition = {};
                    var mouseMovePosition = {};

                    if(isTrue(obj.isGesture)) {
                        dialog.style.cursor = 'move';
                    }
                    else {
                        dialog.style.cursor = 'unset';
                    }
                    addEventListener(dialog, 'mousedown', function (ev) {
                        // 第一次重置居左 
                        // dialog的left和top属性都统一到矢量位移上
                        dragCurrentDialog = {
                            x: dialog.offsetLeft - document.body.scrollLeft,
                            y: dialog.offsetTop -  document.body.scrollTop
                        };

                        mouseCurrentPosition = {
                            x: ev.screenX,
                            y: ev.screenY
                        };

                        ready = true;
                        var mousemove = function (evt) {
                            if(ready) {
                                // 鼠标的窗口位移坐标
                                mouseMovePosition = {
                                    x: evt.screenX,
                                    y: evt.screenY
                                };

                                dragCurrentDialog.x += (mouseMovePosition.x - mouseCurrentPosition.x);
                                dragCurrentDialog.y += (mouseMovePosition.y - mouseCurrentPosition.y);
                                mouseCurrentPosition = mouseMovePosition;

                                // 鼠标的位移变化
                                dialog.style.left = dragCurrentDialog.x + 'px';
                                dialog.style.top = dragCurrentDialog.y + 'px';
                            }
                        };

                        addEventListener(self.$(document), 'mousemove', mousemove);
                        addEventListener(self.$(document), 'mouseup', function (ev) {
                            removeEventListener( dialog.ownerDocument,'mouseover', mousemove);
                            ready = false;
                            preventDefault(ev);
                        });

                        preventDefault(ev);
                    });
                }

                // 底部有无按钮
                // 底部显示的是倒计时或者是其他信息
                // attr = [textGroup] or string
                if (isStr(obj.footerText) && this.find(footer,'[textGroup]')) {
                    this.find(footer,'[textGroup]').innerHTML = obj.footerText;
                }
                else if (isArray(obj.footerText) && this.find(footer,'[textGroup]')) {
                    if (obj.footerText.length > 0) {
                        this.find(footer,'[textGroup]').innerHTML = obj.footerText.concat().join('');
                    }
                }
                else {
                    if(this.find(footer,'[textGroup]')) {
                        removeChild(this.find(footer,'[textGroup]'));
                    }
                }

                // 重置属性绑定
                // 改变默认的文本和节点数据
                var content;
                if ((content = this.find(header,'[title]')) && content) {
                    content.innerHTML = obj.title;
                    content.style.color = obj.titleColor
                }
                if ((content = this.find(body,'[message]')) && content) {
                    content.innerHTML = this.message || obj.message;
                    content.style.color = obj.messageColor
                }
                if((content = this.find(footerButtonGroup, '[confirm]')) && content) {
                    content.textContent = obj.confirmButtonText
                    content.style.color = obj.confirmButtonColor
                    content.style.background = obj.confirmButtonBackground
                }
                if((content = this.find(footerButtonGroup, '[cancle]')) && content) {
                    content.textContent = obj.cancleButtonText
                    content.style.color = obj.cancleButtonColor
                    content.style.background = obj.cancleButtonBackground
                }
                if ((content = this.find(header, '[close]')) && content) {
                    content.style.color = obj.closeColor
                }


                // 根据 type 不同显示弹出框
                // type:`success`, `error`, `warning`, `info`, `question`
                if(isStr(obj.type)) {
                    var typeGroup = ['success', 'error', 'warning', 'info', 'question'];
                    var types = obj.type.toLowerCase();
                    switch(types) {
                        case typeGroup[0]:
                            self.find(body, '.codialog-icon-'+ typeGroup[0]).style.display = 'flex'
                            break;
                        case typeGroup[1]:
                            self.find(body, '.codialog-icon-'+ typeGroup[1]).style.display = 'flex'
                            break;
                        case typeGroup[2]:
                            self.find(body, '.codialog-icon-'+ typeGroup[2]).style.display = 'flex'
                            break;
                        case typeGroup[3]:
                            self.find(body, '.codialog-icon-'+ typeGroup[3]).style.display = 'flex'
                            break;
                        case typeGroup[4]:
                            self.find(body, '.codialog-icon-'+ typeGroup[4]).style.display = 'flex'
                            break;
                        default: 
                            break;
                    }
                }

                // 所有子节点都会被获取 进行修改
                // 但是都在before执行之后才执行methods
                /*
                    $(this.dialogElement).find('[ref]').each(function (index,item) {
                        item.removeAttribute('ref');
                    });
                */
                if (isFun(obj['methods'])) {
                    this.$methods();
                    obj.methods.call(this,this.dialogElement);
                }

                // 是否禁用 colse(关闭) dialog
                // 默认开启 colse x
                // default: true
                if (isTrue(obj.isClose)) {
                    // 防止通过 this.dialogElement 元素查找失效
                    var _currentDialogElement = this.$(this.dialogElement);

                    var cacheCloseList = [];
                    var headerClose = this.find(header,'[close]');
                    if(isExist(headerClose)) {
                        cacheCloseList.push(headerClose);
                    }

                    var footerCancle = this.find(footerButtonGroup,'[cancle]');
                    if(isExist(footerButtonGroup), isExist(footerCancle)) {
                        cacheCloseList.push(footerCancle);
                    }

                    var footerConfirm = this.find(footerButtonGroup,'[confirm]');
                    if(isExist(footerButtonGroup), isExist(footerConfirm)) {
                        cacheCloseList.push(footerConfirm);
                    }

                    if(cacheCloseList.length > 0) {
                        forEach(cacheCloseList, function (close, index) {
                            close.onclick = function (e) {
                                self.hide((_currentDialogElement.className.length ? '.' + _currentDialogElement.className : '#' + _currentDialogElement.getAttribute('id')))
                                clearTimeout(self.setTimer);

                                // 确认按钮的回调函数
                                if(index == 2 && isFun(obj.confirmCallback)) {
                                    obj.confirmCallback()
                                }
                                // 取消按钮的回调函数
                                else if(index == 1 && isFun(obj.cancleCallback)) {
                                    obj.cancleCallback()
                                }
                                self.closeBackValue = true;
                            }
                        })
                    }
                }

                // 是否显示关闭按钮 默认显示 true
                // 防止自定义获取不到节点
                // 显示取消按钮 默认隐藏 false
                // 防止自定义获取不到节点
                // 显示确定按钮 默认显示
                // 防止自定义获取不到节点
                var getClose, getCancle, getConfirm;
                if (isFalse(obj.showCloseButton) &&  (getClose = this.find(header,'[close]'), getClose) && isExist(getClose)) {
                    getClose.style.display = 'none';
                }
                if (isTrue(obj.showCancleButton) && (getCancle = this.find(footerButtonGroup,'[cancle]'), getCancle) && isExist(getCancle)) {
                    getCancle.style.display = 'inline-block';
                }
                if(isFalse(obj.showConfirmButton) && (getConfirm = this.find(footerButtonGroup,'[confirm]'), getConfirm) && isExist(getConfirm)) {
                    getConfirm.style.display = 'none';
                }

                // 所有节点和函数都执行之后处理
                if (obj.onDialogAfter || obj.onHeaderAfter || obj.onBodyAfter || obj.onFooterAfter) {
                    if(isFun(obj.onDialogAfter)) obj.onDialogAfter.call(dialog, dialog);
                    if(isFun(obj.onHeaderAfter)) obj.onHeaderAfter.call(header, header);
                    if(isFun(obj.onBodyAfter))   obj.onBodyAfter.call(body,body);
                    if(isFun(obj.onFooterAfter)) obj.onFooterAfter.call(footer,footer);
                }



                // layout 弹出框初始位置 上|下|左|右|居中|左上|左下|右上|右下
                if (isStr(obj.layout) && obj.layout.length) {
                    resize()
                }

                if(isTrue(obj.onResize)) {
                    window.onresize = function () {
                        resize()
                    }
                }

                function resize () {
                    var windowWidth  = (document.documentElement || document.body).clientWidth;
                    var windowHeidth = (document.documentElement || document.body).clientHeight;

                    // offsetWidth 处理隐藏不能获取 offsetWidth style
                    var isOpenDialog = false;
                    if(currentDialogElement.style.display != 'block') {
                        currentDialogElement.style.zIndex = '-9999';
                        currentDialogElement.style.display = 'block';
                        isOpenDialog = true;
                    }
                    
                    var targetWidth = dialog.offsetWidth;
                    var targetHeight = dialog.offsetHeight;

                    if(isOpenDialog) {
                        currentDialogElement.style.display = 'none';
                        isOpenDialog = false;
                    }
                    currentDialogElement.style.zIndex = '9999';

                    var getBraowserAxis = {
                        x: windowWidth / 2,
                        y: windowHeidth / 2
                    };
                    var getTargetAxis = {
                        x: targetWidth / 2,
                        y: targetHeight / 2
                    };

                    var currentPostion = obj.layout.toLowerCase().split(' ');
                    var filterCurrentPostion = [];
                    // 过滤空字符串
                    for(var i = 0; i < currentPostion.length; i++){
                        if(currentPostion[i].length) filterCurrentPostion.push(currentPostion[i]);
                    }
                    currentPostion = filterCurrentPostion;

                    // 默认重心位置
                    function layoutDefaultCenter () {
                        dialog.style.left = getBraowserAxis.x - getTargetAxis.x + 'px';
                        dialog.style.top  = getBraowserAxis.y - getTargetAxis.y + 'px';
                    }

                    // 只有一个位置
                    if(currentPostion.length == 1) {
                        currentPostion = trim(currentPostion[0]);
                        switch (currentPostion) {
                            case 'center' :
                                layoutDefaultCenter();
                                break;
                            case 'left' :
                                dialog.style.left = 10 + 'px';
                                dialog.style.top  = getBraowserAxis.y - getTargetAxis.y + 'px';
                                break;
                            case 'right' :
                                dialog.style.left = windowWidth - targetWidth - 10 + 'px';
                                dialog.style.top  = getBraowserAxis.y - getTargetAxis.y + 'px';
                                break;
                            case 'top' :
                                dialog.style.left = getBraowserAxis.x - getTargetAxis.x + 'px';
                                dialog.style.top  = 10 + 'px';
                                break;
                            case 'bottom' :
                                dialog.style.left = getBraowserAxis.x - getTargetAxis.x + 'px';
                                dialog.style.top  = windowHeidth - targetHeight - 10 + 'px';
                                break;
                            default: 
                                layoutDefaultCenter();
                                break;
                        }
                    }
                    else if(currentPostion.length > 1) {
                    // 有二个位置
                        currentPostion = currentPostion.join(' ');
                        if(currentPostion == 'left top' || currentPostion == 'top left') {
                            dialog.style.left = 10 + 'px';
                            dialog.style.top  = 10 + 'px';
                        }
                        else if(currentPostion == 'left bottom' || currentPostion == 'bottom left') {
                            dialog.style.left  = 10 + 'px';
                            dialog.style.top   = windowHeidth - targetHeight - 10 + 'px';
                        }
                        else if(currentPostion == 'right top' || currentPostion == 'top right') {
                            dialog.style.left = windowWidth - targetWidth + 10 + 'px';
                            dialog.style.top  = 10 + 'px';
                        }
                        else if(currentPostion == 'right bottom' || currentPostion == 'bottom right') {
                            dialog.style.left = windowWidth - targetWidth + 'px';
                            dialog.style.top  = windowHeidth - targetHeight - 10 + 'px';
                        }
                        else {
                            layoutDefaultCenter();
                        }
                    }
                }
            }

            // 默认点击mask隐藏弹出框 all actions 
            // 点击dialog不会隐藏弹出框 all actions
            var ignoreBorderSideClick = false;

            mask.onclick = function (ea) {
                if(ignoreBorderSideClick) {
                    ignoreBorderSideClick = false;
                    return;
                }

                ea = ea || window.event;
                if((ea.target || ea.srcElement) == mask) {
                    // 点击外边框 清除timeout未到时间关闭的定时器
                    clearTimeout(self.setTimer);
                    self.$(self.dialogElement).style.display = 'none';

                    // 重置scrollTop属性
                    classList(document.body, classList(document.body).replace(' codialog-show',''), '');
                    classList(document.documentElement, classList(document.documentElement).replace(' codialog-show',''), '');
                    document.body.style.paddingRight = '0'
                }
            }

            mask.onmousedown = function () {
                dialog.onmouseup = function (ea) {
                    dialog.onmouseup = null;

                    ea = ea || window.event;
                    if((ea.target || ea.srcElement) == dialog || dialog.contains(ea.target||ea.srcElement)) {
                        ignoreBorderSideClick = true;
                    }
                }
            }

            dialog.onmousedown = function () {
                mask.onmouseup = function (ea) {
                    mask.onmouseup = null;

                    ea = ea || window.event;
                    if((ea.target || ea.srcElement) == mask) {
                        ignoreBorderSideClick = true;
                    }
                }
            }

            if (isBoolean(obj.animation) && currentDialogElement) {
                if(!obj.animation) {
                    if(isStr(obj.customAnimation)) {
                        this.hasAnimation = false;
                        this.customAnimation = obj.customAnimation;
                    }
                }
                else this.hasAnimation = true;
            }
                
            return this
        }


        codialog.prototype.$methods = function (callback) {
            this.header = this.onHeader({children: this.rootDirectory.header });
            this.body = this.onBody({children: this.rootDirectory.body });
            this.footer = this.onFooter({children: this.rootDirectory.footer });
            if (isFun(callback)) callback.call(this, this.dialogElement);
            return this;
        }

        /*
        需要在dialog body里面加载其他元素, 比如图片的失效 和 其他图片icon信息
        或者添加一条新的节点信息
        */
        function defineRefs (child) {
            var obj = new Object;
            var refList = this.find(child.children,'[ref]', []);
            forEach(refList, function (item) {
                obj[item.getAttribute('ref')] = item;
            });
            return obj;
        }

        ['onHeader','onBody','onFooter'].map( function (items) {
            codialog.prototype[items] = function (child) {
                return {
                    $refs: defineRefs.call(this, child)
                }
            }
        });

        // animation
        // base on co-ani plugins api
        codialog.prototype.animate = function (options) {
            return new coani(options)
        }

        var coani = function (options) {
            this.listItems = [options]
            this.wait = []
            this.animationName = 'bounceOut'
            this.animationConfig = {}
        };

        coani.prototype.excuteAnimation = function (nodelist,animationClass, showAndHideApi) {
            var getNodeList = document.querySelector(nodelist);
            var supportsAntEvent_end = validateBrowserCompatiblityAnimationEvent(getNodeList, supportBrowserAnimationEventOfName_end);
            var supportsAntEvent_start = validateBrowserCompatiblityAnimationEvent(getNodeList, supportBrowserAnimationEventOfName_start);

            if(showAndHideApi.type.toLowerCase() == 'end') classList(getNodeList,' ' + animationClass + ' animatedHalf', getNodeList);
            else classList(getNodeList,' ' + animationClass + ' animated', getNodeList);
            
            var callAnimationEventStart = function () {
                var typeStartWith = showAndHideApi.type;
                // 2种情况 
                // 显示弹出框时 有一次动画开始 到结束过程
                // 隐藏弹出框时 也有一次动画开始 到结束过程
                // 不同之处就是隐藏时  本身就显示的弹出框 可见动画被监听 
                // 而之前隐藏的弹出框  不可见 就不会立马被监听
                removeEventListener(getNodeList, supportsAntEvent_start, callAnimationEventEnd);
            };

            var callAnimationEventEnd = function () {
                var typeStartWith = showAndHideApi.type;
                // 显示和隐藏的弹出框 都会监听一次结束
                if(typeStartWith.toLowerCase() == 'end') {
                    showAndHideApi.callback(animationClass)
                    classList(getNodeList, classList(getNodeList).replace(' ' + animationClass + ' animatedHalf',''), '');
                }
                else {
                    classList(getNodeList, classList(getNodeList).replace(' ' + animationClass + ' animated',''), '')
                }

                removeEventListener(getNodeList, supportsAntEvent_end, callAnimationEventEnd);
                removeEventListener(getNodeList, supportsAntEvent_start, callAnimationEventStart);
            };

            addEventListener(getNodeList, supportsAntEvent_end, callAnimationEventEnd);
            addEventListener(getNodeList, supportsAntEvent_start, callAnimationEventStart);
        }

        var callAnimationApi = function (_animationName,_animationConfig) {
            this.animationName = _animationName;
            this.animationConfig = _animationConfig;
            // 开始执行初始回调  第一次执行动画 需要display : block
            var callback = _animationConfig.callback;
            if(_animationConfig.type == 'start' && typeof isFun(callback)) callback();
            return this;
        }
            
        for(var k = 0, calen = animatiomApi.length; k < calen; k++) {
            coani.prototype[animatiomApi[k]] = callAnimationApi
        }

        // 延迟处理当前节点整体的动画时间
        coani.prototype.delay = function (options) {
            if(isExist(options)) this.wait.push(Number(options));
            return this;
        }

        // 渲染当前脚本的动画效果
        coani.prototype.render = function () {
            this.excuteAnimation(this.listItems.slice(0),this.animationName,this.animationConfig);
        }

        var $codialog = new(codialog);
        assign($coog, $codialog);
        assign($coog, { addEventListener: addEventListener });
    }),
    typeof document != 'undefined' && window.coog && (window.coDialog = window.codialog = window.Codialog = window.CoDialog = window.Coog = window.coog)
})(typeof (window) != 'undefined' ? this : global, '');