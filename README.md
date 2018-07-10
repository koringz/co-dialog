# co-dialog来源
[![License](https://img.shields.io/badge/License-MIT-green.svg)](./License.txt)
[![issues](https://img.shields.io/github/issues/koringz/co-dialog.svg)](https://github.com/koringz/co-dialog/issues)
[![releases](https://img.shields.io/badge/release-lastest-blue.svg)](https://github.com/koringz/co-dialog/releases/latest)
[![GitHub stars](https://img.shields.io/github/stars/koringz/co-dialog.svg?style=social)](https://github.com/koringz/co-dialog/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/koringz/co-dialog.svg?style=social)](https://github.com/koringz/co-dialog/network)

因为工作中用到dialog, 发现UI设计的弹出框的风格一直在变化，于是每次都要重新写一个弹出框，无意中增加了无用的工作量，所以果断就封装成一个弹出框组件，目前的锥形仅支持PC，然后又加入了CSS3动画效果，如果要引入动画效果就需要高版本的browser才能使用，期望你能一起加入参与改进！+1


## 演示效果
![co-dialog](http://images.cnblogs.com/cnblogs_com/hao5599/1211580/o_2018-05-12_11-53-10.gif)
[效果](https://koringz.github.io/codialog/dialog.html)


## 简洁版
简洁版的代码非常地清晰，我们可在methods方法里面处理节点(删除改)，分别使用this.$header头部，this.$body主体，this.$footer底部操作节点信息，这三个节点下如果存在ref="name"属性，我们使用.$refs.name能直接拿到这个节点，这样非常的方便input赋值和设置style样式以及添加内容。当我们要显示弹出框并修改节点时，此刻调用$methods方法，方法内部的操作原理和methods一样处理。(添)这一步操作让给*before处理(如onHeaderBefore/onBodyBefore/onFooterBefore)。
```js
// 创建一个简洁版弹出框'.compact'
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

// 点击按钮显示简洁版弹出框
$('.showme').on('click',function () {
    codialog
    .app('.compact')
    .show()
    .$methods(function () {
        this.$header.$refs.headText.innerHTML = '简洁版'; // 修改标题的方式
        this.$body.$refs.message.innerHTML = '测试调用$methods方法';
        this.$footer.$refs.button.children[0].innerHTML = '删除 onclick';
        this.$footer.$refs.button.children[1].innerHTML = '提交 onclick';
    })
    .hide({timeout:3000}); // 三秒之后隐藏
});
```

HTML页面的代码
```html
<link rel="stylesheet" type="text/css" href="./../css/codialog.css" />
<center style="padding-top: 300px"><button class="showme">测试调用$methods方法</button></center>
<script type="text/javascript" src="./../lib/jquery-3.1.1.min.js" ></script>
<script type="text/javascript" src="./../lib/co-dialog.js" ></script>
```


## 使用

```js
// 首先，实例codialog方法
var codialog = new codialog();

// 第一个弹出框
codialog.app('div.selector')
codialog.use({
	... configure options
})
codialog.hide()
// 下一个弹出框
codialog.app('div.selector2')
codialog.use({
	... configure options
})
codialog.hide()
...

// 如何显示弹出框
codialog.app('div.selector').show()
or
codialog.show('div.selector')

// 使用动画的方式也很简单
codialog.coani('.selector').bounch().stop();
codialog.coani.render();
```

## 跟随元素定位
![co-dialog](http://images.cnblogs.com/cnblogs_com/hao5599/1211580/o_2018-06-29_22-04-20.gif)
[效果](https://koringz.github.io/codialog/html/tip.html)

```js

// 首先，实例codialog方法
var codialog = new codialog();

codialog
.$tip({
	bool: true, // 默认显示tip
	create: '.pop', // 创建一个tip
	pos:'right', // 默认位置居右显示
	follow: document.querySelector('.showpop'),  // 跟随的节点元素
	event: 'mouseover', // 默认事件划过
	message: '<span>C罗 葡萄牙</span><br><span>内马尔 1前锋</span>', // 提示的信息
	callback: function (nodes) { // 代替执行$methods方法
		nodes.find('[tipleft]').css('background-image','url(../img/tip/zuo.png)');
		nodes.find('[tipcenter]').css('background-image','url(../img/tip/zhong.png)');
		nodes.find('[tipright]').css('background-image','url(../img/tip/you.png)');
	},
	mouseover: function (nodes) { // 鼠标划过节点时 开始执行的回调方法 用户操作
		console.log(nodes)
	},
	mouseout: function (nodes) { // 鼠标划出节点时 开始执行的回调方法 用户操作
		console.log('mouseout')
	}
});

```

## use配置选项

**tip**

> 跟随元素定位

```js
default: { bool: true, event:'mouseover', follow: $(selector), message: '<div>123</div>' }
options: { bool: boolean, event: string | array, follow: object, message: string }
```

**title**

> 标题的内容填充

```js
default: ''
options: string
```

**message**

> 容器的内容填充

```js
default: ''
options: string
```
**dialogWidth**

> 弹出框的整体宽度

```js
default: 500
options: integer
```
**dialogHeight**

> 弹出框的整体高度

```js
default: 300
options: integer
```

**adaptDialogHeight**

> 弹出框的整体高度自适应，如果为true，那么dialogHeight将会失效。

```js
default: false
options: boolean(true / false)
```

**adaptDialogWidth**

> 弹出框的整体宽度自适应，如果为true，那么dialogWidth将会失效。

```js
default: false
options: boolean(true / false)
```

**headerMargin**

> 标题的外边距设置

```js
default: 10 || { horizontal: 0 || '10px 10px', vertical: 0 || '10px 10px'} 
options: integer || { horizontal: integer || string, vertical: integer ||　string } 
```

**bodyMargin**

> 容器的内容外边距(其实内部封装的时候设置为内边距)

```js
default: 10 || { horizontal: 0 || '10px 10px', vertical: 0 || '10px 10px'}
options: integer || { horizontal: integer || string, vertical: integer || string }
```

**footerMargin**

> 底部的内容外边距(同上)

```js
default: 10 || { horizontal: 0 || '10px 10px', vertical: 0 || '10px 10px'}
options: integer || { horizontal: integer || string, vertical: integer || string }
```

**footerButtonCount**

> 底部按钮的个数(如果设置0，就会remove移除按钮块，最多有2个按钮)

```js
default: 1
options: integer(0 / 1 / 2)
```

**footerText**

> 底部内容的填充(可以和按钮共存)

```js
default: ['',...]
options: array ([string, string])
```

**onHeaderBefore**

> 设置头部的节点元素的attribute和style

```js
default: callback
options: function
```

**onBodyBefore**

> 设置容器的节点元素的attribute和style

```js
default: callback
options: function
```

**onFooterBefore**

> 设置底部的节点元素的attribute和style

```js
default: callback
options: function
```

**methods**

> 执行当前的弹出框的方法, 可以通过
> 改变title,message的值(执行的顺序在onHeaderBefore/onBodyBefore/onFooterBefore的后面)

```js
default: callback
options: function
```

**isDrag**

> 关闭的弹出框的拖动功能，默认位false。在此之前需要开启手势isGesture

```js
default: false
options: boolean(true / false)
```

**isClose**

> 关闭的按钮事件，默认位true，点击右侧关闭按钮就会隐藏弹出框，反之同理。

```js
default: true
options: boolean(true / false)
```

**isGestrue**

> 关闭抓手特效手势。

```js
default: false
options: boolean(true / false)
```

**isMask**

> 默认显示遮罩层，如果为false就不能显示遮罩层。

```js
default: true
options: boolean(true / false)
```

**isOverflow**

> 设置isOverflow属性为true或为false，表示滚动和无滚动特效。如设置为空对象`{}`，无滚动特效。如果设置对象的属性为 {properties:{x: true/false, y: true/false}}都是有滚动效果。

```js
default: true || {properties: {x: boolean, y: boolean}}
options: boolean(true / false) || {properties:{x: boolean(true / false), y: boolean(true / false)}}

or

option: {properties: {x: true, y: true}, width: '60%', height: 70, pos: ['right' or 'center' or 'left'] } 
//其中的width/height表示设置内容的宽和高的属性以及pos位置
```

## 其他配置选项
**hide({timeout: 3000, callback: function}) or show({timeout: 3000, callback: function})**

在web开发中，我们常常会使用ajax请求数据，当request数据还没有加载完成，我们会抛出一个弹出框，然后给弹出框设定超时的秒数，如果在规定时间内成功response数据，给弹出框设置自动关闭。
```
codialog.app('.main').show().hide({timeout: 3000, callback}) // 先显示弹出框，后超时3s自动隐藏
codialog.app('.main').hide().show({timeout: 3000, callback}) // 先隐藏弹出框，后超时3s自动显示

其中callback回调仅在超时的间歇内处理数据和节点的方法。
```

## 公共方法

- app
> 创建一个新的弹出框节点

- use
> 使用弹出框的属性和callback回调

- $methods
> 继承use内部的methods方法的原理

- $tip
> 继承use内部的tip对象的原理，但是把tip转变成为了$tip方法

- hide
> 隐藏弹出框的节点

- show
> 显示弹出框的节点

- list
> 列出弹出框的节点

- coani
> 调用动画库



## 支持

目前支持一个css3动画组件的功能，使用时调用`.coani`方法，渲染时调用`.coani.render()`， 动画api参考[co-ani](https://github.com/koringz/co-ani)文档.


## 贡献
欢迎开发人员助力开源co-dialog，欢迎任何人参与贡献，如果你决定要参与进来，请花点时间来浏览向导guidelines。

 [pull request](https://github.com/koringz/co-dialog/blob/v1.4/pull%20request.md)

## 可优化
 - 在节点下面插入新的节点
 - 是否显示遮罩层 true/false (解决)
 - 弹出框的高度 固定或者自适应 (解决)
 - 动画效果(渐变 淡入 淡出 贝塞尔) (解决)
 - 通过一个属性为true 在browser窗口显示strict结构目录 反之隐藏
 - 显示多个弹出框 (stop)
 - 可拖动弹出框 每次拖动都是从中间开始计算 (已解决)
 - 拖动的速率控制
 - 内容滚动弹出框 (已解决)
 - 抓手特效 (已解决)
 - 渐变切换弹出框 (stop)
 - 弹出框加菜单, 在list上挂起所有的弹出框
 - 跟随页面元素定位 (已解决)
 - 弹出绝对定位 (stop)
 - 自动关闭弹出 通过.hide({timeout:1000})设置毫秒 (解决)
 - 关闭methods方法的调用 (stop)
 - 兼容性解决 (目前拆分函数的功能) --
 - center居中模式 left right bottom top --
 - keyboard键盘模式 esc --
 - 随机位置展示 非居中 (stop)
 - 放大 缩小 弹出框 以及最小和最大缩放
 - 封装监听事件 启用原生监听方法如 addEventListener('start',fn)
 - 启用颜色查询 在window侧边栏显示一组色调 (https://css-tricks.com/snippets/css/named-colors-and-hex-equivalents/)
 - 依赖模块比如 dependencies注入一个js文件'.lib/jq/jq.js'
 - 顶层开出新的分支, 使用黄金比例规则, 划分出新的布局弹出框. 同时基于新的api方法来使用dialog. (stop)


## 版本改变
(v1.7.4)
 - 优化$tip方法，提示信息功能兼容IE8以上浏览器。

(v1.7.3)

 - 优化$tip方法，当页面滚动时精确定位，以及上下左右的显示位置居中，添加鼠标悬停和鼠标划出的回调方法（mouseover/mouseout）。

(v1.7.2)

 - 添加$tip方法，继承了use内部的tip对象的原理

(v1.7.1)

 - 优化配置项tip，自动添加绑定事件

 - 添加tip信息时，设置.hide方法必须在use()后面追加才能正确实现

(v1.7)[参考](https://github.com/koringz/co-dialog/releases)

 - 优化清除定时器功能（如设定倒计时）
 
 - 添加跟随元素定位提示框


(v1.6)[参考](https://github.com/koringz/co-dialog/releases)

 - 优化.show().hide({timeout: 3000,callback: function})与.show({timeout: 3000,callback: function})，表示处理超时的倒计时或其他节点信息。
  
 - 添加一个新的方法$methods，继承use内部的methods方法的原理。
 
 - 添加节点信息全部交给onHeaderBefore/onBodyBefore/onFooterBefore处理。
 
 - 通过设置ref="name"实现节点的获取，比如this.$header.$refs.name就是获取头部的节点，具体看简洁版。


(v1.4)[参考](https://github.com/koringz/co-dialog/releases)

 - 使用timeout设置超时自动隐藏元素.show().hide({timeout: 3000})和超时自动显示元素hide().show({timeout: 3000}), 分别代表3s之后隐藏和3s之后显示

 - 是否使用遮罩层 isMask默认为true使用遮罩层，否则同理

 - 添加了抓手特效 isGesture 默认为false不展示抓手功能，否则同理

 - 可拖动弹出框 默认为false不可拖动dialog, 否则同理
 
 - 内容溢出滚动效果 默认y轴滚动效果 直接设置isOverflow为true即可 如果想要x统一滚动 请使用对象的方式 {properties: {x:true, y: true}}

(v1.1)[参考](https://github.com/koringz/co-dialog/releases)

 - 添加弹出框自适应高度(adaptDialogHeight)和自适应宽度(adaptDialogWidth)

(v1.0)[参考](https://github.com/koringz/co-dialog/releases)

-  修复默认垂直居中状态 [hide()隐藏要在use()后面执行, 禁止在methods方法里面设置高度和内/外边距, 尽量在(onHeaderBefore/onBodyBefore/onFooterBefore)方法当中给father or sub元素设置高和边距, 防止影响垂直居中]
-  CSS3动画效果已经引入 [渐变 淡入 淡出 贝塞尔]