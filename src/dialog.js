// 每一个功能的使用说明
var codialog = function (options) {
    // 目前codialog节点元素
    this.dialogElement = options || null;
    // 使用codialog组件名称
    this.name = ['codialog','coog','coDialog'];
    // codialog节点子元素结构
    this.strict = {
        header:'.dialog-header',
        body:'.dialog-body',
        footer:'.dialog-footer'
    };
    // 暂存codialog节点元素
    this.cacheDialogElement = [];
    // 使用codialog节点元素列表
    this.didDialogList = [];
    // 清除定时器
    this.setTimer = null;
    // 划出节点的定时器
    this.mouseoutcount = 0;
    // 根节点
    this.rootDirectory = {};
    // 关闭事件的返回值
    this.closeBackValue = false;
    // use 基础显示
    this.xString = [];
    // hasAnimation 验证动画
    this.hasAnimation = true;
    // 自定义动画 默认 bounceOut
    this.customAnimation = 'bounceOut'
}

