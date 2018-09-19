
/*

.app() 

.use() 

.show() 

.hide() 

*/



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

                    createDiv.innerHTML += codialogTemplate(nodes);
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



        var appDialog = function  (options) {
            this.didDialogList = [];
            this.dialogElement = options || null;
            this.strict = {
                header:'.dialog-header',
                body:'.dialog-body',
                footer:'.dialog-footer'
            };
        }

        codialog.prototype.list = function (options) {
            if (typeof options == 'string') {
                this.didDialogList.push(options);
            }
            return this.didDialogList;
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
