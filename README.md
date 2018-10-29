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

或者下载 CDN:
[jsdelivr.com/package/npm/co-dialog](https://cdn.jsdelivr.net/npm/co-dialog)

## 使用

初始化你需要加载以下文件：

```html
<script src="co-dialog.js"></script>
```

如果你需要单独引入stylesheet样式：

```html
<link rel="stylesheet" href="animation.min.css">
<script src="co-dialog.js"></script>
```

or

```js
import coog from "co-dialog"
or
const coog = require("co-dialog")
```



## 例子

这是一个显示基本内容的弹出框

```js
coog.app(".base").use("这是一个基础的弹出框").show()
```

这是一个带标题的`success`弹出框

```js
coog.app(".with-title").use(
 "标题",
 "这是一个带标题的弹出框",
 'success'
).show()
```

## [点这里看更多例子和文档 :gun:](https://koringz.github.io/co-dialog/)

## 作者

查看[作者](https://github.com/koringz)

## 参考 [sweetalert2](https://github.com/sweetalert2/sweetalert2)
`co-dialog`参考`sweetalert2`插件. 并且最新版本支持 `es6` 写法.

## 其他版本

[es5 version](https://github.com/koringz/co-dialog/releases/tag/v2.0.1)

[es6 目前](https://github.com/koringz/co-dialog/releases/tag/v2.0.2)
<!-- [vue version](https://github.com/koringz/co-dialog/releases/tag/v2.0.3) -->

## 版本改变
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

[查看历史版本](https://github.com/koringz/co-dialog/blob/master/history.md)

## license
MIT