## 如何划分API

从设计上来看，我们基本实现page页面的形式 html css javascript.

html仅仅是一个模版，css是一个处理了html的样式布局调整，javascript是一个操作数据和渲染dom的部分（包含了css样式部分，及绘画和渲染以及组合等因素）。

于是要找出来哪些模块调用方法和dom、render和painter有关，然后分类管理这些模块。

下面属于coog组件调用的api方法：
.app() 
.use() 
.show() 
.hide() 

那么use的属性也属于api里面的配置，但是属性间接会去处理dom的样式部分，所以属性是一个处于中间层的部分，从个人对前端技术的了解，中间层是一个middleware，类似于中间件，那么我们可以把属性称为“中间件属性”。

组件 application -- 中间件属性 properties -- 底层 dom -- 布局 css -- 模版 html

从中间件属性入手，据我了解的中间件有webpack，nodejs v8引擎实现的服务器，如果要在nodejs上跑es6，就要用到解析es6的中间层，那么webpack就是一套基于nodejs api封装的一个中间件。此时我们可以去看一下webpack是怎么去封装的一个原理。 当然我们知道还有koa也是一个中间件，从我个人了解，我还是喜欢koa的原理。现在去看一下koa是如何实现中间件，koa是如何设计架构。

中间件只处理底层的api方法，然后进行methods的调用和回调处理，接着对method进行router处理，判断res和req返回值类型。再接着使用getter获得需要的属性。

coog
.method('find')
.method('$')
.method('removeChild')
.method('addEventListener')
.method('isArray')

底层有如下api：
 .find() 
 .$() 
 .removeChild() 
 .addEventListener() 
 .removeEventListener() 
 .isArray() 
 .search() 
 .forEach() 
 .assign() 
 .trim() 
 .classList() 
 .width() 
 .height() 
 .left() 
 .right() 
 .clone() 
 .getElementsByClassName() 
 .preventDefault()

底层处理的是html和css类型以及dom的事件，这是我们要获得是属性，分别是render渲染和painter绘画，关系到layout组合性能因素。


coog
.getter('left')
.getter('width')
.getter('top')
.getter('right')

