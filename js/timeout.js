var codialog = new codialog();

// 基础弹出框
codialog
.app('.timeSelector')
.use({
    dialogWidth: 585,
    dialogHeight: 258.93,
    title: '立即充值',
    message: '消息正在<b>努力</b>生产中...',
    headerMargin: { horizontal: '21px 21px', vertical: '19px 18px' },
    bodyMargin: { horizontal: '10px 10px', vertical: '40px 15px'  },
    footerMargin: { horizontal: '0', vertical: '20px 40px' },
    isClose: true,
    footerButtonCount: 0,
    footerText: '倒计时<strong class="timeout">3</strong>秒',
    onBodyBefore: function (nodes) {
        $(nodes).css({'color':'#333'}).find('.dialog-message-text').css({'margin-top':29});
    },
    onFooterBefore: function (nodes) {
        $(nodes).css({'color':'#fc862e','font-size':14});
        $(nodes).find('button').css({'background-color':'#FB862E','color':'#fff','padding-left':'30px','padding-right':'30px'}).text('我知道了')
    },
    methods: function (nodes) {
        this.$body.$ref.message.style.color = "#333";
        this.$body.$ref.message.style.paddingTop = "29px";
        this.$header.$ref.title.style.color = 
        this.$header.$ref.close.style.color = '#FB862E';
    },
})
.hide();


$('.onceRecharge').on('click',function () {
    codialog
    .app('.timeSelector')
    .show()
    .hide({
        timeout: 3000, 
        callback: function (nodes) {
            for (var i = 0; i < 3; i++) {
                (function (i) {
                    setTimeout(function () {
                        $(nodes).find('.timeout').text(3-i);
                    },1000*i);
                })(i);
            }
        }
    })
})