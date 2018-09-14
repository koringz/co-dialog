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

如果你需要引入stylesheet样式：

```html
<script src="co-dialog.min.js"></script>
<link rel="stylesheet" href="co-dialog.min.css">
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

```js
coog.app(".with-title").use(
 "默认",
 "这是一个带标题的弹出框"
).show()
```

## [点这里看更多例子和文档 :gun:](https://koringz.github.io/co-dialog/)

## 版本改变

(v2.0.0) <Date:2018/09/12>
 - 优化isDrag拖动事件，拖动效果将会更加地平滑。
 - 添加showCloseButton属性，是否关闭按钮的布尔值(true / false)。
 - layout属性在tips方法里面代替pos属性。
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