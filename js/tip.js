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

.app('.pop')
.use({
    adaptDialogWidth: true,
    adaptDialogHeight: true,
    tip: {
        bool: true,
        follow: $('.showpop')[0],
        event: ['mouseover'],
        message: '<span>C罗 葡萄牙</span><br><span>内马尔 前锋</span>',
    }

})
.hide()
.$methods(function(nodes) {
    nodes.find('[tipleft]').css('background-image','url(../img/tip/zuo.png)');
    nodes.find('[tipcenter]').css('background-image','url(../img/tip/zhong.png)');
    nodes.find('[tipright]').css('background-image','url(../img/tip/you.png)');
});

