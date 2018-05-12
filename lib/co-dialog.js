(function  (twg) {

// 每一个功能的使用说明
 var codialog = function (options) {
    this.dialogNodes = [];
    this.dialogElement = options || null;
    this.strict = {
        header:'.dialog-header',
        body:'.dialog-middle-container',
        footer:'.dialog-footer',
    };
    this.distDialog = [];
    this.currentDialog = [];
    this.app(null);
}

//使用绑定dialog根目录
codialog.prototype.app = function (params) {
    var _this = this;
    var nodes = null;

    if (this.distDialog.indexOf(params)+1) {
        this.dialogElement = params
    }
    else {

        if (typeof params == 'undefined' ) {
            nodes = typeof params;
        }
        else if (typeof params == 'string'){
            nodes = params;
            if (params.search(/^(\.|\#)/)+1) {
                changedAppElementAttribute(nodes)
            }
            else {
                $('body').find(this.dialogElement).attr(nodes,'');
            }
            appDialog.call(this, nodes);

            this.distDialog.push(params);
            return this;
        }

        if (Object.prototype.toString.call(params) == '[object Null]') {
            changedAppElementAttribute(this.dialogElement)
        }

        function changedAppElementAttribute(options) {
            var nodes = null;
            if (typeof options == 'string') {
                if (options.match(/^(\.|\#)/)) {
                    if (options.charAt(0) == '.') {
                        nodes = 'class="' + options.slice(1) + '"'
                    }
                    if (options.charAt(0) == '#') {
                        nodes = 'id="' + options.slice(1) + '"'
                    }
                } else {
                    nodes = options
                }
                _this.distDialog.push(options);
                $('body').append(_this.viewDialog(nodes))
            }
            else {
                return null;
            }
        }
    }
    return this
}

var appDialog = function  (options) {
    this.dialogNodes = [];
    this.dialogElement = options || null;
    this.strict = {
        header:'.dialog-header',
        body:'.dialog-middle-container',
        footer:'.dialog-footer',
    };
}

// 隐藏元素
codialog.prototype.hide = function (options) {
    if(typeof options == 'string') {
        if (this.distDialog.indexOf(options)+1) {
            $(options).hide();
        }
    }
    else {
        $(this.dialogElement).hide();
    }
    return this;
}

// 显示元素
codialog.prototype.show = function (options) {
    if(typeof options == 'string') {
        if (this.distDialog.indexOf(options)+1) {
            $(options).show();
        }
    }
    else {
        $(this.dialogElement).show();
    }
    return this;
}

codialog.prototype.list = function (options) {
    this.dialogNodes.push(options)
}

/*

定义新的标题的属性
标题的class类以'dialog-header'使用, 不可以改变
通过'dialog-header'找到头部节点
后面可以操作头部的节点 ( 添 删 查 改)

那么外部插入header的信息可以有二种
其一为title, 意味着只能传入字符串
默认添加进去
title: '这是一个标题'

传入的节点具有使用的操作
onHeader: 'aside selector'
onHeader: function ('dialog-header') {
    var header = $('dialog-header')
    header.append($('aside selector'))
}
*/

codialog.prototype.use = function (obj, success_config) {

    if (Object.prototype.toString.call(obj) == '[object Object]') {
        // 按钮的数量
        // attr = [buttonGroup]
        if (typeof obj.footerButtonCount != 'undefined' && !isNaN(obj.footerButtonCount)) {
            var count = obj.footerButtonCount;
            if (1 == count) {
                $(this.dialogElement).find(this.strict.footer).find('[buttonGroup]').find('button')[count].remove();
            }
            else if(2 == count) {
                $(this.dialogElement).find(this.strict.footer).find('[buttonGroup]');
            }
            else {
                $(this.dialogElement).find(this.strict.footer).find('[buttonGroup]').remove();
            }
        }
        else {
            $(this.dialogElement).find(this.strict.footer).find('[buttonGroup]').remove();
        }

        // 底部有没有按钮
        // 底部显示的是倒计时或者是其他信息
        // attr = [textGroup]
        if (Object.prototype.toString.call(obj.footerText) == '[object Array]') {
            if (obj.footerText.length > 0) {
                $(this.dialogElement).find(this.strict.footer).find('[textGroup]').html(obj.footerText.concat().join(''))
            }
        }
        else {
            $(this.dialogElement).find(this.strict.footer).find('[textGroup]').remove();
        }


        // 在执行前处理节点属性设置
        if (obj.onDialogBefore
            || obj.onHeaderBefore
            || obj.onBodyBefore
            || obj.onFooterBefore) {

            if(typeof obj.onDialogBefore == 'function') obj.onDialogBefore($(this.dialogElement));
            if(typeof obj.onHeaderBefore == 'function') obj.onHeaderBefore($(this.dialogElement).find(this.strict.header));
            if(typeof obj.onBodyBefore == 'function') obj.onBodyBefore($(this.dialogElement).find(this.strict.body));
            if(typeof obj.onFooterBefore == 'function') obj.onFooterBefore($(this.dialogElement).find(this.strict.footer));
        }

        // 所有子节点都会被获取 进行修改
        // 但是都在before执行之后才执行methods
        if (typeof obj['methods'] == 'function') {
            obj.methods(this.dialogElement);
        }

        // 重置属性绑定
        // 改变默认的文本和节点数据

        if (typeof obj.title == 'string' && obj.title) {
            $(this.dialogElement).find(this.strict.header).find('[title]').text(obj.title);
        }
        else if (typeof obj.title != 'undefined' && typeof obj.onHeader == 'function') {
            $(this.dialogElement).find(this.strict.header).find('[title]').text(obj.title);
        }
        if (typeof obj.message == 'string' && obj.message) {
            $(this.dialogElement).find(this.strict.body + ' .dialog-message-text').html(obj.message)
        }

        /*
        * 设置边距 *
        如果是数字 设置上下左右相同的值
        if (typeof obj.headerMargin != 'undefined' && !isNaN(obj.headerMargin)) {
            $(this.dialogElement).find(this.strict.header).css({'padding' : obj.headerMargin });
        }
        否则如果是对象的情况下
        就会传入 水平 和 垂直属性的值
        有二种情况
        其一是全部是数字
        其二是全部使用px字符串
        */
        this.generateMargin(obj,'header', 'headerMargin', 'padding')
        // body
        .generateMargin(obj,'body', 'bodyMargin', null)
        // footer
        .generateMargin(obj,'footer', 'footerMargin', 'padding');

        // 是否可以关闭
        // 默认开启关闭dialog default true
        if (typeof obj.isClose != 'undefined' && typeof obj.isClose == 'boolean') {
            if (obj.isClose) {
                var dialogElement = $(this.dialogElement);
                dialogElement.find('[close]').on('click', function  (e) {
                    e.preventDefault();
                    dialogElement.hide();
                })
            }
            else null;
        }

        // 所有节点和函数都执行之后处理
        if (obj.onDialogAfter
            || obj.onHeaderAfter
            || obj.onBodyAfter
            || obj.onFooterAfter) {

            if(typeof obj.onDialogAfter == 'function') obj.onDialogAfter($(this.dialogElement));
            if(typeof obj.onHeaderAfter == 'function') obj.onHeaderAfter($(this.dialogElement).find(this.strict.header));
            if(typeof obj.onBodyAfter == 'function') obj.onBodyAfter($(this.dialogElement).find(this.strict.body));
            if(typeof obj.onFooterAfter == 'function') obj.onFooterAfter($(this.dialogElement).find(this.strict.footer));
        }



        // 盒子的宽度
        // 水平居中
        this.positionHorizontal(obj);
        // 垂直居中
        this.positionVertical(obj)
    }

    return this
}

codialog.prototype.positionHorizontal = function  (obj) {
    var box = $(this.dialogElement).find('.codialog-dialog-frame');
    var val = obj.dialogWidth;
    box.css({'width' : val,'margin-left': - val/2});
}

codialog.prototype.positionVertical = function  (obj) {
    var box = $(this.dialogElement).find('.codialog-dialog-frame');
    if (!isNaN(obj.dialogHeight)) {
        box.css({'height':obj.dialogHeight,'margin-top': -obj.dialogHeight/2});
    }
    else {
        var getHeight = box.height();
        box.css({'margin-top': -getHeight/2});
    }
}
/*
需要在dialog body里面加载其他元素, 比如图片的失效 和 其他图片icon信息
或者添加一条新的节点信息
*/
codialog.prototype.onDialogBefore = function (opt) {

}
codialog.prototype.onDialogAfter = function (opt) {

}
codialog.prototype.onDialog = function (opt) {
    this.onDialogBefore()
    this.onDialogAfter()
}
codialog.prototype.onHeaderBefore = function (opt) {

}
codialog.prototype.onHeaderAfter = function (opt) {

}
codialog.prototype.onHeader = function (opt) {
    this.onHeaderBefore()
    this.onHeaderAfter()
}
codialog.prototype.onBodyBefore = function (opt) {

}
codialog.prototype.onBodyAfter = function (opt) {

}
codialog.prototype.onBody = function (opt) {
    this.onBodyBefore()
    this.onBodyAfter()
}
codialog.prototype.onFooterBefore = function (opt) {

}
codialog.prototype.onFooterAfter = function (opt) {

}
/*
如果是字符串
直接填充到默认的title属性的元素上
否则 非字符串
调用onheader函数
外部操作header节点添加新的节点元素
替换原来的oldheader节点
*/
codialog.prototype.header = function (title_string) {
}

codialog.prototype.generateMargin = function (obj, currentNode, custom_margin, margin) {
    var parse = new Object();
    margin = margin || 'margin';
    if (typeof obj[custom_margin] != 'undefined' && !isNaN(obj[custom_margin])) {
        parse[margin] = obj[custom_margin];
        $(this.dialogElement).find(this.strict[currentNode]).css(parse);
    }
    else if(Object.prototype.toString.call(obj[custom_margin]) == '[object Object]') {
        var getMargin;
        if( typeof obj[custom_margin].horizontal != 'undefined'
            && typeof obj[custom_margin].vertical != 'undefined'
            && !isNaN(obj[custom_margin].horizontal)
            && !isNaN(obj[custom_margin].vertical)) {
            getMargin = obj[custom_margin].horizontal +'px ' +　obj[custom_margin].vertical +'px';
        }
        else if (obj[custom_margin].horizontal.indexOf('px') || obj[custom_margin].vertical.indexOf('px')) {
            var Empty = new Array();
            var px = obj[custom_margin].horizontal.split(' ');
            var h1 = px[0] || 0;
            var h2 = px[1] || 0;
            var px = obj[custom_margin].vertical.split(' ');
            var v1 = px[0] || 0;
            var v2 = px[1] || 0;
            Empty.push.call(Empty, v1, h2, v2, h1);
            getMargin = Empty.join(' ');
        }
        parse[margin] = getMargin;
        $(this.dialogElement).find(this.strict[currentNode]).css(parse);
    }

    return this
}


codialog.prototype.viewDialog = function  (_root) {
    var str = '';

    str += '<div '+ _root +' >'
    str += '<div shadow class="codialog-dialog-shadow">'
    str += '<div dialog class="codialog-dialog-frame">'
    str += '<div class="codialog-dialog-box">'
    str += '<div class="codialog-dialog-fixedDialog">'
    str += '<div class="fixedDialog-styles">'
    str += '<div header class="styles-head dialog-header">'
    str += '<div class="head-info">'
    str += '<div class="head-title">'
    str += '<span title="">标题</span>'
    str += '</div>'
    str += '<div class="head-close">'
    str += '<span close class="addClose">x</span>'
    str += '</div>'
    str += '</div>'
    str += '</div>'
    str += '<div container class="styles-content dialog-middle-container">'
    str += '<div class="content-message">'
    str += '<div class="dialog-message-success"></div>'
    str += '<div class="dialog-message-fail"></div>'
    str += '<div class="message-text dialog-message-text">'
    str += '<span message>你确定要删除吗?</span>'
    str += '</div>'
    str += '</div>'
    str += '</div>'
    str += '<div footer class="styles-foot dialog-footer">'
    str += '<div class="foot-button foot-text">'
    str += '<div textGroup class="text-group"></div>'
    str += '<div buttonGroup class="button-group">'
    str += '<button type="button" close class="cancle group-btn">取消</button>'
    str += '<button type="button" class="primary group-btn">确定</button>'
    str += '</div>'
    str +='</div>'
    str +='</div>'
    str +='</div>'
    str +='</div>'
    str +='</div>'
    str +='</div>'
    str +='</div>'
    str +='</div>'

    return str
}

/*
中间内容存在如下节点：
成功的节点元素class：dialog-message-success
失败的节点元素class：dialog-message-fail
填充内容的节点元素class：dialog-message-text
*/
if (typeof coani != 'undefined') codialog.prototype.coani = coani;

twg['codialog'] = codialog;
}(this ? window : global))