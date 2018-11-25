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
[jsdelivr.com/package/npm/co-dialog](https://www.jsdelivr.com/package/npm/co-dialog)

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

使用追踪器
```js
const with = this.app('.with-title').tracker

if(with) return false
else \\ doing something
```

## [点这里看更多例子和文档 :gun:](https://koringz.github.io/co-dialog/)

## 参考 [sweetalert2](https://github.com/sweetalert2/sweetalert2)
`co-dialog`参考`sweetalert2`插件. 并且最新版本支持 `es6` 写法.

## 其他版本
 - [co-dialog](https://github.com/ZWLTZ/co-dialog/releases/tag/v2.0.1) - ES5 Wraper
 - [vue-co-dialog](https://github.com/ZWLTZ/vue-co-dialog) - Vue.js Binding


## 浏览器兼容

Edge | Chrome | Firefox | Safari | Opera | Android Browser
------|--------|---------|--------|-------|------------------
:heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |

## 版本改变
[查看历史版本](https://github.com/koringz/co-dialog/blob/master/history.md)

## license
MIT