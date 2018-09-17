## API 分离

所有api单独写到单个文件里，中间的环节通过加载模块的形式调用各个文件的api，向之后es6写法兼容。

## folder constructor 目录结果

###### 封装底层的js api方法

定位与原理: 底层js封装统称静态方法，写到单个文件里面
名称 待完善 需要能很好理解的名称

api如下:
 .find() 
 .$() 
 .removeChild() 
 .addEventListener() 
 .addEventListener() 
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


###### 模版的处理方法 html

api如下: 
.template() 
.onheader() 
.onBody() 
.onFooter()

###### 弹出框组件自身调用的方法 

如下: 
.app() 
.use() 
.show() 
.hide() 

###### js动态加载 css 的方法

api如下: 
.style()

###### 结合动画场景的方法

api如下: 
.animation()


###### 传参的默认属性处理( 类型分别 boolean | number | array | function | {} | undefined | null | string )
假设如下: 
{
	title: '' | []
	titleText: '' | []
	text: '' | []
	message: '' | []
	button: [] | function | {} | null
}


@问题
如何去处理默认属性的功能




