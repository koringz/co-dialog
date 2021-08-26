<p align="center">
    <a href="https://github.com/koringz/co-dialog" alt="co-dialog">
        <img src="./assets/codialog.gif" alt="co-dialog">
    </a>
</p>

<p align="center">
<a href="https://travis-ci.org/koringz/co-dialog"><img alt="Build Status" src="https://api.travis-ci.org/koringz/co-dialog.svg?branch=master"></a>
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

你可以使用`src`加载文件：

```html
<link rel="stylesheet" href="co-dialog.css">
<script src="co-dialog.js"></script>
```

或者使用`import`导入模块：

```js
import Coog from "co-dialog"
```

or

```js
const Coog = require("co-dialog")
```

如果使用`import`引入库需要单独引入`style`样式：

```js
import Coog from "co-dialog"

import 'co-dialog/dist/co-dialog.min.css'
```

如果想用CSS3动画, 需要下载 [animate.css](https://github.com/daneden/animate.css) 库, 在项目中引入库文件：

```js
<link rel="stylesheet" href="animate.min.css">
```

或者引入一个CDN版本：

```js
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css">
```

详细动画请参考文档 [Animate.css](https://daneden.github.io/animate.css/)

## 例子

这是一个显示基本内容的弹出框

```js
const baseBox = Coog.app(".base").use("这是一个基础的弹出框").show()
```

任何地方都能调用`base`类弹出框

```js
baseBox.show()
```

这是一个带标题的`success`弹出框

```js
Coog.app(".with-title").use(
 "标题",
 "这是一个带标题的弹出框",
 'success'
)
.show()
```

## 第三方插件

**CSS3动画**

如果要使用CSS3动画功能, 暂时只支持[animate.css](https://github.com/daneden/animate.css)动画库, 实现动画的方式非常简单, 只要导入`animate.css`动画库, `className`类名就能被`customAnimation`识别出来.

```js
Coog
    .app('.the-third-animate')
    .use({
        title: 'use animate.css',
        message: 'Your have seen the animation theme',
        animation: false,
        customAnimation: 'bounceInLeft', // 使用 animate.css 动画
    })
    .show()
```
## [点这里看更多例子和文档 :gun:](https://koringz.github.io/co-dialog/)
<a href="https://github.com/koringz/co-dialog/demo.jpg" alt="co-dialog">
    <img src="./assets/demo.jpg" alt="co-dialog">
</a>

## 其他版本
 - [vue-co-dialog](https://github.com/koringz/vue-co-dialog) - Vue.js Binding


## 浏览器兼容

Edge | Chrome | Firefox | Safari | Opera | Android Browser
------|--------|---------|--------|-------|------------------
:heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |

## 版本改变
[查看历史版本](https://github.com/koringz/co-dialog/blob/master/history.md)

## license
MIT