<p align="center">
    <a href="https://github.com/ZWLTZ/co-dialog" alt="co-dialog">
        <img src="./assets/codialog.gif" alt="co-dialog">
    </a>
</p>

<p align="center">
<a href="https://travis-ci.org/ZWLTZ/co-dialog"><img alt="Build Status" src="https://api.travis-ci.org/ZWLTZ/co-dialog.svg?branch=master"></a>
<a href="./License.txt"><img alt="License" src="https://img.shields.io/badge/License-MIT-green.svg"></a>
<a href="https://github.com/ZWLTZ/co-dialog/issues"><img alt="issues" src="https://img.shields.io/github/issues/ZWLTZ/co-dialog.svg"></a>
<a href="https://github.com/ZWLTZ/co-dialog/releases/latest"><img alt="releases" src="https://img.shields.io/badge/release-lastest-blue.svg" > </a>
<a href="https://github.com/ZWLTZ/co-dialog/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/ZWLTZ/co-dialog.svg?style=social" ></a>
<a href="https://github.com/ZWLTZ/co-dialog/network"><img alt="GitHub forks" src="https://img.shields.io/github/forks/ZWLTZ/co-dialog.svg?style=social" ></a>
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

初始化使用`src`连接方式，你需要加载以下文件：

```html
<script src="co-dialog.js"></script>
```

使用`import`导入方式：

```js
import { Coog } from "co-dialog"
or
const Coog = require("co-dialog").Coog
```

## 例子

这是一个显示基本内容的弹出框

```js
Coog.app(".base").use("这是一个基础的弹出框")
```

这是一个带标题的`success`弹出框

```js
Coog.app(".with-title").use(
 "标题",
 "这是一个带标题的弹出框",
 'success'
)
```

使用追踪器
```js
const with = this.app('.with-title').tracker

if(with) return false
else \\ doing something
```

## [点这里看更多例子和文档 :gun:](https://koringz.github.io/co-dialog/)

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