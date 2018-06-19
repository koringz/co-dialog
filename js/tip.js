var codialog = new codialog();

codialog
.app('.tips')
.hide()
.use({
    adaptDialogWidth: true,
    adaptDialogHeight: true,
    tip: {
        bool: true,
        follow: $('.showme')[0],
        event: 'mouseover',
        message: '<span>1231231233344</span><br>',
    }
})
.$methods(function(nodes) {
    nodes.find('[tipleft]').css('background-image','url(../img/tip/zuo.png)');
    nodes.find('[tipcenter]').css('background-image','url(../img/tip/zhong.png)');
    nodes.find('[tipright]').css('background-image','url(../img/tip/you.png)');
})

.app('.pop')
.hide()
.use({
    adaptDialogWidth: true,
    adaptDialogHeight: true,
    tip: {
        bool: true,
        follow: $('.showpop')[0],
        event: ['mouseover'],
        message: '<span>popop</span><br>',
    }

})
.$methods(function(nodes) {
    nodes.find('[tipleft]').css('background-image','url(../img/tip/zuo.png)');
    nodes.find('[tipcenter]').css('background-image','url(../img/tip/zhong.png)');
    nodes.find('[tipright]').css('background-image','url(../img/tip/you.png)');
});


$('.showpop')
.on('mouseover',function (ev) {
    ev.preventDefault();
    codialog.app('.pop').show();
})
.on('mouseout',function (ev) {
    ev.preventDefault();
    codialog.app('.pop').hide();
})
$('.showme')
.on('mouseover',function (ev) {
    ev.preventDefault();
    codialog.app('.tips').show();
})
.on('mouseout',function (ev) {
    ev.preventDefault();
    codialog.app('.tips').hide();
})