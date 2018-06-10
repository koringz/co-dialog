var codialog = new codialog();

// 基础弹出框
codialog
.app('.base')
.use({
    dialogWidth: 585,
    dialogHeight: 258.93,
    title: '发送验证码111',
    message: '消息正在<b>努力</b>生产中...',
    headerMargin: { horizontal: '21px 21px', vertical: '19px 18px' },
    bodyMargin: { horizontal: '10px 10px', vertical: '40px 15px'  },
    footerMargin: { horizontal: '0', vertical: '20px 40px' },
    isClose: true,
    footerButtonCount: 1,
    onHeaderBefore: function (nodes) {
    },
    onBodyBefore: function (nodes) {
        $(nodes).css({'color':'#333'}).find('.dialog-message-text').css({'margin-top':29});
    },
    onFooterBefore: function (nodes) {
        $(nodes).css({'color':'#fc862e','font-size':14});
        $(nodes).find('button').css({'background-color':'#FB862E','color':'#fff','padding-left':'30px','padding-right':'30px'}).text('我知道了')
    },
    methods: function (nodes) {
        this.title = '发送验证码'
        this.message = '验证码已发送自手机<strong>12345678</strong>请注意查收！';
    },
})
.hide();


codialog.app('.base').show();
// or
// codialog.app('.base').show();