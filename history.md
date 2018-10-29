
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