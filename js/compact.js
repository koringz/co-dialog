var codialog = new codialog();

codialog
.app('.compact')
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
    onHeaderBefore: function (nodes) {
        $(nodes).html('<div ref="headText"> 123 </div>');
    },
    methods: function () {
        this.$header.$refs.headText.style.color = '#FB862E'
        this.$header.$refs.headText.style.fontSize = '30px'

        this.$footer.$refs.button.children[0].innerHTML = '确定';
        this.$footer.$refs.button.children[1].innerHTML = '知道了';
        this.$body.$refs.message.style.color = "#333";
        this.$body.$refs.message.style.paddingTop = "29px";
        this.$footer.$refs.button.children[0].style.color =
        this.$footer.$refs.button.children[1].style.color = '#fff';
        this.$footer.$refs.button.children[0].style.paddingLeft = 
        this.$footer.$refs.button.children[0].style.paddingRight =
        this.$footer.$refs.button.children[1].style.paddingLeft = 
        this.$footer.$refs.button.children[1].style.paddingRight = '30px'; // this.$footer.$refs.text
        this.$footer.$refs.button.children[0].style.backgroundColor =
        this.$footer.$refs.button.children[1].style.backgroundColor = '#FB862E';
        this.$footer.$refs.button.children[1].style.marginLeft = '20px';
    }
});

$('.showme').on('click',function () {
    codialog
    .app('.compact')
    .show()
    .$methods(function () {
        this.$header.$refs.headText.innerHTML = '简洁版';
        this.$body.$refs.message.innerHTML = '测试调用$methods方法';
        this.$footer.$refs.button.children[0].innerHTML = '删除 onclick';
        this.$footer.$refs.button.children[1].innerHTML = '提交 onclick';
    })
    .hide({timeout:3000});
});