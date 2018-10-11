/*
 * author: koringz
 * descri: create a beautiful dialog
 * version: v2.0.0
 * website: koringz.github.io/codialog
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

        // 每一个功能的使用说明
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


        /** **
        ** 使用codialog.app绑定根节点 **
        > 通过传入的字符串设置dialog节点的class和id以及attr属性
        ==============================================
        // class和id
        if (options.match(/^(\.|\#)/)) {
            if (options.charAt(0) == '.') {
                nodes = 'class="' + options.slice(1) + '"';
            }
            if (options.charAt(0) == '#') {
                nodes = 'id="' + options.slice(1) + '"';
            }
        } else {
            nodes = options;
        }
        ==============================================
        ====================================================
        // attr属性
        $('body').find(this.dialogElement).attr(nodes,'');
        ====================================================
        ** **/
        codialog.prototype.app = function (params) {
            var self = this;
            var nodes = null;

            function changedAppElementAttribute (options) {
                var nodes = null;
                if (typeof options == 'string') {
                    if (options.match(/^(\.|\#)/)) {
                        if (options.charAt(0) == '.') {
                            nodes = 'class=' + options.slice(1) + '';
                        }
                        if (options.charAt(0) == '#') {
                            nodes = 'id=' + options.slice(1) + '';
                        }
                    }
                    else {
                        nodes = options;
                    }

                    var createDiv = document.createElement('div');
                    if(self.search(nodes,'=')) {
                        var nodesElementSplit = nodes.split('=');
                        // 兼容ie10
                        if(createDiv.classList) createDiv.setAttribute(nodesElementSplit[0],nodesElementSplit[1]);
                        else createDiv.className = nodesElementSplit[1];
                    }
                    else {
                        createDiv.setAttribute(nodes,'');
                    }

                    createDiv.innerHTML +=appDialog.dialogTemplate(nodes);
                    document.body.appendChild(createDiv);
                }
                else {
                    return null;
                }
            }


            if (this.inArray(params,this.cacheDialogElement)) {
                this.dialogElement = params;
            }
            else {
                if (typeof params == 'undefined') {
                    nodes = typeof params;
                }
                else if (typeof params == 'string') {
                    nodes = params;
                    if (params.search(/^(\.|\#)/)+1) {
                        changedAppElementAttribute(nodes);
                    }
                    else {
                        this.find(document.body, this.dialogElement).setAttribute(nodes,'')
                    }
                    appDialog.call(this, nodes);

                    this.cacheDialogElement.push(params);
                    return this;
                }
            }


            return this
        }


        var $default = {
            title: '',
            message: '',
            layout: 'center',
            type: 'alert',
            isGesture: true, // 处理 evnet
            isDrag: false, // 处理 evnet
            isClose: true, // 处理 evnet
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
            footerText : '', // 内容 ui
            timeout: null, // setTimeout
            animation: true, // 显示 ui
            customAnimation: 'bounceIn', // 显示 ui
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

        codialog.prototype.clone = function (options) {
            if(options instanceof Object) {
                if(typeof JSON != 'undefined') return JSON.parse(JSON.stringify(options))
                else return options
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

        /** **
        ## 隐藏元素
        > 在一组弹出框节点的数组里面寻找一个元素
        ===============================================
        if(typeof options == 'string') {
            if (this.cacheDialogElement.indexOf(options)+1) {
                $(options).hide();
            }
        }
        ===============================================

        > 如果没有传入字符串 就会直接执行这个元素(this.dialogElement)
        ===============================================
        if (this.cacheDialogElement.indexOf(params)+1) {
            this.dialogElement = params;
        }
        ===============================================

        ** 隐藏元素 只会对用户使用过co-dialog弹出框的节点和元素进行隐藏 **
        -- 区别于用户自定义的弹出框的元素
        -- 比如你使用.app('.message')方法生成的弹出框
        -- 现在你想使用co-dialog隐藏元素
        ===============================================
        你必须这样操作
        codialog.app('.message').hide();
        以下是错误操作 不会隐藏
        codialog.app('.information').hide();
        ===============================================

        **超时毫秒隐藏**
        ===============================================
        你需要设置超时数才能隐藏
        当你设置超时3s之后就会隐藏
        codialog.show('.slelect').hide({timeout: 3000})
        ===============================================
        ** **/
        codialog.prototype.hide = function (options) {
            var self = this;

            function excuteHideAnimation (options, currentDialogNode) {
                // ie8 是否支持.
                if(document.querySelector && document.addEventListener) {
                    // 兼容ie9
                    if(co.validateAnimationEvent(currentDialogNode, co.supportBrowserAnimationEventOfName_end) == undefined) {
                        currentDialogNode.style.display = 'none';
                        self.resetScroll(false)
                        return null;
                    }
                    
                    // animation动画加载
                    self
                    .animate(options)
                    .delay(100)
                    .fadeOut({
                        type: 'end',
                        callback: function () {
                            currentDialogNode.style.display = 'none';
                            self.resetScroll(false)
                        }
                    })
                    .stop()
                    .render();
                }
                else {
                    currentDialogNode.style.display = 'none';
                    self.resetScroll(false)
                }
            }

            if(typeof options == 'string') {
                if (this.inArray(options,this.cacheDialogElement)) {
                    excuteHideAnimation(options + ' [mask]', self.$(options))
                }
            }
            else if (typeof options != 'undefined' && Object.prototype.toString.call(options) == '[object Object]') {
                var keys = this.keys(options);

                if('timeout' in options && Number(options[keys[0]])) {
                    if(this.setTimer) clearTimeout(this.setTimer);
                    self.setTimer = setTimeout(function() {

                       self.$(self.dialogElement).style.display = 'none';
                       self.resetScroll(false)
                    }, options[keys[0]]);
                }

                if('callback' in options && typeof keys[1] == 'function'){
                    options[keys[1]](this.$(this.dialogElement));
                }
            }
            else {
                self.$(self.dialogElement).style.display = 'none';
                self.resetScroll(false)
            }


            return this;
        }


        /** **
        ## 显示元素
        > 原理同上
        ** **/
        codialog.prototype.show = function (options) {
            var self = this;
            var resetDefaultAnimation = 'bounceIn';

            function excuteShowAnimation (options, currentDialogNode) {
                // ie8 是否支持.
                if(document.querySelector && document.addEventListener) {
                    // 兼容ie9
                    if(co.validateAnimationEvent(currentDialogNode, co.supportBrowserAnimationEventOfName_end) == undefined) {
                        currentDialogNode.style.display = 'block';
                        self.resetScroll(true)
                        return null;
                    }
                    if(!self.hasAnimation) resetDefaultAnimation = self.customAnimation || resetDefaultAnimation;
                    // animation动画加载
                    self.animate(options).delay(100)[resetDefaultAnimation]({
                        type: 'start',
                        callback: function () {
                            currentDialogNode.style.display = 'block';
                            self.resetScroll(true)
                        }
                    })
                    .stop()
                    .render();
                }
                else {
                    currentDialogNode.style.display = 'block';
                    self.resetScroll(true)
                }
            }

            if(typeof options == 'string') {
                if (this.inArray(options,this.cacheDialogElement)) {
                    excuteShowAnimation(options + ' [dialog]', self.$(self.dialogElement))
                }
            }
            else if (typeof options != 'undefined' && Object.prototype.toString.call(options) == '[object Object]') {
                var getKeys = this.keys(options);
                if(getKeys[0].toLowerCase() == 'timeout' && isNaN(options[getKeys[0]])) {
                    this.setTimer = setTimeout(function() {
                        self.$(self.dialogElement).style.display = 'block';
                        self.resetScroll(true)
                        options[getKeys[1]] = null;
                    }, options[getKeys[0]]);
                }
                if(getKeys[1]){
                    if(getKeys[1].toLowerCase() == 'callback') options[getKeys[1]](this.$(this.dialogElement));
                }
            }
            else {
                excuteShowAnimation(self.dialogElement + ' [dialog]', self.$(self.dialogElement))
            }


            return this;
        }

        // 重置scrollTop属性
        codialog.prototype.resetScroll = function (isTruth) {
            if(isTruth) {
                this.classList(document.body, ' codialog-show', document.body);
                this.classList(document.documentElement, ' codialog-show', document.documentElement);
            }
            else {
                var ignoreZoreClass = this.classList(document.body) || this.classList(document.documentElement);
                if(typeof ignoreZoreClass != 'undefined') {
                    this.classList(document.body, this.classList(document.body).replace(' codialog-show',''), '');
                    this.classList(document.documentElement, this.classList(document.documentElement).replace(' codialog-show',''), '');
                }
                else return null;
            }
        }

        codialog.prototype.keys = function (options) {
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

        codialog.prototype.inArray = function (val, arr) {
            if(typeof val == 'string' || typeof val == 'number') {
                for(var i =0, len = arr.length; i < len; i++) {
                    if(arr[i] == val) {
                        return 1
                    }
                }
                return !1
            }
            return !1
        }

        codialog.prototype.$ = function (options) {
            if(options.nodeType === 9) return options.documentElement;
            else if(typeof options.HTMLDocument == 'function') return options;
            return this.find(document, options)
        }

        codialog.prototype.getElementsByClassName = function (parent, childClass) {
            if(typeof parent.getElementsByClassName !== 'function') {
                var divTagName = parent.getElementsByTagName('*');
                var divTagNameLength = divTagName.length;
                var saveSensitiveElement = [];

                for(var i =0; i < divTagNameLength; i++) {
                    var getClassNameGroup = divTagName[i].className.split(' ');
                    if(this.inArray(childClass, getClassNameGroup)){
                        saveSensitiveElement.push(divTagName[i]);
                        break;
                    }
                }
                return saveSensitiveElement[0]
            }

            return parent.getElementsByClassName(childClass)[0]
        }

        codialog.prototype.find = function (parent, options, arr) {
            var self = this;
            if(parent && typeof parent == 'object') {
                if(typeof options == 'string') {
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
                                    if(typeof parentElement[i].getAttribute(attr) == 'string') {
                                        saveChildList.push(parentElement[i]);
                                        // 数组 继续执行for循环
                                        if(self.isArray(arr)) continue;
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
                                if(self.isArray(arr)) return saveChildList;
                                return saveChildList[0]
                            }
                        }
                        return fromAttributesToFindElement(parent.children, options.slice(1, options.length-1),arr)

                    }
                    else return parent.getElementsByTagName(options)
                } 
            }
        }

        codialog.prototype.addEventListener = function (el, type, fallback) {
            if(el.addEventListener) {
                el.addEventListener(type, fallback, false)
            }
            else if(el.attachEvent) {
                el.attachEvent('on' + type, fallback)
            }
        }

        codialog.prototype.removeEventListener = function (el,type,callback){
            if(el.removeEventListener){
                el.removeEventListener(type,callback,false);
            }
            else{
                el.detachEvent('on' + type, callback);
            }
        };

        codialog.prototype.isArray = function (arr) {
            if(Array.isArray) {
                return Array.isArray(arr)
            }
            else if(typeof arr != 'undefined' && Object.prototype.toString.call(arr) == '[object Array]') {
                return true
            }
            else return false;
        }

        /** **
        **推入一个新的弹出框节点元素并显示出来**
        ** **/
        codialog.prototype.list = function (options) {
            if (typeof options == 'string') {
                this.didDialogList.push(options);
            }
            return this.didDialogList;
        }

        /*
        ** 定义标题的属性 **
        > 标题class类不可以改变 ('.dialog-header')
        > 操作dialog头部的节点 (添 删 查 改)

        ** 外部插入header的信息有二种 **
         - 其一传入字符串
        ===========================
        title: '这是一个标题'
        ===========================

         - 传入的节点具有使用的操作
        =======================================
        onHeader: 'aside selector'
        onHeader: function ('dialog-header') {
            var header = $('dialog-header')
            header.append($('aside selector'))
        }
        =======================================
        */
        codialog.prototype.use = function (obj, success_config) {
            var self = this;
            var currentDialogElement = this.$(this.dialogElement);

            var dialog  =  this.find(currentDialogElement, '[dialog]');
            var mask    =  this.find(currentDialogElement, '[mask]');
            var header  =  this.find(currentDialogElement, '[header]');
            var body    =  this.find(currentDialogElement, '[body]');
            var footer  =  this.find(currentDialogElement, '[footer]');

            this.assign(this.rootDirectory, {
                dialog  : dialog,
                mask    : mask,
                header  : header,
                body    : body,
                footer  : footer
            });

            // 情况1：传入''字符串
            if (arguments.length && typeof obj == 'string' && this.xString.push(arguments)) {
                switch (this.xString[0].length) {
                    case 1:
                        obj = {
                            message: this.xString[0][0],
                            onHeaderBefore: function () {
                                this.style.display = 'none'
                            }
                        };
                        break;
                    case 2:
                        var getSecondPart = this.xString[0][1];
                        obj = {
                            title: this.xString[0][0],
                            message: typeof getSecondPart == 'string' ? getSecondPart : 'No message text'
                        };
                        break;
                    case 3:
                        var getSecondPart = this.xString[0][1];
                        var getThirdPart = this.xString[0][2];
                        obj = {
                            title: this.xString[0][0],
                            message: typeof getSecondPart == 'string' ? getSecondPart : 'No message',
                            confirmButtonText: typeof getThirdPart == 'string' ? getThirdPart : 'No confirm text'
                        };
                        break;
                    default:
                        break;
                }
                this.xString = [];
            }

            // 情况2：传入{}对象
            var footerButtonGroup =  this.find(footer,'[buttonGroup]');
            // 多次调用 禁修改默认属性
            var disabledChangedDefault = this.clone($default);

            obj = this.assign(disabledChangedDefault, obj);
            if (typeof obj != 'undefined' && Object.prototype.toString.call(obj) == '[object Object]') {


                // 在执行前处理节点属性设置
                if (obj.onDialogBefore
                    || obj.onHeaderBefore
                    || obj.onBodyBefore
                    || obj.onFooterBefore) {

                    if(typeof obj.onDialogBefore == 'function') {
                        obj.onDialogBefore.call(dialog, dialog);
                    }
                    if(typeof obj.onHeaderBefore == 'function') {
                        obj.onHeaderBefore.call(header, header);
                    }
                    if(typeof obj.onBodyBefore == 'function') {
                        obj.onBodyBefore.call(body, body);
                    }
                    if(typeof obj.onFooterBefore == 'function') {
                        obj.onFooterBefore.call(footer, footer);
                    }
                }


                // 超时自动关闭
                if (typeof obj.timeout != 'undefined' && typeof isNaN(obj.timeout)){
                    this.hide({
                        timeout: obj.timeout
                    })
                }


                // 显示遮罩层 default: true
                /** **
                ** 是否显示遮罩层 **
                - 添加了动画效果
                - dialog层嵌套在mask遮罩层里面
                - 不能给dialog设置position属性
                - 只能给dialog设置backgound背景透明
                ** **/
                if (typeof obj.isMask != 'undefined' && typeof obj.isMask == 'boolean' && this.find(currentDialogElement,'[mask]')) {
                    if (!obj.isMask) {
                        this.find(currentDialogElement,'[mask]').style.backgroundColor = 'transparent';
                    }
                }

                // 开启抓手特效
                // 只有点击之后才有手势效果
                if (typeof obj.isDrag != 'undefined' && obj.isDrag) {
                    var ready = true;
                    var dragCurrentDialog = {};
                    var mouseCurrentPosition = {};
                    var mouseMovePosition = {};

                    if(typeof obj.isGesture != 'undefined' && obj.isGesture) {
                        dialog.style.cursor = 'move';
                    }
                    else {
                        dialog.style.cursor = 'unset';
                    }
                    self.addEventListener(dialog, 'mousedown', function (ev) {

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

                                self.preventDefault(ev);
                            }
                        };

                        self.addEventListener(self.$(document), 'mousemove', mousemove);

                        self.addEventListener(self.$(document), 'mouseup', function (ev) {
                            self.removeEventListener(dialog.ownerDocument,'mouseover', mousemove);
                            ready = false;
                            self.preventDefault(ev);
                        });

                        self.preventDefault(ev);
                    });
                }

                // 底部有无按钮
                // 底部显示的是倒计时或者是其他信息
                // attr = [textGroup] or string
                if (typeof obj.footerText != 'undefined' && typeof obj.footerText == 'string'  && this.find(footer,'[textGroup]')) {
                    this.find(footer,'[textGroup]').innerHTML = obj.footerText;
                }
                else if (typeof obj.footerText != 'undefined' && Object.prototype.toString.call(obj.footerText) == '[object Array]' && this.find(footer,'[textGroup]')) {
                    if (obj.footerText.length > 0) {
                        this.find(footer,'[textGroup]').innerHTML = obj.footerText.concat().join('');
                    }
                }
                else {
                    this.removeChild(this.find(footer,'[textGroup]'));
                }


                // 重置属性绑定
                // 改变默认的文本和节点数据

                if (typeof obj.title != 'undefined' && typeof obj.title == 'string' && this.find(header,'[title]')) {
                    this.find(header,'[title]').innerHTML = obj.title;
                }
                if (typeof obj.message != 'undefined' && typeof obj.message == 'string' && this.find(body,'[message]')) {
                    this.find(body,'[message]').innerHTML = this.message || obj.message;
                }
                if (typeof obj.cancleButtonText != 'undefined' && typeof obj.cancleButtonText == 'string' && this.find(footerButtonGroup, '[cancle]')) {
                    this.find(footerButtonGroup, '[cancle]').textContent = obj.cancleButtonText
                }
                if (typeof obj.confirmButtonText != 'undefined' && typeof obj.confirmButtonText == 'string' && this.find(footerButtonGroup, '[confirm]')) {
                    this.find(footerButtonGroup, '[confirm]').textContent = obj.confirmButtonText
                }
                if (typeof obj.cancleButtonColor != 'undefined' && typeof obj.cancleButtonColor == 'string' && this.find(footerButtonGroup, '[cancle]')) {
                    this.find(footerButtonGroup, '[cancle]').style.color = obj.cancleButtonColor
                }
                if (typeof obj.confirmButtonColor != 'undefined' && typeof obj.confirmButtonColor == 'string' && this.find(footerButtonGroup, '[confirm]')) {
                    this.find(footerButtonGroup, '[confirm]').style.color = obj.confirmButtonColor
                }
                if (typeof obj.cancleButtonBackground != 'undefined' && typeof obj.cancleButtonBackground == 'string' && this.find(footerButtonGroup, '[cancle]')) {
                    this.find(footerButtonGroup, '[cancle]').style.background = obj.cancleButtonBackground
                }
                if (typeof obj.confirmButtonBackground != 'undefined' && typeof obj.confirmButtonBackground == 'string' && this.find(footerButtonGroup, '[confirm]')) {
                    this.find(footerButtonGroup, '[confirm]').style.background = obj.confirmButtonBackground
                }
                if (typeof obj.titleColor != 'undefined' && typeof obj.titleColor == 'string' && this.find(header, '[title]')) {
                    this.find(header, '[title]').style.color = obj.titleColor
                }
                if (typeof obj.closeColor != 'undefined' && typeof obj.closeColor == 'string' && this.find(header, '[close]')) {
                    this.find(header, '[close]').style.color = obj.closeColor
                }
                if (typeof obj.messageColor != 'undefined' && typeof obj.messageColor == 'string' && this.find(body, '[message]')) {
                    this.find(body, '[message]').style.color = obj.messageColor
                }


                // 所有子节点都会被获取 进行修改
                // 但是都在before执行之后才执行methods
                /*
                    $(this.dialogElement).find('[ref]').each(function (index,item) {
                        item.removeAttribute('ref');
                    });
                */
                if (typeof obj['methods'] == 'function') {
                    this.$methods();
                    obj.methods.call(this,this.dialogElement);
                }

                /*
                * 设置边距 *
                如果是数字 上下左右设置相同的值
                ======================================================================================
                if (typeof obj.headerMargin != 'undefined' && !isNaN(obj.headerMargin)) {
                    $(this.dialogElement).find(this.strict.header).css({'padding' : obj.headerMargin });
                }
                ======================================================================================
                否则如果是对象的情况下
                就会传入水平和垂直属性的值
                有二种情况
                其一是全部是数字
                其二是全部使用px字符串
                */
                this.margin(obj,'header', 'headerMargin', 'padding');
                // body
                this.margin(obj,'body', 'bodyMargin', null);
                // footer
                this.margin(obj,'footer', 'footerMargin', 'padding');

                // 是否关闭dialog
                // 默认开启dialog
                // default: true
                if (typeof obj.isClose == 'boolean' && obj.isClose) {
                    // 防止通过 this.dialogElement 元素查找失效
                    var _currentDialogElement = this.$(this.dialogElement);

                    var cacheCloseList = [];
                    var headerClose = this.find(header,'[close]');
                    if(typeof headerClose != 'undefined', headerClose) {
                        cacheCloseList.push(headerClose);
                    }

                    var footerCancle = this.find(footerButtonGroup,'[cancle]');
                    if(typeof footerButtonGroup != 'undefined', footerCancle) {
                        if(typeof footerCancle != 'undefined') {
                            cacheCloseList.push(footerCancle);
                        }
                    }

                    var footerConfirm = this.find(footerButtonGroup,'[confirm]');
                    if(typeof footerButtonGroup != 'undefined', footerConfirm) {
                        if(typeof footerConfirm != 'undefined') {
                            cacheCloseList.push(footerConfirm);
                        }
                    }

                    if(cacheCloseList.length > 0) {
                        this.forEach(cacheCloseList, function (close, index) {
                            close.onclick = function (e) {
                                self.hide((_currentDialogElement.className.length ? '.' + _currentDialogElement.className : '#' + _currentDialogElement.getAttribute('id')))
                                clearTimeout(self.setTimer);

                                // 确认按钮的回调函数
                                if(index == 2 && typeof obj.confirmCallback == 'function') {
                                    obj.confirmCallback()
                                }
                                // 取消按钮的回调函数
                                else if(index == 1 && typeof obj.cancleCallback == 'function') {
                                    obj.cancleCallback()
                                }

                                self.closeBackValue = true;
                            }
                        })
                    }
                }


                // 是否显示关闭按钮 默认显示
                var getClose = this.find(header,'[close]'); // 防止自定义获取不到节点
                if (typeof obj.showCloseButton != 'undefined' && typeof obj.showCloseButton == 'boolean' && !obj.showCloseButton && getClose) {
                    if(typeof getClose != 'undefined') {
                        getClose.style.display = 'none';
                    }
                }

                // 显示取消按钮 默认隐藏
                var getCancle = this.find(footerButtonGroup,'[cancle]'); // 防止自定义获取不到节点
                if (typeof obj.showCancleButton != 'undefined' && typeof obj.showCancleButton == 'boolean' && obj.showCancleButton && getCancle) {
                    if(typeof getCancle != 'undefined', getCancle) {
                        getCancle.style.display = 'inline-block';
                    }
                }

                // 显示确定按钮 默认显示
                var getConfirm = this.find(footerButtonGroup,'[confirm]'); // 防止自定义获取不到节点
                if(typeof obj.showConfirmButton != 'undefined' && typeof obj.showConfirmButton == 'boolean' && getConfirm) {
                    if(obj.showConfirmButton) {
                        getConfirm.style.display = 'inline-block';
                    }
                    else {
                        getConfirm.style.display = 'none';
                    }
                }

                // 所有节点和函数都执行之后处理
                if (obj.onDialogAfter
                    || obj.onHeaderAfter
                    || obj.onBodyAfter
                    || obj.onFooterAfter) {
                    if(typeof obj.onDialogAfter == 'function') {
                        obj.onDialogAfter.call(dialog, dialog);
                    }
                    if(typeof obj.onHeaderAfter == 'function') {
                        obj.onHeaderAfter.call(header, header);
                    }
                    if(typeof obj.onBodyAfter == 'function') {
                        obj.onBodyAfter.call(body,body);
                    }
                    if(typeof obj.onFooterAfter == 'function') {
                        obj.onFooterAfter.call(footer,footer);
                    }
                }



                // layout 弹出框初始位置 上|下|左|右|居中|左上|左下|右上|右下
                if (typeof obj.layout == 'string' && obj.layout.length) {
                    resize()
                }

                function resize () {
                    var windowWidth = (document.documentElement || document.body).clientWidth;
                    var windowHeidth = (document.documentElement || document.body).clientHeight;

                    // offsetWidth 隐藏不能获取处理
                    var isOpenDialog = false;
                    currentDialogElement.style.zIndex = '-9999';
                    if(currentDialogElement.style.display != 'block') {
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
                        dialog.style.top = getBraowserAxis.y - getTargetAxis.y + 'px';
                    }

                    // 只有一个位置
                    if(currentPostion.length == 1) {
                        currentPostion = self.trim(currentPostion[0]);
                        switch (currentPostion) {
                            case 'center' :
                                layoutDefaultCenter();
                                break;
                            case 'left' :
                                dialog.style.left = 10 + 'px';
                                dialog.style.top = getBraowserAxis.y - getTargetAxis.y + 'px';
                                break;
                            case 'right' :
                                dialog.style.left = windowWidth - targetWidth - 10 + 'px';
                                dialog.style.top = getBraowserAxis.y - getTargetAxis.y + 'px';
                                break;
                            case 'top' :
                                dialog.style.left = getBraowserAxis.x - getTargetAxis.x + 'px';
                                dialog.style.top = 10 + 'px';
                                break;
                            case 'bottom' :
                                dialog.style.left = getBraowserAxis.x - getTargetAxis.x + 'px';
                                dialog.style.top = windowHeidth - targetHeight - 10 + 'px';
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
                            dialog.style.top = 10 + 'px';
                        }
                        else if(currentPostion == 'left bottom' || currentPostion == 'bottom left') {
                            dialog.style.left = 10 + 'px';
                            dialog.style.top = windowHeidth - targetHeight - 10 + 'px';
                        }
                        else if(currentPostion == 'right top' || currentPostion == 'top right') {
                            dialog.style.left = windowWidth - targetWidth + 10 + 'px';
                            dialog.style.top = 10 + 'px';
                        }
                        else if(currentPostion == 'right bottom' || currentPostion == 'bottom right') {
                            dialog.style.left = windowWidth - targetWidth + 'px';
                            dialog.style.top = windowHeidth - targetHeight - 10 + 'px';
                        }
                        else {
                            layoutDefaultCenter();
                        }
                    }
                }

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


                // 验证是否为空对象返回一个 非0
                function isEmptyObj (io) {
                    for (var dist in io) {
                        return !1
                    }
                    return !0
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
                    self.classList(document.body, self.classList(document.body).replace(' codialog-show',''), '');
                    self.classList(document.documentElement, self.classList(document.documentElement).replace(' codialog-show',''), '');
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


            if (typeof obj.animation != 'undefined' && typeof obj.animation == 'boolean' && currentDialogElement) {
                if(!obj.animation) {
                    if(typeof obj.customAnimation == 'string') {
                        this.hasAnimation = false;
                        this.customAnimation = obj.customAnimation;
                    }
                }
                else this.hasAnimation = true;
            }
                

            return this
        }

        codialog.prototype.preventDefault = function (ev) {
            if(ev.preventDefault) {
                ev.preventDefault();
            }
            else if(ev.stopPropagation) {
                ev.stopPropagation()
            }
            else return false;
        }

        codialog.prototype.removeChild = function (child) {
            if(typeof child == 'undefined') return null;

            if (child.parentElement.removeChild) {
                return child.parentElement.removeChild(child)
            }
            return child.parentElement.removeNode(child)
        }

        codialog.prototype.search = function (options,val) {
            if(typeof options == 'string' && options.search(val) + 1) {
                return !0
            }
            return !1
        }

        codialog.prototype.forEach = function (options, fallback, context) {
            if(typeof options != 'undefined') {
                if(typeof options.forEach == 'function') {
                    options.forEach(fallback, context || {})
                    return;
                }
                for(var i =0; i < options.length; i++) {
                    typeof fallback == 'function' ? fallback.call(context || null, options[i], i) : null
                }
            }
        }

        codialog.prototype.trim = function (options) {
            if (this.search(options,' ')) {
                return options.replace(/(\s*)/g, '')
            }
            return options
        }

        codialog.prototype.assign = function (orignal, objectGroup) {
            if(typeof objectGroup == 'undefined') {
                return null;
            }
            if(typeof objectGroup == 'object') {
                if(objectGroup instanceof Array) {
                    return void Array;
                }
                else if( objectGroup instanceof Object) {
                    for(var o in objectGroup) {
                        orignal[o] = objectGroup[o];
                    }
                    return orignal;
                }
                else {
                    return null;
                }
            }
        }

        codialog.prototype.classList = function (nowNodeList, params, newNode) {
            if(typeof params == 'string') {
                if(nowNodeList.classList) {
                    nowNodeList.setAttribute('class',(typeof newNode !== 'string' ? newNode.classList : '') + params);
                }
                else if(nowNodeList.className) {
                    nowNodeList.className = (typeof newNode !== 'string' ? newNode.className : '') + params;
                }
                return null;
            }
            else return nowNodeList.className || nowNodeList.classList;
        }


        codialog.prototype.$methods = function (callback) {
            this.header = this.onHeader({children: this.rootDirectory.header });
            this.body = this.onBody({children: this.rootDirectory.body });
            this.footer = this.onFooter({children: this.rootDirectory.footer });
            if (typeof callback == 'function') callback.call(this, this.dialogElement);
            return this;
        }

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
        /*
        需要在dialog body里面加载其他元素, 比如图片的失效 和 其他图片icon信息
        或者添加一条新的节点信息
        */
        codialog.prototype.onDialogBefore = function (opt) {}
        codialog.prototype.onHeaderBefore = function (opt) {}
        codialog.prototype.onBodyBefore = function (opt) {}
        codialog.prototype.onFooterBefore = function (opt) {}

        // binding attr on the prefix + 'before'
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

        codialog.prototype.margin = function (obj, currentNode, custom_margin, margin) {
            var getMargin;
            var parse = new Object();
            var Empty = new Array();
            var _margin = margin || 'margin';
            // 正则匹配情况如下：
            // 全数字 字符串(数字) 字符串(数字+px) 字符串(数字+px+空格) 字符串(数字+px+空格)多次出现 字符串(结尾出现空格) 字符串(数字 空格 数字) 字符串(数字+px 数字) 字符串(数字 数字+px)
            if (!isNaN(obj[custom_margin]) || 
                (typeof obj[custom_margin] != 'string' ? false : obj[custom_margin].search(/^((([\d]+|[\d]+(\em|\px|\%|rem|\ex))?(\s+))*)?([\d]+|[\d]+(\em|\px|\%|rem|\ex))?(\s*)$/g) >= 0)) {
                parse[_margin] = obj[custom_margin];
            }
            else if(typeof obj[custom_margin] != 'undefined' && Object.prototype.toString.call(obj[custom_margin]) == '[object Object]') {
                if( typeof obj[custom_margin].horizontal != 'undefined'
                    && typeof obj[custom_margin].vertical != 'undefined'
                    && !isNaN(obj[custom_margin].horizontal)
                    && !isNaN(obj[custom_margin].vertical)) {
                    getMargin = obj[custom_margin].horizontal +'px ' +　obj[custom_margin].vertical +'px';
                }
                else if (this.search(obj[custom_margin].horizontal,'px') || this.search(obj[custom_margin].vertical,'px')) {
                    var px = obj[custom_margin].horizontal.split(' ');
                    var h1 = px[0] || 0;
                    var h2 = px[1] || 0;
                    var px = obj[custom_margin].vertical.split(' ');
                    var v1 = px[0] || 0;
                    var v2 = px[1] || 0;
                    Empty.push.call(Empty, v1, h2, v2, h1);
                    getMargin = Empty.join(' ');
                }
                parse[_margin] = getMargin;
            }

            this.find(this.$(this.dialogElement),'[' + currentNode + ']').style[parse];
            return this
        }

        codialog.prototype.animate = function (options) {
            return _coanimation(options)
        }

        appDialog.dialogTemplate = function (_root) {
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
            str += '<div class="codialog-message-success codialog-success"></div>';
            str += '<div class="codialog-message-fail codialog-fail"></div>';
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


        // animation
        // base on co-animation plugins api
        var co = function () {};
        co.count = void null;
        co.delay = new Array();
        co.listItems = new Array();
        co.bufferTimer = new Array();
        co.animatiomApi = new Array();
        co.saveAnimation = new Array();
        co.saveApiMethods = new Array();
        co.saveAllNodeAnimation = new Array();
        co.animatiomApi = [
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
        co.supportBrowserAnimationEventOfName_end = {
            "animation"      : "animationend",
            "OAnimation"     : "oAnimationEnd",
            "MozAnimation"   : "animationend",
            "WebkitAnimation": "webkitAnimationEnd",
            'MSAnimation': 'MSAnimationEnd'
        };
        co.supportBrowserAnimationEventOfName_start = {
            "animation"      : "animationstart",
            "OAnimation"     : "oAnimationStart",
            "MozAnimation"   : "animationstart",
            "WebkitAnimation": "webkitAnimationStart",
            'MSAnimation': 'MSAnimationStart'
        };
        co.validateAnimationEvent = function (el, eventObjectName) {
            var SPAEON = eventObjectName;
            for(var k in SPAEON) {
                if(el.style[k] != undefined) {
                    return SPAEON[k]
                }
            }
        }

        co.prototype.animation = function (nodelist,currentNodeAnimation,x,fallback, showAndHideApi) {
            var getNodeList = document.querySelector(nodelist);
            var classList = codialog.prototype.classList;
            var supportsAntEvent_end = co.validateAnimationEvent(getNodeList, co.supportBrowserAnimationEventOfName_end);
            var supportsAntEvent_start = co.validateAnimationEvent(getNodeList, co.supportBrowserAnimationEventOfName_start);

            if(showAndHideApi.type.toLowerCase() == 'end') classList(getNodeList,' ' + x + ' animatedHalf', getNodeList);
            else classList(getNodeList,' ' + x + ' animated', getNodeList);
            
            var callAnimationEventStart = function () {
                var typeStartWith = showAndHideApi.type;
                // 2种情况 
                // 显示弹出框时 有一次动画开始 到结束过程
                // 隐藏弹出框时 也有一次动画开始 到结束过程
                // 不同之处就是隐藏时  本身就显示的弹出框 可见动画被监听 
                // 而之前隐藏的弹出框  不可见 就不会立马被监听
                getNodeList.removeEventListener(supportsAntEvent_start, callAnimationEventEnd, false);
            };

            var callAnimationEventEnd = function () {
                var typeStartWith = showAndHideApi.type;

                // 显示和隐藏的弹出框 都会监听一次结束
                // if(typeStartWith.toLowerCase() == 'start' && ('callback' in showAndHideApi)) {
                    // typeof showAndHideApi.callback == 'function' ? showAndHideApi.callback(x) : showAndHideApi;
                // }

                if(typeStartWith.toLowerCase() == 'end'/* && ('callback' in showAndHideApi)*/) {
                    showAndHideApi.callback(x)
                    // typeof showAndHideApi.callback == 'function' ? showAndHideApi.callback(x) : showAndHideApi;
                    classList(getNodeList, classList(getNodeList).replace(' ' + x + ' animatedHalf',''), '');
                }
                else {
                    classList(getNodeList, classList(getNodeList).replace(' ' + x + ' animated',''), '')
                }
                // fallback(nodelist,currentNodeAnimation);
                getNodeList.removeEventListener(supportsAntEvent_end, callAnimationEventEnd, false);
                getNodeList.removeEventListener(supportsAntEvent_start, callAnimationEventStart, false);
            };

            getNodeList.addEventListener(supportsAntEvent_end, callAnimationEventEnd, false);
            getNodeList.addEventListener(supportsAntEvent_start, callAnimationEventStart, false);
        }

        var createAnimationApi = function (param) {
            if(co.prototype.hasOwnProperty(param)) return null;
            else {
                co.prototype[param] = function (options) {
                    var _this = this;
                    co.saveAnimation = function (nodelist, nooo ,delay) {
                        _this.animation(nodelist, nooo, param, delay, (options instanceof Object ? options : { type: null, callback: function (){} }));
                    }

                    // 开始执行初始回调 
                    // 第一次执行动画 需要display : block
                    if(options.type == 'start' && typeof options.callback === 'function') options.callback();
                    return this;
                }
            }
        }

        for(var k = 0, calen = co.animatiomApi.length; k < calen; k++) {
            createAnimationApi(co.animatiomApi[k]);
        }

        // 延迟处理当前节点整体的动画时间
        co.prototype.delay = function (options) {
            if(typeof options !== 'undefined') co.delay.push(Number(options));
            return this;
        }

        // 停止调用api方法
        // 监听Animation动画
        co.prototype.stop = function () {
            return this;
        }

        co.invokeRender = function (options) {
            return this.prototype.render(options);
        }

        // 渲染当前脚本的动画效果
        co.prototype.render = function (bindArrayParams) {
            // bindArrayParams =  [options]
            co.saveAnimation(co.listItems.shift(), null , co.delay[0]);
        }

        function readyRender (options) {
            return this;
        }

        readyRender.prototype = co;

        function _coanimation (options) {
            return co.listItems.push(options ? options : null), new co;
        }

        _coanimation.prototype.render = function (options) {
            var instReadyRender = new readyRender();
            return instReadyRender.invokeRender.apply(instReadyRender, [options]);
        }

        /*
        中间内容存在如下节点：
        成功的节点元素class：dialog-message-success
        失败的节点元素class：dialog-message-fail
        填充内容的节点元素class：dialog-message-text
        */

        var $codialog = new(codialog);
        $codialog.assign($coog, $codialog);
        $codialog.assign($coog, $codialog.__proto__);
    }),
    typeof document != 'undefined' && window.coog && (window.coDialog = window.codialog = window.Codialog = window.CoDialog = window.Coog = window.coog),
    typeof document != 'undefined' && (function (d, s) {
            var sty = d.createElement('style');
            var head = d.getElementsByTagName('head')[0];
            sty.type = 'text/css';
            
            if(head.appendChild(sty),sty.stylesheet) {
                sty.stylesheet.cssText = s;
            }
            else if(document.all) {
                var cssStyle = d.createStyleSheet(); // 兼容ie 8
                cssStyle.cssText = s;
            }
            else {
                try {
                    sty.innerHTML = s;
                }
                catch (e) {
                    sty.innerText = s;
                }
            }
        })(document, '.codialog-show{overflow-y: hidden;height: auto !important;}.codialog-mask{position:fixed;top:0;right:0;bottom:0;left:0;z-index:999;background-color:rgba(0,0,0,.3)!important;text-align:center;align-items:center}.codialog-frame{position:absolute;z-index:99999;display:flex;overflow:hidden;border:none;border:1px solid #DEDEDE\9;border:calc(0px);-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px;background-color:#fff;box-shadow:0 0 12px rgba(0,0,0,.3);-ms-border-radius:6px;pointer-events:auto}.codialog-frame .codialog-box{display:block;width:520px;height:100%;max-width:100%}.codialog-box .codialog-fixed,.codialog-box .codialog-styles{height:inherit}.codialog-fixed .codialog-styles-head{padding:15px 19px;background-color:#F6F8FB}.codialog-styles-head .codialog-head-content{clear:both;display:table;text-align: left !important;width:100%}.codialog-head-content .codialog-head-close,.codialog-head-content .codialog-head-title{position:relative;display:table-cell;vertical-align:middle}.codialog-head-content .codialog-head-title{float:left;color:#9A9B9C;text-align:left}.codialog-head-content .codialog-head-close{float:right;color:#ccc;text-align:right}.codialog-head-content .codialog-head-close>button,.codialog-head-content .codialog-head-title>span{display:inline-block;font-weight:700;font-size:16px}.codialog-head-content .codialog-head-title>span{margin-left:0;color:inherit;font-weight:400}.codialog-head-content .codialog-head-close>button{position:relative;margin: 0;overflow:hidden;padding:0;width:19px;height:19px;border:none;border-radius:0;background:0 0;color:inherit;*color: #aaa;font-size:17px;font-family:serif;line-height:19px;cursor:pointer;transition:color .1s ease-out;justify-content:center}.codialog-fixed .codialog-styles-content{display:block;overflow-y:hidden;margin-top:28px;margin-right:64px;margin-left:64px;color:#696969;text-align:center;font-size:28px}.codialog-styles-content .codialog-content-message{position:relative}.codialog-content-message .codialog-message-text{width:100%;font-size:inherit}.codialog-fixed .codialog-styles-foot{display:block;margin-top:30px;margin-bottom:22px}.codialog-styles-foot .codialog-foot-button{display:block}.codialog-foot-button .codialog-button-group{text-align:center}.codialog-button-group .group-btn{display:inline-block;margin:0 8px;padding:10px 32px;outline:0;border:none;-webkit-border-radius:6px;-moz-border-radius:6px;border-radius:6px;font-weight:500;font-size:16px;cursor:pointer;-ms-border-radius:6px}.codialog-foot-button .codialog-button-group button[confirm]{background-color:#45B680}.codialog-foot-button .codialog-button-group button[cancle]{display:none;background-color:#16AEEE;background-color:rgba(22,174,238,1);color:#fff}.codialog-foot-button .codialog-text-group{color:#585858;text-align:center}.animatedHalf{-webkit-animation-duration:.2s;animation-duration:.2s;-webkit-animation-fill-mode:both;animation-fill-mode:both}.animated{-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-fill-mode:both;animation-fill-mode:both}.animated.infinite{-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite}@-webkit-keyframes bounce{from,20%,53%,80%,to{-webkit-animation-timing-function:cubic-bezier(0.215,0.61,0.355,1);animation-timing-function:cubic-bezier(0.215,0.61,0.355,1);-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}40%,43%{-webkit-animation-timing-function:cubic-bezier(0.755,0.05,0.855,0.06);animation-timing-function:cubic-bezier(0.755,0.05,0.855,0.06);-webkit-transform:translate3d(0,-30px,0);transform:translate3d(0,-30px,0)}70%{-webkit-animation-timing-function:cubic-bezier(0.755,0.05,0.855,0.06);animation-timing-function:cubic-bezier(0.755,0.05,0.855,0.06);-webkit-transform:translate3d(0,-15px,0);transform:translate3d(0,-15px,0)}90%{-webkit-transform:translate3d(0,-4px,0);transform:translate3d(0,-4px,0)}}@keyframes bounce{from,20%,53%,80%,to{-webkit-animation-timing-function:cubic-bezier(0.215,0.61,0.355,1);animation-timing-function:cubic-bezier(0.215,0.61,0.355,1);-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}40%,43%{-webkit-animation-timing-function:cubic-bezier(0.755,0.05,0.855,0.06);animation-timing-function:cubic-bezier(0.755,0.05,0.855,0.06);-webkit-transform:translate3d(0,-30px,0);transform:translate3d(0,-30px,0)}70%{-webkit-animation-timing-function:cubic-bezier(0.755,0.05,0.855,0.06);animation-timing-function:cubic-bezier(0.755,0.05,0.855,0.06);-webkit-transform:translate3d(0,-15px,0);transform:translate3d(0,-15px,0)}90%{-webkit-transform:translate3d(0,-4px,0);transform:translate3d(0,-4px,0)}}.bounce{-webkit-animation-name:bounce;animation-name:bounce;-webkit-transform-origin:center bottom;transform-origin:center bottom}@-webkit-keyframes flash{from,50%,to{opacity:1}25%,75%{opacity:0}}@keyframes flash{from,50%,to{opacity:1}25%,75%{opacity:0}}.flash{-webkit-animation-name:flash;animation-name:flash}@-webkit-keyframes pulse{from{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1)}50%{-webkit-transform:scale3d(1.05,1.05,1.05);transform:scale3d(1.05,1.05,1.05)}to{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1)}}@keyframes pulse{from{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1)}50%{-webkit-transform:scale3d(1.05,1.05,1.05);transform:scale3d(1.05,1.05,1.05)}to{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1)}}.pulse{-webkit-animation-name:pulse;animation-name:pulse}@-webkit-keyframes rubberBand{from{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1)}30%{-webkit-transform:scale3d(1.25,0.75,1);transform:scale3d(1.25,0.75,1)}40%{-webkit-transform:scale3d(0.75,1.25,1);transform:scale3d(0.75,1.25,1)}50%{-webkit-transform:scale3d(1.15,0.85,1);transform:scale3d(1.15,0.85,1)}65%{-webkit-transform:scale3d(0.95,1.05,1);transform:scale3d(0.95,1.05,1)}75%{-webkit-transform:scale3d(1.05,0.95,1);transform:scale3d(1.05,0.95,1)}to{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1)}}@keyframes rubberBand{from{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1)}30%{-webkit-transform:scale3d(1.25,0.75,1);transform:scale3d(1.25,0.75,1)}40%{-webkit-transform:scale3d(0.75,1.25,1);transform:scale3d(0.75,1.25,1)}50%{-webkit-transform:scale3d(1.15,0.85,1);transform:scale3d(1.15,0.85,1)}65%{-webkit-transform:scale3d(0.95,1.05,1);transform:scale3d(0.95,1.05,1)}75%{-webkit-transform:scale3d(1.05,0.95,1);transform:scale3d(1.05,0.95,1)}to{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1)}}.rubberBand{-webkit-animation-name:rubberBand;animation-name:rubberBand}@-webkit-keyframes shake{from,to{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}10%,30%,50%,70%,90%{-webkit-transform:translate3d(-10px,0,0);transform:translate3d(-10px,0,0)}20%,40%,60%,80%{-webkit-transform:translate3d(10px,0,0);transform:translate3d(10px,0,0)}}@keyframes shake{from,to{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}10%,30%,50%,70%,90%{-webkit-transform:translate3d(-10px,0,0);transform:translate3d(-10px,0,0)}20%,40%,60%,80%{-webkit-transform:translate3d(10px,0,0);transform:translate3d(10px,0,0)}}.shake{-webkit-animation-name:shake;animation-name:shake}@-webkit-keyframes headShake{0%{-webkit-transform:translateX(0);transform:translateX(0)}6.5%{-webkit-transform:translateX(-6px) rotateY(-9deg);transform:translateX(-6px) rotateY(-9deg)}18.5%{-webkit-transform:translateX(5px) rotateY(7deg);transform:translateX(5px) rotateY(7deg)}31.5%{-webkit-transform:translateX(-3px) rotateY(-5deg);transform:translateX(-3px) rotateY(-5deg)}43.5%{-webkit-transform:translateX(2px) rotateY(3deg);transform:translateX(2px) rotateY(3deg)}50%{-webkit-transform:translateX(0);transform:translateX(0)}}@keyframes headShake{0%{-webkit-transform:translateX(0);transform:translateX(0)}6.5%{-webkit-transform:translateX(-6px) rotateY(-9deg);transform:translateX(-6px) rotateY(-9deg)}18.5%{-webkit-transform:translateX(5px) rotateY(7deg);transform:translateX(5px) rotateY(7deg)}31.5%{-webkit-transform:translateX(-3px) rotateY(-5deg);transform:translateX(-3px) rotateY(-5deg)}43.5%{-webkit-transform:translateX(2px) rotateY(3deg);transform:translateX(2px) rotateY(3deg)}50%{-webkit-transform:translateX(0);transform:translateX(0)}}.headShake{-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out;-webkit-animation-name:headShake;animation-name:headShake}@-webkit-keyframes swing{20%{-webkit-transform:rotate3d(0,0,1,15deg);transform:rotate3d(0,0,1,15deg)}40%{-webkit-transform:rotate3d(0,0,1,-10deg);transform:rotate3d(0,0,1,-10deg)}60%{-webkit-transform:rotate3d(0,0,1,5deg);transform:rotate3d(0,0,1,5deg)}80%{-webkit-transform:rotate3d(0,0,1,-5deg);transform:rotate3d(0,0,1,-5deg)}to{-webkit-transform:rotate3d(0,0,1,0deg);transform:rotate3d(0,0,1,0deg)}}@keyframes swing{20%{-webkit-transform:rotate3d(0,0,1,15deg);transform:rotate3d(0,0,1,15deg)}40%{-webkit-transform:rotate3d(0,0,1,-10deg);transform:rotate3d(0,0,1,-10deg)}60%{-webkit-transform:rotate3d(0,0,1,5deg);transform:rotate3d(0,0,1,5deg)}80%{-webkit-transform:rotate3d(0,0,1,-5deg);transform:rotate3d(0,0,1,-5deg)}to{-webkit-transform:rotate3d(0,0,1,0deg);transform:rotate3d(0,0,1,0deg)}}.swing{-webkit-transform-origin:top center;transform-origin:top center;-webkit-animation-name:swing;animation-name:swing}@-webkit-keyframes tada{from{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1)}10%,20%{-webkit-transform:scale3d(0.9,0.9,0.9) rotate3d(0,0,1,-3deg);transform:scale3d(0.9,0.9,0.9) rotate3d(0,0,1,-3deg)}30%,50%,70%,90%{-webkit-transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,3deg);transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,3deg)}40%,60%,80%{-webkit-transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,-3deg);transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,-3deg)}to{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1)}}@keyframes tada{from{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1)}10%,20%{-webkit-transform:scale3d(0.9,0.9,0.9) rotate3d(0,0,1,-3deg);transform:scale3d(0.9,0.9,0.9) rotate3d(0,0,1,-3deg)}30%,50%,70%,90%{-webkit-transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,3deg);transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,3deg)}40%,60%,80%{-webkit-transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,-3deg);transform:scale3d(1.1,1.1,1.1) rotate3d(0,0,1,-3deg)}to{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1)}}.tada{-webkit-animation-name:tada;animation-name:tada}@-webkit-keyframes wobble{from{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}15%{-webkit-transform:translate3d(-25%,0,0) rotate3d(0,0,1,-5deg);transform:translate3d(-25%,0,0) rotate3d(0,0,1,-5deg)}30%{-webkit-transform:translate3d(20%,0,0) rotate3d(0,0,1,3deg);transform:translate3d(20%,0,0) rotate3d(0,0,1,3deg)}45%{-webkit-transform:translate3d(-15%,0,0) rotate3d(0,0,1,-3deg);transform:translate3d(-15%,0,0) rotate3d(0,0,1,-3deg)}60%{-webkit-transform:translate3d(10%,0,0) rotate3d(0,0,1,2deg);transform:translate3d(10%,0,0) rotate3d(0,0,1,2deg)}75%{-webkit-transform:translate3d(-5%,0,0) rotate3d(0,0,1,-1deg);transform:translate3d(-5%,0,0) rotate3d(0,0,1,-1deg)}to{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}@keyframes wobble{from{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}15%{-webkit-transform:translate3d(-25%,0,0) rotate3d(0,0,1,-5deg);transform:translate3d(-25%,0,0) rotate3d(0,0,1,-5deg)}30%{-webkit-transform:translate3d(20%,0,0) rotate3d(0,0,1,3deg);transform:translate3d(20%,0,0) rotate3d(0,0,1,3deg)}45%{-webkit-transform:translate3d(-15%,0,0) rotate3d(0,0,1,-3deg);transform:translate3d(-15%,0,0) rotate3d(0,0,1,-3deg)}60%{-webkit-transform:translate3d(10%,0,0) rotate3d(0,0,1,2deg);transform:translate3d(10%,0,0) rotate3d(0,0,1,2deg)}75%{-webkit-transform:translate3d(-5%,0,0) rotate3d(0,0,1,-1deg);transform:translate3d(-5%,0,0) rotate3d(0,0,1,-1deg)}to{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}.wobble{-webkit-animation-name:wobble;animation-name:wobble}@-webkit-keyframes jello{from,11.1%,to{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}22.2%{-webkit-transform:skewX(-12.5deg) skewY(-12.5deg);transform:skewX(-12.5deg) skewY(-12.5deg)}33.3%{-webkit-transform:skewX(6.25deg) skewY(6.25deg);transform:skewX(6.25deg) skewY(6.25deg)}44.4%{-webkit-transform:skewX(-3.125deg) skewY(-3.125deg);transform:skewX(-3.125deg) skewY(-3.125deg)}55.5%{-webkit-transform:skewX(1.5625deg) skewY(1.5625deg);transform:skewX(1.5625deg) skewY(1.5625deg)}66.6%{-webkit-transform:skewX(-0.78125deg) skewY(-0.78125deg);transform:skewX(-0.78125deg) skewY(-0.78125deg)}77.7%{-webkit-transform:skewX(0.390625deg) skewY(0.390625deg);transform:skewX(0.390625deg) skewY(0.390625deg)}88.8%{-webkit-transform:skewX(-0.1953125deg) skewY(-0.1953125deg);transform:skewX(-0.1953125deg) skewY(-0.1953125deg)}}@keyframes jello{from,11.1%,to{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}22.2%{-webkit-transform:skewX(-12.5deg) skewY(-12.5deg);transform:skewX(-12.5deg) skewY(-12.5deg)}33.3%{-webkit-transform:skewX(6.25deg) skewY(6.25deg);transform:skewX(6.25deg) skewY(6.25deg)}44.4%{-webkit-transform:skewX(-3.125deg) skewY(-3.125deg);transform:skewX(-3.125deg) skewY(-3.125deg)}55.5%{-webkit-transform:skewX(1.5625deg) skewY(1.5625deg);transform:skewX(1.5625deg) skewY(1.5625deg)}66.6%{-webkit-transform:skewX(-0.78125deg) skewY(-0.78125deg);transform:skewX(-0.78125deg) skewY(-0.78125deg)}77.7%{-webkit-transform:skewX(0.390625deg) skewY(0.390625deg);transform:skewX(0.390625deg) skewY(0.390625deg)}88.8%{-webkit-transform:skewX(-0.1953125deg) skewY(-0.1953125deg);transform:skewX(-0.1953125deg) skewY(-0.1953125deg)}}.jello{-webkit-animation-name:jello;animation-name:jello;-webkit-transform-origin:center;transform-origin:center}@-webkit-keyframes bounceIn{from,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(0.215,0.61,0.355,1);animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;-webkit-transform:scale3d(0.3,0.3,0.3);transform:scale3d(0.3,0.3,0.3)}20%{-webkit-transform:scale3d(1.1,1.1,1.1);transform:scale3d(1.1,1.1,1.1)}40%{-webkit-transform:scale3d(0.9,0.9,0.9);transform:scale3d(0.9,0.9,0.9)}60%{opacity:1;-webkit-transform:scale3d(1.03,1.03,1.03);transform:scale3d(1.03,1.03,1.03)}80%{-webkit-transform:scale3d(0.97,0.97,0.97);transform:scale3d(0.97,0.97,0.97)}to{opacity:1;-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1)}}@keyframes bounceIn{from,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(0.215,0.61,0.355,1);animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;-webkit-transform:scale3d(0.3,0.3,0.3);transform:scale3d(0.3,0.3,0.3)}20%{-webkit-transform:scale3d(1.1,1.1,1.1);transform:scale3d(1.1,1.1,1.1)}40%{-webkit-transform:scale3d(0.9,0.9,0.9);transform:scale3d(0.9,0.9,0.9)}60%{opacity:1;-webkit-transform:scale3d(1.03,1.03,1.03);transform:scale3d(1.03,1.03,1.03)}80%{-webkit-transform:scale3d(0.97,0.97,0.97);transform:scale3d(0.97,0.97,0.97)}to{opacity:1;-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1)}}.bounceIn{-webkit-animation-duration:.75s;animation-duration:.75s;-webkit-animation-name:bounceIn;animation-name:bounceIn}@-webkit-keyframes bounceInDown{from,60%,75%,90%,to{-webkit-animation-timing-function:cubic-bezier(0.215,0.61,0.355,1);animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;-webkit-transform:translate3d(0,-3000px,0);transform:translate3d(0,-3000px,0)}60%{opacity:1;-webkit-transform:translate3d(0,25px,0);transform:translate3d(0,25px,0)}75%{-webkit-transform:translate3d(0,-10px,0);transform:translate3d(0,-10px,0)}90%{-webkit-transform:translate3d(0,5px,0);transform:translate3d(0,5px,0)}to{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}@keyframes bounceInDown{from,60%,75%,90%,to{-webkit-animation-timing-function:cubic-bezier(0.215,0.61,0.355,1);animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;-webkit-transform:translate3d(0,-3000px,0);transform:translate3d(0,-3000px,0)}60%{opacity:1;-webkit-transform:translate3d(0,25px,0);transform:translate3d(0,25px,0)}75%{-webkit-transform:translate3d(0,-10px,0);transform:translate3d(0,-10px,0)}90%{-webkit-transform:translate3d(0,5px,0);transform:translate3d(0,5px,0)}to{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}.bounceInDown{-webkit-animation-name:bounceInDown;animation-name:bounceInDown}@-webkit-keyframes bounceInLeft{from,60%,75%,90%,to{-webkit-animation-timing-function:cubic-bezier(0.215,0.61,0.355,1);animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;-webkit-transform:translate3d(-3000px,0,0);transform:translate3d(-3000px,0,0)}60%{opacity:1;-webkit-transform:translate3d(25px,0,0);transform:translate3d(25px,0,0)}75%{-webkit-transform:translate3d(-10px,0,0);transform:translate3d(-10px,0,0)}90%{-webkit-transform:translate3d(5px,0,0);transform:translate3d(5px,0,0)}to{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}@keyframes bounceInLeft{from,60%,75%,90%,to{-webkit-animation-timing-function:cubic-bezier(0.215,0.61,0.355,1);animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}0%{opacity:0;-webkit-transform:translate3d(-3000px,0,0);transform:translate3d(-3000px,0,0)}60%{opacity:1;-webkit-transform:translate3d(25px,0,0);transform:translate3d(25px,0,0)}75%{-webkit-transform:translate3d(-10px,0,0);transform:translate3d(-10px,0,0)}90%{-webkit-transform:translate3d(5px,0,0);transform:translate3d(5px,0,0)}to{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}.bounceInLeft{-webkit-animation-name:bounceInLeft;animation-name:bounceInLeft}@-webkit-keyframes bounceInRight{from,60%,75%,90%,to{-webkit-animation-timing-function:cubic-bezier(0.215,0.61,0.355,1);animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}from{opacity:0;-webkit-transform:translate3d(3000px,0,0);transform:translate3d(3000px,0,0)}60%{opacity:1;-webkit-transform:translate3d(-25px,0,0);transform:translate3d(-25px,0,0)}75%{-webkit-transform:translate3d(10px,0,0);transform:translate3d(10px,0,0)}90%{-webkit-transform:translate3d(-5px,0,0);transform:translate3d(-5px,0,0)}to{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}@keyframes bounceInRight{from,60%,75%,90%,to{-webkit-animation-timing-function:cubic-bezier(0.215,0.61,0.355,1);animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}from{opacity:0;-webkit-transform:translate3d(3000px,0,0);transform:translate3d(3000px,0,0)}60%{opacity:1;-webkit-transform:translate3d(-25px,0,0);transform:translate3d(-25px,0,0)}75%{-webkit-transform:translate3d(10px,0,0);transform:translate3d(10px,0,0)}90%{-webkit-transform:translate3d(-5px,0,0);transform:translate3d(-5px,0,0)}to{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}.bounceInRight{-webkit-animation-name:bounceInRight;animation-name:bounceInRight}@-webkit-keyframes bounceInUp{from,60%,75%,90%,to{-webkit-animation-timing-function:cubic-bezier(0.215,0.61,0.355,1);animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}from{opacity:0;-webkit-transform:translate3d(0,3000px,0);transform:translate3d(0,3000px,0)}60%{opacity:1;-webkit-transform:translate3d(0,-20px,0);transform:translate3d(0,-20px,0)}75%{-webkit-transform:translate3d(0,10px,0);transform:translate3d(0,10px,0)}90%{-webkit-transform:translate3d(0,-5px,0);transform:translate3d(0,-5px,0)}to{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}@keyframes bounceInUp{from,60%,75%,90%,to{-webkit-animation-timing-function:cubic-bezier(0.215,0.61,0.355,1);animation-timing-function:cubic-bezier(0.215,0.61,0.355,1)}from{opacity:0;-webkit-transform:translate3d(0,3000px,0);transform:translate3d(0,3000px,0)}60%{opacity:1;-webkit-transform:translate3d(0,-20px,0);transform:translate3d(0,-20px,0)}75%{-webkit-transform:translate3d(0,10px,0);transform:translate3d(0,10px,0)}90%{-webkit-transform:translate3d(0,-5px,0);transform:translate3d(0,-5px,0)}to{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}.bounceInUp{-webkit-animation-name:bounceInUp;animation-name:bounceInUp}@-webkit-keyframes bounceOut{20%{-webkit-transform:scale3d(0.9,0.9,0.9);transform:scale3d(0.9,0.9,0.9)}50%,55%{opacity:1;-webkit-transform:scale3d(1.1,1.1,1.1);transform:scale3d(1.1,1.1,1.1)}to{opacity:0;-webkit-transform:scale3d(0.3,0.3,0.3);transform:scale3d(0.3,0.3,0.3)}}@keyframes bounceOut{20%{-webkit-transform:scale3d(0.9,0.9,0.9);transform:scale3d(0.9,0.9,0.9)}50%,55%{opacity:1;-webkit-transform:scale3d(1.1,1.1,1.1);transform:scale3d(1.1,1.1,1.1)}to{opacity:0;-webkit-transform:scale3d(0.3,0.3,0.3);transform:scale3d(0.3,0.3,0.3)}}.bounceOut{-webkit-animation-duration:.75s;animation-duration:.75s;-webkit-animation-name:bounceOut;animation-name:bounceOut}@-webkit-keyframes bounceOutDown{20%{-webkit-transform:translate3d(0,10px,0);transform:translate3d(0,10px,0)}40%,45%{opacity:1;-webkit-transform:translate3d(0,-20px,0);transform:translate3d(0,-20px,0)}to{opacity:0;-webkit-transform:translate3d(0,2000px,0);transform:translate3d(0,2000px,0)}}@keyframes bounceOutDown{20%{-webkit-transform:translate3d(0,10px,0);transform:translate3d(0,10px,0)}40%,45%{opacity:1;-webkit-transform:translate3d(0,-20px,0);transform:translate3d(0,-20px,0)}to{opacity:0;-webkit-transform:translate3d(0,2000px,0);transform:translate3d(0,2000px,0)}}.bounceOutDown{-webkit-animation-name:bounceOutDown;animation-name:bounceOutDown}@-webkit-keyframes bounceOutLeft{20%{opacity:1;-webkit-transform:translate3d(20px,0,0);transform:translate3d(20px,0,0)}to{opacity:0;-webkit-transform:translate3d(-2000px,0,0);transform:translate3d(-2000px,0,0)}}@keyframes bounceOutLeft{20%{opacity:1;-webkit-transform:translate3d(20px,0,0);transform:translate3d(20px,0,0)}to{opacity:0;-webkit-transform:translate3d(-2000px,0,0);transform:translate3d(-2000px,0,0)}}.bounceOutLeft{-webkit-animation-name:bounceOutLeft;animation-name:bounceOutLeft}@-webkit-keyframes bounceOutRight{20%{opacity:1;-webkit-transform:translate3d(-20px,0,0);transform:translate3d(-20px,0,0)}to{opacity:0;-webkit-transform:translate3d(2000px,0,0);transform:translate3d(2000px,0,0)}}@keyframes bounceOutRight{20%{opacity:1;-webkit-transform:translate3d(-20px,0,0);transform:translate3d(-20px,0,0)}to{opacity:0;-webkit-transform:translate3d(2000px,0,0);transform:translate3d(2000px,0,0)}}.bounceOutRight{-webkit-animation-name:bounceOutRight;animation-name:bounceOutRight}@-webkit-keyframes bounceOutUp{20%{-webkit-transform:translate3d(0,-10px,0);transform:translate3d(0,-10px,0)}40%,45%{opacity:1;-webkit-transform:translate3d(0,20px,0);transform:translate3d(0,20px,0)}to{opacity:0;-webkit-transform:translate3d(0,-2000px,0);transform:translate3d(0,-2000px,0)}}@keyframes bounceOutUp{20%{-webkit-transform:translate3d(0,-10px,0);transform:translate3d(0,-10px,0)}40%,45%{opacity:1;-webkit-transform:translate3d(0,20px,0);transform:translate3d(0,20px,0)}to{opacity:0;-webkit-transform:translate3d(0,-2000px,0);transform:translate3d(0,-2000px,0)}}.bounceOutUp{-webkit-animation-name:bounceOutUp;animation-name:bounceOutUp}@-webkit-keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}.fadeIn{-webkit-animation-name:fadeIn;animation-name:fadeIn}@-webkit-keyframes fadeInDown{from{opacity:0;-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}@keyframes fadeInDown{from{opacity:0;-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}.fadeInDown{-webkit-animation-name:fadeInDown;animation-name:fadeInDown}@-webkit-keyframes fadeInDownBig{from{opacity:0;-webkit-transform:translate3d(0,-2000px,0);transform:translate3d(0,-2000px,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}@keyframes fadeInDownBig{from{opacity:0;-webkit-transform:translate3d(0,-2000px,0);transform:translate3d(0,-2000px,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}.fadeInDownBig{-webkit-animation-name:fadeInDownBig;animation-name:fadeInDownBig}@-webkit-keyframes fadeInLeft{from{opacity:0;-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}@keyframes fadeInLeft{from{opacity:0;-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}.fadeInLeft{-webkit-animation-name:fadeInLeft;animation-name:fadeInLeft}@-webkit-keyframes fadeInLeftBig{from{opacity:0;-webkit-transform:translate3d(-2000px,0,0);transform:translate3d(-2000px,0,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}@keyframes fadeInLeftBig{from{opacity:0;-webkit-transform:translate3d(-2000px,0,0);transform:translate3d(-2000px,0,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}.fadeInLeftBig{-webkit-animation-name:fadeInLeftBig;animation-name:fadeInLeftBig}@-webkit-keyframes fadeInRight{from{opacity:0;-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}@keyframes fadeInRight{from{opacity:0;-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}.fadeInRight{-webkit-animation-name:fadeInRight;animation-name:fadeInRight}@-webkit-keyframes fadeInRightBig{from{opacity:0;-webkit-transform:translate3d(2000px,0,0);transform:translate3d(2000px,0,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}@keyframes fadeInRightBig{from{opacity:0;-webkit-transform:translate3d(2000px,0,0);transform:translate3d(2000px,0,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}.fadeInRightBig{-webkit-animation-name:fadeInRightBig;animation-name:fadeInRightBig}@-webkit-keyframes fadeInUp{from{opacity:0;-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}@keyframes fadeInUp{from{opacity:0;-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}.fadeInUp{-webkit-animation-name:fadeInUp;animation-name:fadeInUp}@-webkit-keyframes fadeInUpBig{from{opacity:0;-webkit-transform:translate3d(0,2000px,0);transform:translate3d(0,2000px,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}@keyframes fadeInUpBig{from{opacity:0;-webkit-transform:translate3d(0,2000px,0);transform:translate3d(0,2000px,0)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}.fadeInUpBig{-webkit-animation-name:fadeInUpBig;animation-name:fadeInUpBig}@-webkit-keyframes fadeOut{from{opacity:1}to{opacity:0}}@keyframes fadeOut{from{opacity:1}to{opacity:0}}.fadeOut{-webkit-animation-name:fadeOut;animation-name:fadeOut}@-webkit-keyframes fadeOutDown{from{opacity:1}to{opacity:0;-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}}@keyframes fadeOutDown{from{opacity:1}to{opacity:0;-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}}.fadeOutDown{-webkit-animation-name:fadeOutDown;animation-name:fadeOutDown}@-webkit-keyframes fadeOutDownBig{from{opacity:1}to{opacity:0;-webkit-transform:translate3d(0,2000px,0);transform:translate3d(0,2000px,0)}}@keyframes fadeOutDownBig{from{opacity:1}to{opacity:0;-webkit-transform:translate3d(0,2000px,0);transform:translate3d(0,2000px,0)}}.fadeOutDownBig{-webkit-animation-name:fadeOutDownBig;animation-name:fadeOutDownBig}@-webkit-keyframes fadeOutLeft{from{opacity:1}to{opacity:0;-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}}@keyframes fadeOutLeft{from{opacity:1}to{opacity:0;-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}}.fadeOutLeft{-webkit-animation-name:fadeOutLeft;animation-name:fadeOutLeft}@-webkit-keyframes fadeOutLeftBig{from{opacity:1}to{opacity:0;-webkit-transform:translate3d(-2000px,0,0);transform:translate3d(-2000px,0,0)}}@keyframes fadeOutLeftBig{from{opacity:1}to{opacity:0;-webkit-transform:translate3d(-2000px,0,0);transform:translate3d(-2000px,0,0)}}.fadeOutLeftBig{-webkit-animation-name:fadeOutLeftBig;animation-name:fadeOutLeftBig}@-webkit-keyframes fadeOutRight{from{opacity:1}to{opacity:0;-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}}@keyframes fadeOutRight{from{opacity:1}to{opacity:0;-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}}.fadeOutRight{-webkit-animation-name:fadeOutRight;animation-name:fadeOutRight}@-webkit-keyframes fadeOutRightBig{from{opacity:1}to{opacity:0;-webkit-transform:translate3d(2000px,0,0);transform:translate3d(2000px,0,0)}}@keyframes fadeOutRightBig{from{opacity:1}to{opacity:0;-webkit-transform:translate3d(2000px,0,0);transform:translate3d(2000px,0,0)}}.fadeOutRightBig{-webkit-animation-name:fadeOutRightBig;animation-name:fadeOutRightBig}@-webkit-keyframes fadeOutUp{from{opacity:1}to{opacity:0;-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}}@keyframes fadeOutUp{from{opacity:1}to{opacity:0;-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}}.fadeOutUp{-webkit-animation-name:fadeOutUp;animation-name:fadeOutUp}@-webkit-keyframes fadeOutUpBig{from{opacity:1}to{opacity:0;-webkit-transform:translate3d(0,-2000px,0);transform:translate3d(0,-2000px,0)}}@keyframes fadeOutUpBig{from{opacity:1}to{opacity:0;-webkit-transform:translate3d(0,-2000px,0);transform:translate3d(0,-2000px,0)}}.fadeOutUpBig{-webkit-animation-name:fadeOutUpBig;animation-name:fadeOutUpBig}@-webkit-keyframes flip{from{-webkit-transform:perspective(400px) rotate3d(0,1,0,-360deg);transform:perspective(400px) rotate3d(0,1,0,-360deg);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}40%{-webkit-transform:perspective(400px) translate3d(0,0,150px) rotate3d(0,1,0,-190deg);transform:perspective(400px) translate3d(0,0,150px) rotate3d(0,1,0,-190deg);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}50%{-webkit-transform:perspective(400px) translate3d(0,0,150px) rotate3d(0,1,0,-170deg);transform:perspective(400px) translate3d(0,0,150px) rotate3d(0,1,0,-170deg);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}80%{-webkit-transform:perspective(400px) scale3d(0.95,0.95,0.95);transform:perspective(400px) scale3d(0.95,0.95,0.95);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}to{-webkit-transform:perspective(400px);transform:perspective(400px);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}}@keyframes flip{from{-webkit-transform:perspective(400px) rotate3d(0,1,0,-360deg);transform:perspective(400px) rotate3d(0,1,0,-360deg);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}40%{-webkit-transform:perspective(400px) translate3d(0,0,150px) rotate3d(0,1,0,-190deg);transform:perspective(400px) translate3d(0,0,150px) rotate3d(0,1,0,-190deg);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}50%{-webkit-transform:perspective(400px) translate3d(0,0,150px) rotate3d(0,1,0,-170deg);transform:perspective(400px) translate3d(0,0,150px) rotate3d(0,1,0,-170deg);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}80%{-webkit-transform:perspective(400px) scale3d(0.95,0.95,0.95);transform:perspective(400px) scale3d(0.95,0.95,0.95);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}to{-webkit-transform:perspective(400px);transform:perspective(400px);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}}.animated.flip{-webkit-backface-visibility:visible;backface-visibility:visible;-webkit-animation-name:flip;animation-name:flip}@-webkit-keyframes flipInX{from{-webkit-transform:perspective(400px) rotate3d(1,0,0,90deg);transform:perspective(400px) rotate3d(1,0,0,90deg);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in;opacity:0}40%{-webkit-transform:perspective(400px) rotate3d(1,0,0,-20deg);transform:perspective(400px) rotate3d(1,0,0,-20deg);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}60%{-webkit-transform:perspective(400px) rotate3d(1,0,0,10deg);transform:perspective(400px) rotate3d(1,0,0,10deg);opacity:1}80%{-webkit-transform:perspective(400px) rotate3d(1,0,0,-5deg);transform:perspective(400px) rotate3d(1,0,0,-5deg)}to{-webkit-transform:perspective(400px);transform:perspective(400px)}}@keyframes flipInX{from{-webkit-transform:perspective(400px) rotate3d(1,0,0,90deg);transform:perspective(400px) rotate3d(1,0,0,90deg);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in;opacity:0}40%{-webkit-transform:perspective(400px) rotate3d(1,0,0,-20deg);transform:perspective(400px) rotate3d(1,0,0,-20deg);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}60%{-webkit-transform:perspective(400px) rotate3d(1,0,0,10deg);transform:perspective(400px) rotate3d(1,0,0,10deg);opacity:1}80%{-webkit-transform:perspective(400px) rotate3d(1,0,0,-5deg);transform:perspective(400px) rotate3d(1,0,0,-5deg)}to{-webkit-transform:perspective(400px);transform:perspective(400px)}}.flipInX{-webkit-backface-visibility:visible!important;backface-visibility:visible!important;-webkit-animation-name:flipInX;animation-name:flipInX}@-webkit-keyframes flipInY{from{-webkit-transform:perspective(400px) rotate3d(0,1,0,90deg);transform:perspective(400px) rotate3d(0,1,0,90deg);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in;opacity:0}40%{-webkit-transform:perspective(400px) rotate3d(0,1,0,-20deg);transform:perspective(400px) rotate3d(0,1,0,-20deg);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}60%{-webkit-transform:perspective(400px) rotate3d(0,1,0,10deg);transform:perspective(400px) rotate3d(0,1,0,10deg);opacity:1}80%{-webkit-transform:perspective(400px) rotate3d(0,1,0,-5deg);transform:perspective(400px) rotate3d(0,1,0,-5deg)}to{-webkit-transform:perspective(400px);transform:perspective(400px)}}@keyframes flipInY{from{-webkit-transform:perspective(400px) rotate3d(0,1,0,90deg);transform:perspective(400px) rotate3d(0,1,0,90deg);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in;opacity:0}40%{-webkit-transform:perspective(400px) rotate3d(0,1,0,-20deg);transform:perspective(400px) rotate3d(0,1,0,-20deg);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}60%{-webkit-transform:perspective(400px) rotate3d(0,1,0,10deg);transform:perspective(400px) rotate3d(0,1,0,10deg);opacity:1}80%{-webkit-transform:perspective(400px) rotate3d(0,1,0,-5deg);transform:perspective(400px) rotate3d(0,1,0,-5deg)}to{-webkit-transform:perspective(400px);transform:perspective(400px)}}.flipInY{-webkit-backface-visibility:visible!important;backface-visibility:visible!important;-webkit-animation-name:flipInY;animation-name:flipInY}@-webkit-keyframes flipOutX{from{-webkit-transform:perspective(400px);transform:perspective(400px)}30%{-webkit-transform:perspective(400px) rotate3d(1,0,0,-20deg);transform:perspective(400px) rotate3d(1,0,0,-20deg);opacity:1}to{-webkit-transform:perspective(400px) rotate3d(1,0,0,90deg);transform:perspective(400px) rotate3d(1,0,0,90deg);opacity:0}}@keyframes flipOutX{from{-webkit-transform:perspective(400px);transform:perspective(400px)}30%{-webkit-transform:perspective(400px) rotate3d(1,0,0,-20deg);transform:perspective(400px) rotate3d(1,0,0,-20deg);opacity:1}to{-webkit-transform:perspective(400px) rotate3d(1,0,0,90deg);transform:perspective(400px) rotate3d(1,0,0,90deg);opacity:0}}.flipOutX{-webkit-animation-duration:.75s;animation-duration:.75s;-webkit-animation-name:flipOutX;animation-name:flipOutX;-webkit-backface-visibility:visible!important;backface-visibility:visible!important}@-webkit-keyframes flipOutY{from{-webkit-transform:perspective(400px);transform:perspective(400px)}30%{-webkit-transform:perspective(400px) rotate3d(0,1,0,-15deg);transform:perspective(400px) rotate3d(0,1,0,-15deg);opacity:1}to{-webkit-transform:perspective(400px) rotate3d(0,1,0,90deg);transform:perspective(400px) rotate3d(0,1,0,90deg);opacity:0}}@keyframes flipOutY{from{-webkit-transform:perspective(400px);transform:perspective(400px)}30%{-webkit-transform:perspective(400px) rotate3d(0,1,0,-15deg);transform:perspective(400px) rotate3d(0,1,0,-15deg);opacity:1}to{-webkit-transform:perspective(400px) rotate3d(0,1,0,90deg);transform:perspective(400px) rotate3d(0,1,0,90deg);opacity:0}}.flipOutY{-webkit-animation-duration:.75s;animation-duration:.75s;-webkit-backface-visibility:visible!important;backface-visibility:visible!important;-webkit-animation-name:flipOutY;animation-name:flipOutY}@-webkit-keyframes lightSpeedIn{from{-webkit-transform:translate3d(100%,0,0) skewX(-30deg);transform:translate3d(100%,0,0) skewX(-30deg);opacity:0}60%{-webkit-transform:skewX(20deg);transform:skewX(20deg);opacity:1}80%{-webkit-transform:skewX(-5deg);transform:skewX(-5deg);opacity:1}to{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);opacity:1}}@keyframes lightSpeedIn{from{-webkit-transform:translate3d(100%,0,0) skewX(-30deg);transform:translate3d(100%,0,0) skewX(-30deg);opacity:0}60%{-webkit-transform:skewX(20deg);transform:skewX(20deg);opacity:1}80%{-webkit-transform:skewX(-5deg);transform:skewX(-5deg);opacity:1}to{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);opacity:1}}.lightSpeedIn{-webkit-animation-name:lightSpeedIn;animation-name:lightSpeedIn;-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}@-webkit-keyframes lightSpeedOut{from{opacity:1}to{-webkit-transform:translate3d(100%,0,0) skewX(30deg);transform:translate3d(100%,0,0) skewX(30deg);opacity:0}}@keyframes lightSpeedOut{from{opacity:1}to{-webkit-transform:translate3d(100%,0,0) skewX(30deg);transform:translate3d(100%,0,0) skewX(30deg);opacity:0}}.lightSpeedOut{-webkit-animation-name:lightSpeedOut;animation-name:lightSpeedOut;-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}@-webkit-keyframes rotateIn{from{-webkit-transform-origin:center;transform-origin:center;-webkit-transform:rotate3d(0,0,1,-200deg);transform:rotate3d(0,0,1,-200deg);opacity:0}to{-webkit-transform-origin:center;transform-origin:center;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);opacity:1}}@keyframes rotateIn{from{-webkit-transform-origin:center;transform-origin:center;-webkit-transform:rotate3d(0,0,1,-200deg);transform:rotate3d(0,0,1,-200deg);opacity:0}to{-webkit-transform-origin:center;transform-origin:center;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);opacity:1}}.rotateIn{-webkit-animation-name:rotateIn;animation-name:rotateIn}@-webkit-keyframes rotateInDownLeft{from{-webkit-transform-origin:left bottom;transform-origin:left bottom;-webkit-transform:rotate3d(0,0,1,-45deg);transform:rotate3d(0,0,1,-45deg);opacity:0}to{-webkit-transform-origin:left bottom;transform-origin:left bottom;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);opacity:1}}@keyframes rotateInDownLeft{from{-webkit-transform-origin:left bottom;transform-origin:left bottom;-webkit-transform:rotate3d(0,0,1,-45deg);transform:rotate3d(0,0,1,-45deg);opacity:0}to{-webkit-transform-origin:left bottom;transform-origin:left bottom;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);opacity:1}}.rotateInDownLeft{-webkit-animation-name:rotateInDownLeft;animation-name:rotateInDownLeft}@-webkit-keyframes rotateInDownRight{from{-webkit-transform-origin:right bottom;transform-origin:right bottom;-webkit-transform:rotate3d(0,0,1,45deg);transform:rotate3d(0,0,1,45deg);opacity:0}to{-webkit-transform-origin:right bottom;transform-origin:right bottom;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);opacity:1}}@keyframes rotateInDownRight{from{-webkit-transform-origin:right bottom;transform-origin:right bottom;-webkit-transform:rotate3d(0,0,1,45deg);transform:rotate3d(0,0,1,45deg);opacity:0}to{-webkit-transform-origin:right bottom;transform-origin:right bottom;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);opacity:1}}.rotateInDownRight{-webkit-animation-name:rotateInDownRight;animation-name:rotateInDownRight}@-webkit-keyframes rotateInUpLeft{from{-webkit-transform-origin:left bottom;transform-origin:left bottom;-webkit-transform:rotate3d(0,0,1,45deg);transform:rotate3d(0,0,1,45deg);opacity:0}to{-webkit-transform-origin:left bottom;transform-origin:left bottom;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);opacity:1}}@keyframes rotateInUpLeft{from{-webkit-transform-origin:left bottom;transform-origin:left bottom;-webkit-transform:rotate3d(0,0,1,45deg);transform:rotate3d(0,0,1,45deg);opacity:0}to{-webkit-transform-origin:left bottom;transform-origin:left bottom;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);opacity:1}}.rotateInUpLeft{-webkit-animation-name:rotateInUpLeft;animation-name:rotateInUpLeft}@-webkit-keyframes rotateInUpRight{from{-webkit-transform-origin:right bottom;transform-origin:right bottom;-webkit-transform:rotate3d(0,0,1,-90deg);transform:rotate3d(0,0,1,-90deg);opacity:0}to{-webkit-transform-origin:right bottom;transform-origin:right bottom;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);opacity:1}}@keyframes rotateInUpRight{from{-webkit-transform-origin:right bottom;transform-origin:right bottom;-webkit-transform:rotate3d(0,0,1,-90deg);transform:rotate3d(0,0,1,-90deg);opacity:0}to{-webkit-transform-origin:right bottom;transform-origin:right bottom;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);opacity:1}}.rotateInUpRight{-webkit-animation-name:rotateInUpRight;animation-name:rotateInUpRight}@-webkit-keyframes rotateOut{from{-webkit-transform-origin:center;transform-origin:center;opacity:1}to{-webkit-transform-origin:center;transform-origin:center;-webkit-transform:rotate3d(0,0,1,200deg);transform:rotate3d(0,0,1,200deg);opacity:0}}@keyframes rotateOut{from{-webkit-transform-origin:center;transform-origin:center;opacity:1}to{-webkit-transform-origin:center;transform-origin:center;-webkit-transform:rotate3d(0,0,1,200deg);transform:rotate3d(0,0,1,200deg);opacity:0}}.rotateOut{-webkit-animation-name:rotateOut;animation-name:rotateOut}@-webkit-keyframes rotateOutDownLeft{from{-webkit-transform-origin:left bottom;transform-origin:left bottom;opacity:1}to{-webkit-transform-origin:left bottom;transform-origin:left bottom;-webkit-transform:rotate3d(0,0,1,45deg);transform:rotate3d(0,0,1,45deg);opacity:0}}@keyframes rotateOutDownLeft{from{-webkit-transform-origin:left bottom;transform-origin:left bottom;opacity:1}to{-webkit-transform-origin:left bottom;transform-origin:left bottom;-webkit-transform:rotate3d(0,0,1,45deg);transform:rotate3d(0,0,1,45deg);opacity:0}}.rotateOutDownLeft{-webkit-animation-name:rotateOutDownLeft;animation-name:rotateOutDownLeft}@-webkit-keyframes rotateOutDownRight{from{-webkit-transform-origin:right bottom;transform-origin:right bottom;opacity:1}to{-webkit-transform-origin:right bottom;transform-origin:right bottom;-webkit-transform:rotate3d(0,0,1,-45deg);transform:rotate3d(0,0,1,-45deg);opacity:0}}@keyframes rotateOutDownRight{from{-webkit-transform-origin:right bottom;transform-origin:right bottom;opacity:1}to{-webkit-transform-origin:right bottom;transform-origin:right bottom;-webkit-transform:rotate3d(0,0,1,-45deg);transform:rotate3d(0,0,1,-45deg);opacity:0}}.rotateOutDownRight{-webkit-animation-name:rotateOutDownRight;animation-name:rotateOutDownRight}@-webkit-keyframes rotateOutUpLeft{from{-webkit-transform-origin:left bottom;transform-origin:left bottom;opacity:1}to{-webkit-transform-origin:left bottom;transform-origin:left bottom;-webkit-transform:rotate3d(0,0,1,-45deg);transform:rotate3d(0,0,1,-45deg);opacity:0}}@keyframes rotateOutUpLeft{from{-webkit-transform-origin:left bottom;transform-origin:left bottom;opacity:1}to{-webkit-transform-origin:left bottom;transform-origin:left bottom;-webkit-transform:rotate3d(0,0,1,-45deg);transform:rotate3d(0,0,1,-45deg);opacity:0}}.rotateOutUpLeft{-webkit-animation-name:rotateOutUpLeft;animation-name:rotateOutUpLeft}@-webkit-keyframes rotateOutUpRight{from{-webkit-transform-origin:right bottom;transform-origin:right bottom;opacity:1}to{-webkit-transform-origin:right bottom;transform-origin:right bottom;-webkit-transform:rotate3d(0,0,1,90deg);transform:rotate3d(0,0,1,90deg);opacity:0}}@keyframes rotateOutUpRight{from{-webkit-transform-origin:right bottom;transform-origin:right bottom;opacity:1}to{-webkit-transform-origin:right bottom;transform-origin:right bottom;-webkit-transform:rotate3d(0,0,1,90deg);transform:rotate3d(0,0,1,90deg);opacity:0}}.rotateOutUpRight{-webkit-animation-name:rotateOutUpRight;animation-name:rotateOutUpRight}@-webkit-keyframes hinge{0%{-webkit-transform-origin:top left;transform-origin:top left;-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}20%,60%{-webkit-transform:rotate3d(0,0,1,80deg);transform:rotate3d(0,0,1,80deg);-webkit-transform-origin:top left;transform-origin:top left;-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}40%,80%{-webkit-transform:rotate3d(0,0,1,60deg);transform:rotate3d(0,0,1,60deg);-webkit-transform-origin:top left;transform-origin:top left;-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out;opacity:1}to{-webkit-transform:translate3d(0,700px,0);transform:translate3d(0,700px,0);opacity:0}}@keyframes hinge{0%{-webkit-transform-origin:top left;transform-origin:top left;-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}20%,60%{-webkit-transform:rotate3d(0,0,1,80deg);transform:rotate3d(0,0,1,80deg);-webkit-transform-origin:top left;transform-origin:top left;-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out}40%,80%{-webkit-transform:rotate3d(0,0,1,60deg);transform:rotate3d(0,0,1,60deg);-webkit-transform-origin:top left;transform-origin:top left;-webkit-animation-timing-function:ease-in-out;animation-timing-function:ease-in-out;opacity:1}to{-webkit-transform:translate3d(0,700px,0);transform:translate3d(0,700px,0);opacity:0}}.hinge{-webkit-animation-duration:2s;animation-duration:2s;-webkit-animation-name:hinge;animation-name:hinge}@-webkit-keyframes jackInTheBox{from{opacity:0;-webkit-transform:scale(0.1) rotate(30deg);transform:scale(0.1) rotate(30deg);-webkit-transform-origin:center bottom;transform-origin:center bottom}50%{-webkit-transform:rotate(-10deg);transform:rotate(-10deg)}70%{-webkit-transform:rotate(3deg);transform:rotate(3deg)}to{opacity:1;-webkit-transform:scale(1);transform:scale(1)}}@keyframes jackInTheBox{from{opacity:0;-webkit-transform:scale(0.1) rotate(30deg);transform:scale(0.1) rotate(30deg);-webkit-transform-origin:center bottom;transform-origin:center bottom}50%{-webkit-transform:rotate(-10deg);transform:rotate(-10deg)}70%{-webkit-transform:rotate(3deg);transform:rotate(3deg)}to{opacity:1;-webkit-transform:scale(1);transform:scale(1)}}.jackInTheBox{-webkit-animation-name:jackInTheBox;animation-name:jackInTheBox}@-webkit-keyframes rollIn{from{opacity:0;-webkit-transform:translate3d(-100%,0,0) rotate3d(0,0,1,-120deg);transform:translate3d(-100%,0,0) rotate3d(0,0,1,-120deg)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}@keyframes rollIn{from{opacity:0;-webkit-transform:translate3d(-100%,0,0) rotate3d(0,0,1,-120deg);transform:translate3d(-100%,0,0) rotate3d(0,0,1,-120deg)}to{opacity:1;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}.rollIn{-webkit-animation-name:rollIn;animation-name:rollIn}@-webkit-keyframes rollOut{from{opacity:1}to{opacity:0;-webkit-transform:translate3d(100%,0,0) rotate3d(0,0,1,120deg);transform:translate3d(100%,0,0) rotate3d(0,0,1,120deg)}}@keyframes rollOut{from{opacity:1}to{opacity:0;-webkit-transform:translate3d(100%,0,0) rotate3d(0,0,1,120deg);transform:translate3d(100%,0,0) rotate3d(0,0,1,120deg)}}.rollOut{-webkit-animation-name:rollOut;animation-name:rollOut}@-webkit-keyframes zoomIn{from{opacity:0;-webkit-transform:scale3d(0.3,0.3,0.3);transform:scale3d(0.3,0.3,0.3)}50%{opacity:1}}@keyframes zoomIn{from{opacity:0;-webkit-transform:scale3d(0.3,0.3,0.3);transform:scale3d(0.3,0.3,0.3)}50%{opacity:1}}.zoomIn{-webkit-animation-name:zoomIn;animation-name:zoomIn}@-webkit-keyframes zoomInDown{from{opacity:0;-webkit-transform:scale3d(0.1,0.1,0.1) translate3d(0,-1000px,0);transform:scale3d(0.1,0.1,0.1) translate3d(0,-1000px,0);-webkit-animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}60%{opacity:1;-webkit-transform:scale3d(0.475,0.475,0.475) translate3d(0,60px,0);transform:scale3d(0.475,0.475,0.475) translate3d(0,60px,0);-webkit-animation-timing-function:cubic-bezier(0.175,0.885,0.32,1);animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}@keyframes zoomInDown{from{opacity:0;-webkit-transform:scale3d(0.1,0.1,0.1) translate3d(0,-1000px,0);transform:scale3d(0.1,0.1,0.1) translate3d(0,-1000px,0);-webkit-animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}60%{opacity:1;-webkit-transform:scale3d(0.475,0.475,0.475) translate3d(0,60px,0);transform:scale3d(0.475,0.475,0.475) translate3d(0,60px,0);-webkit-animation-timing-function:cubic-bezier(0.175,0.885,0.32,1);animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}.zoomInDown{-webkit-animation-name:zoomInDown;animation-name:zoomInDown}@-webkit-keyframes zoomInLeft{from{opacity:0;-webkit-transform:scale3d(0.1,0.1,0.1) translate3d(-1000px,0,0);transform:scale3d(0.1,0.1,0.1) translate3d(-1000px,0,0);-webkit-animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}60%{opacity:1;-webkit-transform:scale3d(0.475,0.475,0.475) translate3d(10px,0,0);transform:scale3d(0.475,0.475,0.475) translate3d(10px,0,0);-webkit-animation-timing-function:cubic-bezier(0.175,0.885,0.32,1);animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}@keyframes zoomInLeft{from{opacity:0;-webkit-transform:scale3d(0.1,0.1,0.1) translate3d(-1000px,0,0);transform:scale3d(0.1,0.1,0.1) translate3d(-1000px,0,0);-webkit-animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}60%{opacity:1;-webkit-transform:scale3d(0.475,0.475,0.475) translate3d(10px,0,0);transform:scale3d(0.475,0.475,0.475) translate3d(10px,0,0);-webkit-animation-timing-function:cubic-bezier(0.175,0.885,0.32,1);animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}.zoomInLeft{-webkit-animation-name:zoomInLeft;animation-name:zoomInLeft}@-webkit-keyframes zoomInRight{from{opacity:0;-webkit-transform:scale3d(0.1,0.1,0.1) translate3d(1000px,0,0);transform:scale3d(0.1,0.1,0.1) translate3d(1000px,0,0);-webkit-animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}60%{opacity:1;-webkit-transform:scale3d(0.475,0.475,0.475) translate3d(-10px,0,0);transform:scale3d(0.475,0.475,0.475) translate3d(-10px,0,0);-webkit-animation-timing-function:cubic-bezier(0.175,0.885,0.32,1);animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}@keyframes zoomInRight{from{opacity:0;-webkit-transform:scale3d(0.1,0.1,0.1) translate3d(1000px,0,0);transform:scale3d(0.1,0.1,0.1) translate3d(1000px,0,0);-webkit-animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}60%{opacity:1;-webkit-transform:scale3d(0.475,0.475,0.475) translate3d(-10px,0,0);transform:scale3d(0.475,0.475,0.475) translate3d(-10px,0,0);-webkit-animation-timing-function:cubic-bezier(0.175,0.885,0.32,1);animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}.zoomInRight{-webkit-animation-name:zoomInRight;animation-name:zoomInRight}@-webkit-keyframes zoomInUp{from{opacity:0;-webkit-transform:scale3d(0.1,0.1,0.1) translate3d(0,1000px,0);transform:scale3d(0.1,0.1,0.1) translate3d(0,1000px,0);-webkit-animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}60%{opacity:1;-webkit-transform:scale3d(0.475,0.475,0.475) translate3d(0,-60px,0);transform:scale3d(0.475,0.475,0.475) translate3d(0,-60px,0);-webkit-animation-timing-function:cubic-bezier(0.175,0.885,0.32,1);animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}@keyframes zoomInUp{from{opacity:0;-webkit-transform:scale3d(0.1,0.1,0.1) translate3d(0,1000px,0);transform:scale3d(0.1,0.1,0.1) translate3d(0,1000px,0);-webkit-animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}60%{opacity:1;-webkit-transform:scale3d(0.475,0.475,0.475) translate3d(0,-60px,0);transform:scale3d(0.475,0.475,0.475) translate3d(0,-60px,0);-webkit-animation-timing-function:cubic-bezier(0.175,0.885,0.32,1);animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}.zoomInUp{-webkit-animation-name:zoomInUp;animation-name:zoomInUp}@-webkit-keyframes zoomOut{from{opacity:1}50%{opacity:0;-webkit-transform:scale3d(0.3,0.3,0.3);transform:scale3d(0.3,0.3,0.3)}to{opacity:0}}@keyframes zoomOut{from{opacity:1}50%{opacity:0;-webkit-transform:scale3d(0.3,0.3,0.3);transform:scale3d(0.3,0.3,0.3)}to{opacity:0}}.zoomOut{-webkit-animation-name:zoomOut;animation-name:zoomOut}@-webkit-keyframes zoomOutDown{40%{opacity:1;-webkit-transform:scale3d(0.475,0.475,0.475) translate3d(0,-60px,0);transform:scale3d(0.475,0.475,0.475) translate3d(0,-60px,0);-webkit-animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}to{opacity:0;-webkit-transform:scale3d(0.1,0.1,0.1) translate3d(0,2000px,0);transform:scale3d(0.1,0.1,0.1) translate3d(0,2000px,0);-webkit-transform-origin:center bottom;transform-origin:center bottom;-webkit-animation-timing-function:cubic-bezier(0.175,0.885,0.32,1);animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}@keyframes zoomOutDown{40%{opacity:1;-webkit-transform:scale3d(0.475,0.475,0.475) translate3d(0,-60px,0);transform:scale3d(0.475,0.475,0.475) translate3d(0,-60px,0);-webkit-animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}to{opacity:0;-webkit-transform:scale3d(0.1,0.1,0.1) translate3d(0,2000px,0);transform:scale3d(0.1,0.1,0.1) translate3d(0,2000px,0);-webkit-transform-origin:center bottom;transform-origin:center bottom;-webkit-animation-timing-function:cubic-bezier(0.175,0.885,0.32,1);animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}.zoomOutDown{-webkit-animation-name:zoomOutDown;animation-name:zoomOutDown}@-webkit-keyframes zoomOutLeft{40%{opacity:1;-webkit-transform:scale3d(0.475,0.475,0.475) translate3d(42px,0,0);transform:scale3d(0.475,0.475,0.475) translate3d(42px,0,0)}to{opacity:0;-webkit-transform:scale(0.1) translate3d(-2000px,0,0);transform:scale(0.1) translate3d(-2000px,0,0);-webkit-transform-origin:left center;transform-origin:left center}}@keyframes zoomOutLeft{40%{opacity:1;-webkit-transform:scale3d(0.475,0.475,0.475) translate3d(42px,0,0);transform:scale3d(0.475,0.475,0.475) translate3d(42px,0,0)}to{opacity:0;-webkit-transform:scale(0.1) translate3d(-2000px,0,0);transform:scale(0.1) translate3d(-2000px,0,0);-webkit-transform-origin:left center;transform-origin:left center}}.zoomOutLeft{-webkit-animation-name:zoomOutLeft;animation-name:zoomOutLeft}@-webkit-keyframes zoomOutRight{40%{opacity:1;-webkit-transform:scale3d(0.475,0.475,0.475) translate3d(-42px,0,0);transform:scale3d(0.475,0.475,0.475) translate3d(-42px,0,0)}to{opacity:0;-webkit-transform:scale(0.1) translate3d(2000px,0,0);transform:scale(0.1) translate3d(2000px,0,0);-webkit-transform-origin:right center;transform-origin:right center}}@keyframes zoomOutRight{40%{opacity:1;-webkit-transform:scale3d(0.475,0.475,0.475) translate3d(-42px,0,0);transform:scale3d(0.475,0.475,0.475) translate3d(-42px,0,0)}to{opacity:0;-webkit-transform:scale(0.1) translate3d(2000px,0,0);transform:scale(0.1) translate3d(2000px,0,0);-webkit-transform-origin:right center;transform-origin:right center}}.zoomOutRight{-webkit-animation-name:zoomOutRight;animation-name:zoomOutRight}@-webkit-keyframes zoomOutUp{40%{opacity:1;-webkit-transform:scale3d(0.475,0.475,0.475) translate3d(0,60px,0);transform:scale3d(0.475,0.475,0.475) translate3d(0,60px,0);-webkit-animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}to{opacity:0;-webkit-transform:scale3d(0.1,0.1,0.1) translate3d(0,-2000px,0);transform:scale3d(0.1,0.1,0.1) translate3d(0,-2000px,0);-webkit-transform-origin:center bottom;transform-origin:center bottom;-webkit-animation-timing-function:cubic-bezier(0.175,0.885,0.32,1);animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}@keyframes zoomOutUp{40%{opacity:1;-webkit-transform:scale3d(0.475,0.475,0.475) translate3d(0,60px,0);transform:scale3d(0.475,0.475,0.475) translate3d(0,60px,0);-webkit-animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19);animation-timing-function:cubic-bezier(0.55,0.055,0.675,0.19)}to{opacity:0;-webkit-transform:scale3d(0.1,0.1,0.1) translate3d(0,-2000px,0);transform:scale3d(0.1,0.1,0.1) translate3d(0,-2000px,0);-webkit-transform-origin:center bottom;transform-origin:center bottom;-webkit-animation-timing-function:cubic-bezier(0.175,0.885,0.32,1);animation-timing-function:cubic-bezier(0.175,0.885,0.32,1)}}.zoomOutUp{-webkit-animation-name:zoomOutUp;animation-name:zoomOutUp}@-webkit-keyframes slideInDown{from{-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0);visibility:visible}to{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}@keyframes slideInDown{from{-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0);visibility:visible}to{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}.slideInDown{-webkit-animation-name:slideInDown;animation-name:slideInDown}@-webkit-keyframes slideInLeft{from{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0);visibility:visible}to{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}@keyframes slideInLeft{from{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0);visibility:visible}to{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}.slideInLeft{-webkit-animation-name:slideInLeft;animation-name:slideInLeft}@-webkit-keyframes slideInRight{from{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0);visibility:visible}to{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}@keyframes slideInRight{from{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0);visibility:visible}to{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}.slideInRight{-webkit-animation-name:slideInRight;animation-name:slideInRight}@-webkit-keyframes slideInUp{from{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);visibility:visible}to{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}@keyframes slideInUp{from{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);visibility:visible}to{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}.slideInUp{-webkit-animation-name:slideInUp;animation-name:slideInUp}@-webkit-keyframes slideOutDown{from{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}to{visibility:hidden;-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}}@keyframes slideOutDown{from{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}to{visibility:hidden;-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}}.slideOutDown{-webkit-animation-name:slideOutDown;animation-name:slideOutDown}@-webkit-keyframes slideOutLeft{from{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}to{visibility:hidden;-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}}@keyframes slideOutLeft{from{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}to{visibility:hidden;-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}}.slideOutLeft{-webkit-animation-name:slideOutLeft;animation-name:slideOutLeft}@-webkit-keyframes slideOutRight{from{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}to{visibility:hidden;-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}}@keyframes slideOutRight{from{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}to{visibility:hidden;-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}}.slideOutRight{-webkit-animation-name:slideOutRight;animation-name:slideOutRight}@-webkit-keyframes slideOutUp{from{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}to{visibility:hidden;-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}}@keyframes slideOutUp{from{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}to{visibility:hidden;-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}}.slideOutUp{-webkit-animation-name:slideOutUp;animation-name:slideOutUp}');
})(typeof (window) != 'undefined' ? this : global, '');