var codialog = new codialog();

codialog
.app('.tips')
.use({
    adaptDialogWidth: true,
    adaptDialogHeight: true,
    tip: {
        bool: true,
        pos:'left',
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

.$tip({
    create: '.pop',
    pos:'bottom',
    follow: $('.showpop')[0],
    event: 'mouseover',
    message: '<span>C罗 葡萄牙</span><br><span>内马尔 1前锋</span>',
    callback: function (nodes) {
        nodes.find('[tipleft]').css('background-image','url(../img/tip/zuo.png)');
        nodes.find('[tipcenter]').css('background-image','url(../img/tip/zhong.png)');
        nodes.find('[tipright]').css('background-image','url(../img/tip/you.png)');
    },
    mouseover: function (nodes) {
        console.log(nodes)
    },
    mouseout: function (nodes) {
        console.log('mouseout')
    },
})

.$tip({
    create: '.test1',
    pos:'top',
    follow: $('.show-test1')[0],
    event: 'mouseover',
    message: '<span>C罗 葡萄牙</span><br><span>内马尔 1前锋</span>',
    callback: function (nodes) {
        nodes.find('[tipleft]').css('background-image','url(../img/tip/zuo.png)');
        nodes.find('[tipcenter]').css('background-image','url(../img/tip/zhong.png)');
        nodes.find('[tipright]').css('background-image','url(../img/tip/you.png)');
    },
    mouseover: function (nodes) {
        console.log(nodes)
    },
    mouseout: function (nodes) {
        console.log('mouseout')
    }
})

.$tip({
    create: '.test2',
    pos:'right',
    follow: $('.show-test2')[0],
    event: 'mouseover',
    message: '<span>C罗 葡萄牙</span><br><span>内马尔 1前锋</span>',
    callback: function (nodes) {
        nodes.find('[tipleft]').css('background-image','url(../img/tip/zuo.png)');
        nodes.find('[tipcenter]').css('background-image','url(../img/tip/zhong.png)');
        nodes.find('[tipright]').css('background-image','url(../img/tip/you.png)');
    }
});
