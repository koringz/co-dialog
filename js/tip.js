var codialog = new codialog();

codialog
.app('.tips')
.use({
    adaptDialogWidth: true,
    adaptDialogHeight: true,
    tip: {
        bool: true,
        follow: $('.showme')[0],
        event: 'mouseover',
        message: '<span>梅西 阿根廷 前锋</span><br>',
    }
})
.hide()
.$methods(function(nodes) {
    nodes.find('[tipleft]').css('background-image','url(../img/tip/zuo.png)');
    nodes.find('[tipcenter]').css('background-image','url(../img/tip/zhong.png)');
    nodes.find('[tipright]').css('background-image','url(../img/tip/you.png)');
})

.tip({
    create: '.pop',
    follow: $('.showpop')[0],
    event: 'mouseover',
    message: '<span>C罗 葡萄牙</span><br><span>内马尔 1前锋</span>',
    callback: function (nodes) {
        nodes.find('[tipleft]').css('background-image','url(../img/tip/zuo.png)');
        nodes.find('[tipcenter]').css('background-image','url(../img/tip/zhong.png)');
        nodes.find('[tipright]').css('background-image','url(../img/tip/you.png)');
    }
});

