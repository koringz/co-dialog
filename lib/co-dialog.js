(function  (twg,$,coani) {

// 每一个功能的使用说明
 var codialog = function (options) {
    // 使用codialog弹出框的节点元素列表
    this.didDialogList = [];
    // dialog节点元素
    this.dialogElement = options || null;
    // dialog节点子元素结构
    this.strict = {
        header:'.dialog-header',
        body:'.dialog-middle-container',
        footer:'.dialog-footer',
    };
    //暂存dialog节点元素
    this.cacheDialogElement = [];
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
    var _this = this;
    var nodes = null;

    function changedAppElementAttribute (options) {
        var nodes = null;
        if (typeof options == 'string') {
            if (options.match(/^(\.|\#)/)) {
                if (options.charAt(0) == '.') {
                    nodes = 'class="' + options.slice(1) + '"';
                }
                if (options.charAt(0) == '#') {
                    nodes = 'id="' + options.slice(1) + '"';
                }
            } 
            else {
                nodes = options;
            }

            $('body').append(_this.viewDialogSemantics(nodes));
        }
        else {
            return null;
        }
    }

    if (this.cacheDialogElement.indexOf(params)+1) {
        this.dialogElement = params;
    }
    else {
        if (typeof params == 'undefined' ) {
            nodes = typeof params;
        }
        else if (typeof params == 'string'){
            nodes = params;
            if (params.search(/^(\.|\#)/)+1) {
                changedAppElementAttribute(nodes);
            }
            else {
                $('body').find(this.dialogElement).attr(nodes,'');
            }
            appDialog.call(this, nodes);

            this.cacheDialogElement.push(params);
            return this;
        }
    }

    return this
}

var appDialog = function  (options) {
    this.didDialogList = [];
    this.dialogElement = options || null;
    this.strict = {
        header:'.dialog-header',
        body:'.dialog-middle-container',
        footer:'.dialog-footer',
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
** **/
codialog.prototype.hide = function (options) {
    if(typeof options == 'string') {
        if (this.cacheDialogElement.indexOf(options)+1) {
            $(options).hide();
        }
    }
    else {
        $(this.dialogElement).hide();
    }
    return this;
}


/** **
## 显示元素
> 原理同上
** **/
codialog.prototype.show = function (options) {
    if(typeof options == 'string') {
        if (this.cacheDialogElement.indexOf(options)+1) {
            $(options).show();
        }
    }
    else {
        $(this.dialogElement).show();
    }
    return this;
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
                $(this.dialogElement).find(this.strict.footer).find('[textGroup]').html(obj.footerText.concat().join(''));
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
            $(this.dialogElement).find(this.strict.body + ' .dialog-message-text').html(obj.message);
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
        this.generateMargin(obj,'header', 'headerMargin', 'padding');
        // body
        this.generateMargin(obj,'body', 'bodyMargin', null);
        // footer
        this.generateMargin(obj,'footer', 'footerMargin', 'padding');

        // 是否关闭dialog
        // 默认开启dialog关闭
        // default: true
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

        // 弹出框固定宽度
        this.lockDialogWidth(obj);
        // 弹出框固定高度
        this.lockDialogHeight(obj);

        // 自适应高度
        this.adaptDialogHeight(obj);
        // 自适应宽度
        this.adaptDialogWidth(obj);

        // 水平居中
        this.positionHorizontal(obj);
        // 垂直居中
        this.positionVertical(obj);
    }

    return this
}

codialog.prototype.lockDialogWidth = function  (obj) {
    if (!obj.adaptDialogWidth) {
        if (!isNaN(obj.dialogWidth)) {
            $(this.dialogElement).find('[dialog]').css({'width':obj.dialogWidth});
        }
    }
    return null;
}

codialog.prototype.lockDialogHeight = function  (obj) {
    if (!obj.adaptDialogHeight) {
        if (!isNaN(obj.dialogHeight)) {
            $(this.dialogElement).find('[dialog]').css({'height':obj.dialogHeight});
        }
    }
    return null;
}

codialog.prototype.adaptDialogHeight = function  (obj) {
    if (typeof obj.adaptDialogHeight == 'boolean') {
        if (obj.adaptDialogHeight) {
            $(this.dialogElement).find('[dialog]').css({"height":"inherit"});
        }
    }
    else return null;
}

codialog.prototype.adaptDialogWidth = function  (obj) {
    if (typeof obj.adaptDialogWidth == 'boolean') {
        if (obj.adaptDialogWidth) {
            $(this.dialogElement).find('[dialog]').css({"width":"inherit"});
        }
    }
    else return null;
}

codialog.prototype.positionHorizontal = function  (obj) {
    var box = $(this.dialogElement).find('[dialog]');
    var val = box.width();
    box.css({'margin-left': - val/2});
}

codialog.prototype.positionVertical = function  (obj) {
    var box = $(this.dialogElement).find('[dialog]');
    var getHeight = box.height();
    box.css({'margin-top': -getHeight/2});
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
codialog.prototype.header = function (title_string) {
}

codialog.prototype.generateMargin = function (obj, currentNode, custom_margin, margin) {
    var parse = new Object();
    margin = margin || 'margin';
    if (typeof obj[custom_margin] != 'undefined' && !isNaN(obj[custom_margin])) {
        parse[margin] = obj[custom_margin];
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
    }
    
    $(this.dialogElement).find(this.strict[currentNode]).css(parse);

    return this
}


codialog.prototype.viewDialogSemantics = function  (_root) {
    var str = '';

    str += '<div '+ _root +' >';
    str += '<div shadow class="codialog-dialog-shadow">';
    str += '<div dialog class="codialog-dialog-frame">';
    str += '<div class="codialog-dialog-box">';
    str += '<div class="codialog-dialog-fixedDialog">';
    str += '<div class="fixedDialog-styles">';
    str += '<div header class="styles-head dialog-header">';
    str += '<div class="head-info">';
    str += '<div class="head-title">';
    str += '<span title="">标题</span>';
    str += '</div>';
    str += '<div class="head-close">';
    str += '<span close class="addClose">x</span>';
    str += '</div>';
    str += '</div>';
    str += '</div>';
    str += '<div container class="styles-content dialog-middle-container">';
    str += '<div class="content-message">';
    str += '<div class="dialog-message-success"></div>';
    str += '<div class="dialog-message-fail"></div>';
    str += '<div class="message-text dialog-message-text">';
    str += '<span message>你确定要删除吗?</span>';
    str += '</div>';
    str += '</div>';
    str += '</div>';
    str += '<div footer class="styles-foot dialog-footer">';
    str += '<div class="foot-button foot-text">';
    str += '<div textGroup class="text-group"></div>';
    str += '<div buttonGroup class="button-group">';
    str += '<button type="button" close class="cancle group-btn">取消</button>';
    str += '<button type="button" class="primary group-btn">确定</button>';
    str += '</div>';
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

/*
中间内容存在如下节点：
成功的节点元素class：dialog-message-success
失败的节点元素class：dialog-message-fail
填充内容的节点元素class：dialog-message-text
*/
codialog.prototype.coani = coani;

twg['codialog'] = codialog;
}(this ? window : global, jQuery ? jQuery : $, typeof coani != 'undefined' ? coani : {}))
