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

## 配置选项

**title**

> 标题的内容填充

```
default: ''
options: string
```

**message**

> 容器的内容填充

```
default: ''
options: string
```
**dialogWidth**

> 弹出框的整体宽度

```
default: 500
options: integer
```
**dialogHeight**

> 弹出框的整体高度

```
default: 300
options: integer
```

**adaptDialogHeight**

> 弹出框的整体高度自适应，如果为true，那么dialogHeight将会失效。

```
default: false
options: boolean(true / false)
```

**adaptDialogWidth**

> 弹出框的整体宽度自适应，如果为true，那么dialogWidth将会失效。

```
default: false
options: boolean(true / false)
```

**headerMargin**

> 标题的外边距设置

```
default: 10 || { horizontal: 0, vertical: 0} || { horizontal: '10px 10px', vertical: '10px 10px' }
options: integer || { horizontal: integer, vertical: integer } || { horizontal: string, vertical: string }
```

**bodyMargin**

> 容器的内容外边距(其实内部封装的时候设置为内边距)

```
default: 10 || { horizontal: 0, vertical: 0} || { horizontal: '10px 10px', vertical: '10px 10px' }
options: integer || { horizontal: integer, vertical: integer } || { horizontal: string, vertical: string }
```

**footerMargin**

> 底部的内容外边距(同上)

```
default: 10 || { horizontal: 0, vertical: 0} || { horizontal: '10px 10px', vertical: '10px 10px' }
options: integer || { horizontal: integer, vertical: integer } || { horizontal: string, vertical: string }
```


**footerButtonCount**

> 底部按钮的个数(如果设置0，就会remove移除按钮块，最多有2个按钮)

```
default: 1
options: integer(0 / 1 / 2)
```


**footerText**

> 底部内容的填充(可以和按钮共存)

```
default: ['',...]
options: array ([string, string])
```


**onHeaderBefore**

> 设置头部的节点元素的attribute和style

```
default: callback
options: function
```



**onBodyBefore**

> 设置容器的节点元素的attribute和style

```
default: callback
options: function
```



**onFooterBefore**

> 设置底部的节点元素的attribute和style

```
default: callback
options: function
```



**methods**

> 执行当前的弹出框的方法, 可以通过动态改变title,message的值(执行的顺序在onHeaderBefore/onBodyBefore/onFooterBefore的后面)

```
default: callback
options: function
```


**isClose**

> 关闭的按钮事件，默认位true，点击右侧关闭按钮就会隐藏弹出框，反之同理。

```
default: true
options: boolean(true / false)
```


## 支持

目前支持一个css3动画组件的功能`co-dialog`，使用时调用`.coani`方法，渲染时调用`.coani.render()`，调用动画方式和`.use()`或`.app()`方法一样, 加入动画`.coani()`方法, 具体动画api参考[coani](https://github.com/koringz/co-ani)文档.

## 公共方法

- app
> 创建一个新的弹出框节点

- use
> 使用弹出框的属性和callback回调

- hide
> 隐藏弹出框的节点

- show
> 显示弹出框的节点

- list
> 列出弹出框的节点

- coani
> 调用动画库



## 可优化
 - 在节点下面插入新的节点如何实现
 - 是否显示遮罩层 true/false
 - 弹出框的高度 固定或者自适应
 - 动画效果(渐变 淡入 淡出 贝塞尔)
 - 通过一个属性为true 在browser窗口显示strict结构目录 反之隐藏
 - 显示多个弹出框
 - 可拖动弹出框
 - 自适应（解决）
 - 内容滚动弹出框
 - 抓手特效
 - 渐变切换弹出框(解决)
 - 弹出框加菜单
 - 跟谁页面元素定位
 - 弹出绝对定位
 - 自动关闭弹出
 - 关闭methods方法的调用
 - 通过在view窗口输入数字和配置信息即可实现弹出框的风格(实现方式，生成的代码要copy到页面里面，后面想到，可以基于node实现)


## 版本改变
(v1.0)[参考](https://github.com/koringz/co-dialog/releases)

-  修复默认垂直居中状态 [hide()隐藏要在use()后面执行, 禁止在methods方法里面设置高度和内/外边距, 尽量在(onHeaderBefore/onBodyBefore/onFooterBefore)方法当中给father or sub元素设置高和边距, 防止影响垂直居中]
-  CSS3动画效果已经引入 [渐变 淡入 淡出 贝塞尔]

(v1.1)[参考](https://github.com/koringz/co-dialog/releases)

 - 添加自弹出框适应高度(adaptDialogHeight)和自适应宽度(adaptDialogWidth)