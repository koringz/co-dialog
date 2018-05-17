var codialog = new codialog();

var lust = {};

codialog.list = [];

lust.dialogWidth = 491.90;
lust.dialogHeight = 301.90;
lust.title = '开通成功';
lust.message = '协议已开通，赶快充值吧！';
lust.headerMargin = { horizontal: '21px 21px', vertical: '19px 18px' },
lust.bodyMargin = { horizontal: '10px 10px', vertical: '40px 30px'  };
lust.footerMargin = { horizontal: '0', vertical: '0px 36px' };
// lust.isMask = false;
lust.message = true;
lust.footerButtonCount = 1;
lust.isGesture = true;
lust.isDrag = true;

// 开通成功
codialog
.app('.open-success')
.use(Object.assign(lust, {
    onHeaderBefore: function (nodes) {
        $(nodes).find('span').css('margin','0');
    },
    onBodyBefore: function (nodes) {
        $(nodes).css({'text-align':'center','color':'#333','font-size':16}).find('.dialog-message-text').css({'margin-top':29});
        $(nodes).find('.dialog-message-success').css({'height':46}).html('<img src="./img/sc.png" width="" alt="">');
    },
    onFooterBefore: function (nodes) {
        $(nodes).css({'text-align':'center','color':'#fc862e','font-size':14});
        $(nodes).find('button').css({'background-color':'#FB862E','color':'#fff','padding-left':'30px','padding-right':'30px'}).text('立即充值');
    },
    methods: function (nodes) {
        $(nodes).css({'text-align':'center','color':'#fc862e','font-size':14});

        /*$(nodes).on('click',function (e) {
            e.preventDefault();
            codialog.app('.open-success').hide();
            codialog.app('.send-validate-code').show({timeout: 1000});

            codialog.coani('.send-validate-code [dialog],.send-validate-code [shadow]').delay(10).flipOutY().stop();
            codialog.coani.render();
        })*/
    }
})
)
.hide()


// 发送验证码弹窗
.app('.send-validate-code')
.use({
    dialogWidth: 585,
    dialogHeight: 237.93,
    title: '发送验证码',
    message: '消息正在<b>努力</b>生产中...',
    headerMargin: { horizontal: '21px 21px', vertical: '19px 18px' },
    bodyMargin: { horizontal: '10px 10px', vertical: '40px 15px'  },
    footerMargin: { horizontal: '0', vertical: '20px 40px' },
    isClose: true,
    footerButtonCount: 1,
    onHeaderBefore: function (nodes) {
        $(nodes).find('span').css('margin','0');
    },
    onBodyBefore: function (nodes) {
        $(nodes).css({'text-align':'center','color':'#333','font-size':16}).find('.dialog-message-text').css({'margin-top':29});
    },
    onFooterBefore: function (nodes) {
        $(nodes).css({'text-align':'center','color':'#fc862e','font-size':14});
        $(nodes).find('button').css({'background-color':'#FB862E','color':'#fff','padding-left':'30px','padding-right':'30px'}).text('我知道了')
    },
    methods: function (nodes) {
        this.title = '发送验证码'
        // this.message = '验证码已发送自手机<strong>12345678</strong>请注意查收！';

        $(nodes).on('click',function  (e) {
            codialog.app('.send-validate-code').hide();

            codialog.coani('.open-fail [dialog]').delay(50).zoomIn(function () {
                codialog.app('.open-fail').show({timeout: 2000});
            }).wobble().stop();
            codialog.coani('.open-fail [shadow]').delay(50).zoomIn().stop();
            codialog.coani.render();
       })
    },
})
.hide()


// 开通失败弹窗
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
        addimg.html('<img src="./img/sb.png" width="" alt="">'); // 填充成功的图片
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

codialog.coani('.open-success [dialog],.open-success [mask]').delay(500).zoomInRight(function (){
    codialog.app('.open-success').hide().show({timeout: 1000});
}).stop();

codialog.coani.render();
// codialog.show('.open-success');
// codialog.show('.send-validate-code');