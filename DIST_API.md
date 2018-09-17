## 如何划分API

从设计上来看，我们可以区分出来3个基本实现page页面的形式。

html css javascript

对这3个分别做不同的处理，html仅仅是一个模版。css是一个处理了html的样式布局调整。javascript是一个渲染html底层dom的处理，包含了css样式部分，还涉及绘画和渲染以及组合等因素。

我们可以知道哪些部分和coog组件有关，哪些部分和dom、render和painter有关。

下面属于coog调用的api方法：
.app() 
.use() 
.show() 
.hide() 

那么use的属性也属于api里面的配置，但是属性间接会去处理dom的样式部分，所以属性是一个处于中间层的部分，从个人对前端技术的了解，中间层是一个middleware，也就是中间件，那么我们可以把属性叫做中间件属性。

组件 应用池 api-- 中间件 properties -- 底层 dom -- css 样式 -- html 模版

从中间件入手，据我了解的中间有webpack，基于nodejs v8引擎实现的服务器，需要处理es6，就要用到解析node api的中间层，那么webpack就是一个中间件。此时我们可以去看一下webpack是怎么去封装的一个原理。 当然我们知道还有koa也是一个中间件，从我个人了解，我还是喜欢koa的原理。现在去看一下koa的原理是如何实现的中间件的，koa的设计是如何架构的。

中间件只处理底层的api方法，然后进行methods的调用和回调处理，接着进行对method进行router处理，判断res和req返回值的处理。再接着使用getter获得需要的属性。

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

