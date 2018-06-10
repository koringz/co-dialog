var codialog = new codialog();

codialog
.app('.validate')
.use({
    dialogWidth: 383.3,
    dialogHeight: 258.93,
    title: '验证',
    message: '已发送至你的手机...',
    headerMargin: { horizontal: '21px 21px', vertical: '19px 18px' },
    bodyMargin: { horizontal: '10px 10px', vertical: '40px 15px' },
    footerMargin: { horizontal: '0', vertical: '20px 40px' },
    isClose: true,
    footerButtonCount: 2,
    methods: function () {
        this.$footer.$ref.button.children[0].innerHTML = '删除';
        this.$footer.$ref.button.children[1].innerHTML = '提交';
        this.$body.$ref.message.style.color = "#333";
        this.$body.$ref.message.style.paddingTop = "29px";
        this.$footer.$ref.button.children[0].style.color =
        this.$footer.$ref.button.children[1].style.color = '#fff';
        this.$footer.$ref.button.children[0].style.paddingLeft = 
        this.$footer.$ref.button.children[0].style.paddingRight =
        this.$footer.$ref.button.children[1].style.paddingLeft = 
        this.$footer.$ref.button.children[1].style.paddingRight = '30px'; // this.$footer.$ref.text
        this.$header.$ref.title.style.color = 
        this.$header.$ref.close.style.color =
        this.$footer.$ref.button.children[0].style.backgroundColor =
        this.$footer.$ref.button.children[1].style.backgroundColor = '#FB862E';
        this.$footer.$ref.button.children[1].style.marginLeft = '20px';
    }
})
.app('.base')
.use({
    dialogWidth: 583.3,
    dialogHeight: 258.93,
    title: '简洁版',
    message: '消息生产中...',
    headerMargin: { horizontal: '21px 21px', vertical: '19px 18px' },
    bodyMargin: { horizontal: '10px 10px', vertical: '40px 15px' },
    footerMargin: { horizontal: '0', vertical: '20px 40px' },
    isClose: true,
    footerButtonCount: 2,
    methods: function () {
        this.$footer.$ref.button.children[0].innerHTML = '确定';
        this.$footer.$ref.button.children[1].innerHTML = '知道了';
        this.$body.$ref.message.style.color = "#333";
        this.$body.$ref.message.style.paddingTop = "29px";
        this.$footer.$ref.button.children[0].style.color =
        this.$footer.$ref.button.children[1].style.color = '#fff';
        this.$footer.$ref.button.children[0].style.paddingLeft = 
        this.$footer.$ref.button.children[0].style.paddingRight =
        this.$footer.$ref.button.children[1].style.paddingLeft = 
        this.$footer.$ref.button.children[1].style.paddingRight = '30px'; // this.$footer.$ref.text
        this.$header.$ref.title.style.color = 
        this.$header.$ref.close.style.color =
        this.$footer.$ref.button.children[0].style.backgroundColor =
        this.$footer.$ref.button.children[1].style.backgroundColor = '#FB862E';
        this.$footer.$ref.button.children[1].style.marginLeft = '20px';
    }
})
.hide();

$('.cacle').on('click',function () {
    codialog
    .app('.validate')
    .show()
    .$methods(function () {
        this.$body.$ref.message.innerHTML = '测试调用$methods方法'
        this.$footer.$ref.button.children[0].innerHTML = '删除1';
        this.$footer.$ref.button.children[1].innerHTML = '提交1';
    })
    .hide({timeout:3000});
});