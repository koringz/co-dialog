var codialog = new codialog();

// 开通失败弹窗
codialog
.app('.open-fail')
.use({
    dialogWidth: 500,
    dialogHeight: 309,
    title: '充值失败',
    message: '消息正在<b>努力</b>生产中...',
    headerMargin: { horizontal: '21px 21px', vertical: '19px 18px' },
    bodyMargin: { horizontal: '10px 10px', vertical: '40px 15px'  },
    footerMargin: { horizontal: '0', vertical: '0px 40px' },
    isClose: true,
    footerText: ['<strong>n</strong> ','秒','后自动关闭'],
    onHeaderBefore: function (nodes) {
        $(nodes).find('span').css('margin','0');
    },
    onBodyBefore: function (nodes) {
        $(nodes).css({'text-align':'center','color':'#333','font-size':16}).find('.dialog-message-text').css({'margin-top':29});
        var addimg = $(nodes).find('.dialog-message-success').css({'height':46});
        addimg.html('<img src="./../img/sb.png" width="" alt="">'); // 填充成功的图片
    },
    onFooterBefore: function (nodes) {
        $(nodes).css({'text-align':'center','color':'#fc862e','font-size':14});
    },
    methods: function (nodes) {
        this.message = '充值失败，请使用网银支付或联系在线客服';
       // $(nodes).find('.dialog-message-fail').html('<img src="./img/sa.png" width="" alt="">');
    },
})
.hide();

codialog.coani('.open-fail [dialog]').delay(50).zoomIn(function () {
    codialog.app('.open-fail').show({timeout: 2000});
}).wobble().stop();

codialog.coani.render();