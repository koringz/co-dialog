
/*

classList

$

find

removeChild

getElementsByClassName

resetScroll

*/



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


        codialog.prototype.removeChild = function (child) {
            if(typeof child == 'undefined') return null;

            if (child.parentElement.removeChild) {
                return child.parentElement.removeChild(child)
            }
            return child.parentElement.removeNode(child)
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