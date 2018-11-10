import { isStr, isObj, isFun, isNum, isExist, isFalse, isTrue, isArray, forEach, trim } from '../staticMethods.js'
import { addEventListener, preventDefault, removeEventListener, removeChild } from '../domMethods.js'
import { selfApi } from '../refs.js'

const dialogNodeNamePart = ['header','body','footer']

export const useOptions = function (...args) {
    const self = this
    const { obj, dialog,mask,header,body,footer,footerButtonGroup,currentDialogElement } = args[0]

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
                        dialog.style.left = `${dragCurrentDialog.x}px`;
                        dialog.style.top  = `${dragCurrentDialog.y}px`;
                    }
                };

                {
                    addEventListener(self.$(document), 'mousemove', mousemove);
                    addEventListener(self.$(document), 'mouseup', function (ev) {
                        removeEventListener( dialog.ownerDocument,'mouseover', mousemove);
                        ready = false;
                        preventDefault(ev);
                    });
                }

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
            content.textContent = obj.confirmButtonText;
            content.style.color = obj.confirmButtonColor;
            content.style.background = obj.confirmButtonBackground;
        }
        if((content = this.find(footerButtonGroup, '[cancle]')) && content) {
            content.textContent = obj.cancleButtonText;
            content.style.color = obj.cancleButtonColor;
            content.style.background = obj.cancleButtonBackground;
        }
        if ((content = this.find(header, '[close]')) && content) {
            content.style.color = obj.closeColor;
        }

        // 根据 type 不同显示弹出框
        // type:`success`, `error`, `warning`, `info`, `question`
        if(isStr(obj.type)) {
            var typeGroup = ['success', 'error', 'warning', 'info', 'question'];
            var types = obj.type.toLowerCase();
            switch(types) {
                case typeGroup[0]:
                    self.find(body, `.codialog-icon-${typeGroup[0]}`).style.display = 'flex';
                    break;
                case typeGroup[1]:
                    self.find(body, `.codialog-icon-${typeGroup[1]}`).style.display = 'flex';
                    break;
                case typeGroup[2]:
                    self.find(body, `.codialog-icon-${typeGroup[2]}`).style.display = 'flex';
                    break;
                case typeGroup[3]:
                    return self.find(body, `.codialog-icon-${typeGroup[3]}`).style.display = 'flex';
                case typeGroup[4]:
                    self.find(body, `.codialog-icon-${typeGroup[4]}`).style.display = 'flex'
                    break;
                default:
                    break;
            }
        }

        // 所有子节点都会被获取 进行修改
        // 但是都在before执行之后才执行methods
        if (isFun(obj['methods'])) {
            forEach(selfApi, (items, index) => {
                self[dialogNodeNamePart[index]] = self[items]({
                    children: self.rootDirectory[dialogNodeNamePart[index]]
                })
            });
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
                    var currentNode = close;
                    currentNode.onclick = function (e) {
                        if (self.setTimer) {
                            clearTimeout(self.setTimer);
                        }

                        self.hide();

                        // 确认按钮的回调函数
                        if(isStr(currentNode.getAttribute('confirm')) && isFun(obj.confirmCallback)) {
                            obj.confirmCallback();
                        }
                        // 取消按钮的回调函数
                        else if(isStr(currentNode.getAttribute('cancle')) && isFun(obj.cancleCallback)) {
                            obj.cancleCallback();
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
        if (isStr(obj.layout) && obj.layout.length) resize();

        if (isTrue(obj.onResize)) window.onresize = () => resize();

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
            // 过滤空字符串
            currentPostion = currentPostion.filter((items) => {
                return items.length
            });

            // 默认重心位置
            function layoutDefaultCenter () {
                dialog.style.left = `${getBraowserAxis.x - getTargetAxis.x}px`;
                dialog.style.top  = `${getBraowserAxis.y - getTargetAxis.y}px`;
            }

            // 只有一个位置
            if(currentPostion.length == 1) {
                currentPostion = trim(currentPostion[0]);
                switch (currentPostion) {
                    case 'center' :
                        layoutDefaultCenter();
                        break;
                    case 'left' :
                        dialog.style.left = `${ten}px`;
                        dialog.style.top  = `${getBraowserAxis.y - getTargetAxis.y}px`;
                        break;
                    case 'right' :
                        dialog.style.left = `${windowWidth - targetWidth - ten}px`;
                        dialog.style.top  = `${getBraowserAxis.y - getTargetAxis.y}px`;
                        break;
                    case 'top' :
                        dialog.style.left = `${getBraowserAxis.x - getTargetAxis.x}px`;
                        dialog.style.top  = `${ten}px`;
                        break;
                    case 'bottom' :
                        dialog.style.left = `${getBraowserAxis.x - getTargetAxis.x}px`;
                        dialog.style.top  = `${windowHeidth - targetHeight - ten}px`;
                        break;
                    default:
                        layoutDefaultCenter();
                        break;
                }
            }
            else if(currentPostion.length > 1) {
                var ten = 10;
                // 有二个位置
                currentPostion = currentPostion.join(' ');
                if(currentPostion == 'left top' || currentPostion == 'top left') {
                    dialog.style.left = `${ten}px`;
                    dialog.style.top  = `${ten}px`;
                }
                else if(currentPostion == 'left bottom' || currentPostion == 'bottom left') {
                    dialog.style.left  = `${ten}px`;
                    dialog.style.top   = `${windowHeidth - targetHeight - ten}px`;
                }
                else if(currentPostion == 'right top' || currentPostion == 'top right') {
                    dialog.style.left = `${windowWidth - targetWidth + ten}px`;
                    dialog.style.top  = `${ten}px`;
                }
                else if(currentPostion == 'right bottom' || currentPostion == 'bottom right') {
                    dialog.style.left = `${windowWidth - targetWidth}px`;
                    dialog.style.top  = `${windowHeidth - targetHeight - ten}px`;
                }
                else {
                    layoutDefaultCenter();
                }
            }
        }
    }
}