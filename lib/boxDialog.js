 var boxdialog = function (options) {
    this.dialogNodes = [];
    this.dialogElement = options || null;
    this.strict = {
        header:'.dialog-header',
        body:'.dialog-middle-container',
        footer:'.dialog-footer',
    };
}

boxdialog.prototype.list = function (options) {
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
onHeader这是一个方法
onHeader: function (node_header) {
    var header = $(node_header)
    header.append()
}
*/

boxdialog.prototype.default = function (obj, success_config) {
    $('body').append(this.viewDialog())

    if (Object.prototype.toString.call(obj) == '[object Object]') {
        // 按钮的数量
        // attr = [buttonGroup]
        if (typeof obj.footerButtonCount != 'undefined' && !isNaN(obj.footerButtonCount)) {
            var count = obj.footerButtonCount;
            var inx = $(this.dialogElement).find(this.strict.footer).find('[buttonGroup]').find('button');
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

        // 底部没有按钮
        // 底部显示的是倒计时
        // 或者是其他信息
        // attr = [textGroup]
        if (Object.prototype.toString.call(obj.footerText) == '[object Array]') {
            if (obj.footerText.length > 0) {
                $(this.dialogElement).find(this.strict.footer).find('[textGroup]').html(obj.footerText.concat().join(''))
            }
        }


        if (typeof obj.onDialogBefore == 'function'
            || typeof obj.onHeaderBefore == 'function'
            || typeof obj.onBodyBefore == 'function'
            || typeof obj.onFooterBefore == 'function') {

            if(obj.onDialogBefore) obj.onDialogBefore($(this.dialogElement));
            if(obj.onHeaderBefore) obj.onHeaderBefore($(this.dialogElement).find(this.strict.header));
            if(obj.onBodyBefore) obj.onBodyBefore($(this.dialogElement).find(this.strict.body));
            if(obj.onFooterBefore) obj.onFooterBefore($(this.dialogElement).find(this.strict.footer));
        }

        // 所有子节点都会被获取 进行修改
        // 但是都在before执行之后才执行methods
        if (typeof obj['methods'] == 'function') {
            obj.methods(this.dialogElement);
        }

        if (typeof obj.title == 'string' && obj.title) {
            this.header(obj.title);
        }
        else if(typeof obj.title != 'undefined' && typeof obj.onHeader == 'function'){
            var takeHeaderNodes = $(this.dialogElement).find(this.strict.header);
            this.onHeader(takeHeaderNodes);
        }

        if (typeof obj.message == 'string' && obj.message) {
            $(this.dialogElement).find(this.strict.body + ' .dialog-message-text').html(obj.message);
        }


        // ****** 设置边距 ******
        // 如果是数字
        // 设置上下左右相同的值
        /*
        if (typeof obj.headerMargin != 'undefined' && !isNaN(obj.headerMargin)) {
            $(this.dialogElement).find(this.strict.header).css({'padding' : obj.headerMargin });
        }
        // 否则如果是对象的情况下
        // 就会传入 水平和垂直属性的值
        // 有二种情况
        // 其一是全部是数字
        // 其二是全部使用px字符串
        else if(Object.prototype.toString.call(obj.headerMargin) == '[object Object]') {
            var getMargin;
            if(typeof obj.headerMargin.horizontal != 'undefined'
            && typeof obj.headerMargin.vertical != 'undefined'
            && !isNaN(obj.headerMargin.horizontal)
            && !isNaN(obj.headerMargin.vertical)) {
                getMargin = obj.headerMargin.vertical +'px ' +　obj.headerMargin.horizontal +'px';
            }
            else if (obj.headerMargin.horizontal.indexOf('px') || obj.headerMargin.vertical.indexOf('px')) {
                var Empty = new Array();
                var px = obj.headerMargin.horizontal.split(' ');
                var h1 = px[0] || 0;
                var h2 = px[1] || 0;
                var px = obj.headerMargin.vertical.split(' ');
                var v1 = px[0] || 0;
                var v2 = px[1] || 0;
                Empty.push.call(Empty, v1, h2, v2, h1)
                getMargin = Empty.join(' ');
            }
            $(this.dialogElement).find(this.strict.header).css({'padding' : getMargin });
        }
        */
        this.generateMargin(obj,'header', 'headerMargin', 'padding');
        // body
        this.generateMargin(obj,'body', 'bodyMargin', null);
        // footer
        this.generateMargin(obj,'footer', 'footerMargin', 'padding');


        // 盒子的宽度
        // 垂直和水平居中
        if (typeof obj.boxdialogWidth != 'undefined' && !isNaN(obj.boxdialogWidth)) {
            var box = $(this.dialogElement).find('.boxdialog-dialog-frame');
            var val = obj.boxdialogWidth;
            box.css({'width' : val,'margin-left': - val/2});
            var getHeight = box.height();
            box.css({'margin-top': -getHeight/2});
        }

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

        if (typeof obj.onDialogAfter == 'function'
            || typeof obj.onHeaderAfter == 'function'
            || typeof obj.onBodyAfter == 'function'
            || typeof obj.onFooterAfter == 'function') {

            if(obj.onDialogAfter) obj.onDialogAfter($(this.dialogElement));
            if(obj.onHeaderAfter) obj.onHeaderAfter($(this.dialogElement).find(this.strict.header));
            if(obj.onBodyAfter) obj.onBodyAfter($(this.dialogElement).find(this.strict.body));
            if(obj.onFooterAfter) obj.onFooterAfter($(this.dialogElement).find(this.strict.footer));
        }

    }

}

boxdialog.prototype.success = boxdialog.prototype.default;

/*
我需要在dialog body里面加载其他元素, 比如图片的失效 和 其他图片icon信息
或者添加一条新的节点信息
*/
boxdialog.prototype.onDialogBefore = function (opt) {

}
boxdialog.prototype.onDialogAfter = function (opt) {

}
boxdialog.prototype.onDialog = function (opt) {
    this.onDialogBefore()
    this.onDialogAfter()
}
boxdialog.prototype.onHeaderBefore = function (opt) {

}
boxdialog.prototype.onHeaderAfter = function (opt) {

}
boxdialog.prototype.onHeader = function (opt) {
    this.onHeaderBefore()
    this.onHeaderAfter()
}
boxdialog.prototype.onBodyBefore = function (opt) {

}
boxdialog.prototype.onBodyAfter = function (opt) {

}
boxdialog.prototype.onBody = function (opt) {
    this.onBodyBefore()
    this.onBodyAfter()
}
boxdialog.prototype.onFooterBefore = function (opt) {

}
boxdialog.prototype.onFooterAfter = function (opt) {

}
/*
如果是字符串
直接填充到默认的title属性的元素上

否则
调用onheader函数
外部操作header节点添加新的节点元素
替换原来的oldheader节点
*/
boxdialog.prototype.header = function (title_string) {
    // 这是一个headr节点 表示要插入外部节点
    $(this.strict.header).find('[title]').text(title_string)

    this.onFooterBefore()
    this.onFooterAfter()
}

boxdialog.prototype.generateMargin = function (obj, currentNode, custom_margin, margin) {
    var parse = new Object();
    margin = margin || 'margin';
    if (typeof obj[custom_margin] != 'undefined' && !isNaN(obj[custom_margin])) {
        parse[margin] = obj[custom_margin];
        $(this.dialogElement).find(this.strict[currentNode]).css(parse);
    }
    else if(Object.prototype.toString.call(obj[custom_margin]) == '[object Object]') {
        var getMargin_body;
        if( typeof obj[custom_margin].horizontal != 'undefined'
            && typeof obj[custom_margin].vertical != 'undefined'
            && !isNaN(obj[custom_margin].horizontal)
            && !isNaN(obj[custom_margin].vertical)) {
            getMargin_body = obj[custom_margin].horizontal +'px ' +　obj[custom_margin].vertical +'px';
        }
        else if (obj[custom_margin].horizontal.indexOf('px') || obj[custom_margin].vertical.indexOf('px')) {
            var Empty = new Array();
            var px = obj[custom_margin].horizontal.split(' ');
            var h1 = px[0] || 0;
            var h2 = px[1] || 0;
            var px = obj[custom_margin].vertical.split(' ');
            var v1 = px[0] || 0;
            var v2 = px[1] || 0;
            Empty.push.call(Empty, v1, h2, v2, h1)
            getMargin_body = Empty.join(' ');
        }
        parse[margin] = getMargin_body;
        $(this.dialogElement).find(this.strict[currentNode]).css(parse);
    }
}


boxdialog.prototype.viewDialog = function  () {
    var str = '';

    str += '<div class="skydialog">'
    str += '<div class="boxdialog-dialog-shadow">'
    str += '<div class="boxdialog-dialog-frame">'
    str += '<div class="boxdialog-dialog-box">'
    str += '<div class="boxdialog-dialog-fixedDialog">'
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
    str += '<span message="">你确定要删除吗?</span>'
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
成功的设置

分为设置标题的部分内容
还有就是设置标题的node节点
设置标题节点就会替换

替换的方式可以使用引入外部标题的节点
使用onDialogHeader：'.otherHeader'
默认jq selector

*/


/*
中间内容存在如下节点：

成功的节点元素class：dialog-message-success
失败的节点元素class：dialog-message-fail
填充内容的节点元素class：dialog-message-text
*/
boxdialog.prototype.fail = function () {
    $(this.dialogElement).find('.fail').html('<img src="./img/xieyi/shibai.png" width="" alt="">')
}


