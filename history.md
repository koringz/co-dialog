
(v2.0.9) <Date:2018/11/13>
 - bug 修复
 - README.md文件'版本改变'日志移入history.md文件里 添加'##浏览器兼容'
 - dialogTemplate.js文件方法替换用es6字符串模版
 - appContext.js文件修改'dialogTemplate()'为'dialogTemplate.replace(/(^|\n)\s*/g,'')'

(v2.0.2) <Date:2018/10/27>
 - 升级为 es6 版本
 - 在你的 node_module 导入即可调用`co-dialog`插件

(v2.0.1) <Date:2018/10/21>
 - 优化压缩 co-dialog.js 代码
 - 修复PC 和 移动端自适应
 - 修复弹出框显示浏览器边框隐藏内容错位
 - 添加 onResize 默认为 true
 - 添加 type 不同类型显示弹出框 ['success', 'error', 'warning', 'info', 'question']

(v2.0.0) <Date:2018/09/12>
 - 优化isDrag拖动事件，拖动效果将会更加地平滑。
 - 添加showCloseButton属性，是否关闭按钮的布尔值(true / false)。
 - 添加layout属性，设置弹出框显示的位置，默认居中显示弹出框。
 - 添加animatin动画属性。
 - 优化isGesture抓特效功能。
 - 优化innerHTML避免绑定事件失效。
 - 优化多个弹出框点击事件失效。
 - 清除isOverflow功能。
 - 清除footerButtonCount功能。
 - 添加timeout超时功能。
 - 添加titleColor标题颜色。
 - 添加closeColor关闭颜色。
 - 添加messageColor内容颜色。
 - methods方法内部书写格式，以前this.$header.$refs；如今为this.header.$refs。
 - 添加confirmCallback确认回调函数和cancleCallback取消回调函数。

(v1.7.4)
 - 优化$tip方法，提示信息功能兼容IE8以上浏览器。

(v1.7.3)

 - 优化$tip方法，当页面滚动时精确定位，以及上下左右的显示位置居中，添加鼠标悬停和鼠标划出的回调方法（mouseover/mouseout）。

(v1.7.2)

 - 添加$tip方法，继承了use内部的tip对象的原理

(v1.7.1)

 - 优化配置项tip，自动添加绑定事件

 - 添加tip信息时，设置.hide方法必须在use()后面追加才能正确实现

(v1.7)[参考](https://github.com/koringz/co-dialog/tree/v1.7)

 - 优化清除定时器功能（如设定倒计时）

 - 添加跟随元素定位提示框


(v1.6)[参考](https://github.com/koringz/co-dialog/tree/v1.6)

 - 优化.show().hide({timeout: 3000,callback: function})与.show({timeout: 3000,callback: function})，表示处理超时的倒计时或其他节点信息。

 - 添加一个新的方法$methods，继承use内部的methods方法的原理。

 - 添加节点信息全部交给onHeaderBefore/onBodyBefore/onFooterBefore处理。

 - 通过设置ref="name"实现节点的获取，比如this.$header.$refs.name就是获取头部的节点，具体看简洁版。


(v1.4)[参考](https://github.com/koringz/co-dialog/tree/v1.4)

 - 使用timeout设置超时自动隐藏元素.show().hide({timeout: 3000})和超时自动显示元素hide().show({timeout: 3000}), 分别代表3s之后隐藏和3s之后显示

 - 是否使用遮罩层 isMask默认为true使用遮罩层，否则同理

 - 添加了抓手特效 isGesture 默认为false不展示抓手功能，否则同理

 - 可拖动弹出框 默认为false不可拖动dialog, 否则同理

 - 内容溢出滚动效果 默认y轴滚动效果 直接设置isOverflow为true即可 如果想要x统一滚动 请使用对象的方式 {properties: {x:true, y: true}}

(v1.1)[参考](https://github.com/koringz/co-dialog/tree/v1.0)

 - 添加弹出框自适应高度(adaptDialogHeight)和自适应宽度(adaptDialogWidth)

(v1.0)[参考](https://github.com/koringz/co-dialog/tree/v1.0)

-  修复默认垂直居中状态 [hide()隐藏要在use()后面执行, 禁止在methods方法里面设置高度和内/外边距, 尽量在(onHeaderBefore/onBodyBefore/onFooterBefore)方法当中给father or sub元素设置高和边距, 防止影响垂直居中]
-  CSS3动画效果已经引入 [渐变 淡入 淡出 贝塞尔]