<p align="center">
    <a href="https://github.com/koringz/co-dialog" alt="co-dialog">
        <img src="./assets/codialog.gif" alt="co-dialog">
    </a>
</p>

<p align="center">
<a href="./License.txt"><img alt="License" src="https://img.shields.io/badge/License-MIT-green.svg"></a>
<a href="https://github.com/koringz/co-dialog/issues"><img alt="issues" src="https://img.shields.io/github/issues/koringz/co-dialog.svg"></a>
<a href="https://github.com/koringz/co-dialog/releases/latest"><img alt="releases" src="https://img.shields.io/badge/release-lastest-blue.svg" > </a>
<a href="https://github.com/koringz/co-dialog/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/koringz/co-dialog.svg?style=social" ></a>
<a href="https://github.com/koringz/co-dialog/network"><img alt="GitHub forks" src="https://img.shields.io/github/forks/koringz/co-dialog.svg?style=social" ></a>
</p>

<p align="center">
这是一个简洁，智能，个性化的JAVASCRIPT弹出框
</p>
<p align="center">
zero dependencies and free dialog library
</p>

## 下载


```bash
npm install co-dialog
```

Or:

```bash
bower install co-dialog
```

或者下载 CDN:
[jsdelivr.com/package/npm/co-dialog](https://cdn.jsdelivr.net/npm/co-dialog)

## 使用

初始化你需要加载以下文件：

```html
<script src="co-dialog.all.min.js"></script>
```

如果你需要单独引入stylesheet样式：

```html
<link rel="stylesheet" href="animation.min.css">
<link rel="stylesheet" href="co-dialog.min.css">
<script src="co-dialog.min.js"></script>
```

or

```js
import coog from "co-dialog"
or
const coog = require("co-dialog")
```



## 例子

这个显示基本的内容

```js
coog.app(".base").use("这是一个基础的弹出框").show()
```

这是一个带标题的弹出框

<<<<<<< Updated upstream
```js
coog.app(".with-title").use(
 "默认",
 "这是一个带标题的弹出框"
).show()
||||||| merged common ancestors
## 其他配置选项
我们常常在web开发中，往往会通过ajax请求数据，当数据还没有加载完成，我们会抛出一个弹出框，然后给弹出框设定超时的秒数，假如在规定时间内成功reques到数据，弹出框就会自动关闭。。
```
codialog.app('.main').show().hide({timeout: 3000}) // 先显示弹出框，后超时3s自动隐藏
codialog.app('.main').hide().show({timeout: 3000}) // 先隐藏弹出框，后超时3s自动显示
=======
## 其他配置选项
**hide({timeout: 3000}) or show({timeout: 3000})**

我们常常在web开发中，往往会通过ajax请求数据，当数据还没有加载完成，我们会抛出一个弹出框，然后给弹出框设定超时的秒数，假如在规定时间内成功reques到数据，弹出框就会自动关闭。
```
codialog.app('.main').show().hide({timeout: 3000}) // 先显示弹出框，后超时3s自动隐藏
codialog.app('.main').hide().show({timeout: 3000}) // 先隐藏弹出框，后超时3s自动显示
>>>>>>> Stashed changes
```

## [点这里看更多例子和文档 :gun:](https://koringz.github.io/co-dialog/)


## application


## Dom,Event,Styles,Template,Properties


## 运行测试

```bash

npm run test

```

<<<<<<< Updated upstream
## 作者
||||||| merged common ancestors
## 贡献
欢迎开发人员助力开源co-dialog，欢迎任何人参与贡献，如果你决定要参与进来，请花点时间来浏览向导guidelines。

 [pull request](https://github.com/koringz/co-dialog/blob/master/pull%20request.md)
=======
## 贡献
欢迎开发人员助力开源co-dialog，欢迎任何人参与贡献，如果你决定要参与进来，请花点时间来浏览向导guidelines。

 [pull request](https://github.com/koringz/co-dialog/blob/v1.4/pull%20request.md)
>>>>>>> Stashed changes

查看[作者](https://github.com/koringz)


## 版本改变
<<<<<<< Updated upstream
||||||| merged common ancestors
(v1.0)[参考](https://github.com/koringz/co-dialog/releases)

-  修复默认垂直居中状态 [hide()隐藏要在use()后面执行, 禁止在methods方法里面设置高度和内/外边距, 尽量在(onHeaderBefore/onBodyBefore/onFooterBefore)方法当中给father or sub元素设置高和边距, 防止影响垂直居中]
-  CSS3动画效果已经引入 [渐变 淡入 淡出 贝塞尔]

(v1.1)[参考](https://github.com/koringz/co-dialog/releases)

 - 添加弹出框自适应高度(adaptDialogHeight)和自适应宽度(adaptDialogWidth)

(v1.4)[参考](https://github.com/koringz/co-dialog/releases)

 - 使用timeout设置超时自动隐藏元素.show().hide({timeout: 3000})和超时自动显示元素hide().show({timeout: 3000}), 分别代表3s之后隐藏和3s之后显示.
=======
(v1.0)[参考](https://github.com/koringz/co-dialog/releases)

-  修复默认垂直居中状态 [hide()隐藏要在use()后面执行, 禁止在methods方法里面设置高度和内/外边距, 尽量在(onHeaderBefore/onBodyBefore/onFooterBefore)方法当中给father or sub元素设置高和边距, 防止影响垂直居中]
-  CSS3动画效果已经引入 [渐变 淡入 淡出 贝塞尔]

(v1.1)[参考](https://github.com/koringz/co-dialog/releases)

 - 添加弹出框自适应高度(adaptDialogHeight)和自适应宽度(adaptDialogWidth)

(v1.4)[参考](https://github.com/koringz/co-dialog/releases)

 - 使用timeout设置超时自动隐藏元素.show().hide({timeout: 3000})和超时自动显示元素hide().show({timeout: 3000}), 分别代表3s之后隐藏和3s之后显示
 
 - 是否使用遮罩层 isMask默认位true，反之同理
 
 - 添加了抓手特效 isGesture 默认位false不展示抓手功能，反之同理
>>>>>>> Stashed changes

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

[查看历史版本]()

## license
MIT