 (v2.1.7) <Date:2019/09/01>
 - `webpack`构建工具替换成`gulp`构建工具
 - 删除`webpack`环境配置`webpack.config.js`文件
 - 修改`.babelrc`文件`babel`编译配置
 - 添加`gulpfile.js`文件
 - 修改`index.js`相关文件修改
 - 修改测试的库地址
 - 修改example导入库的地址
 - 添加打包结束库文件
 - `show`和`hide`方法会被调用, 因为和交互关联
 - 在vue开发环境下, 不刷新情况下, 给`type`属性动态赋值多次不保留上一次的`icon`值
 - `jsdom`高版本不兼容`node6`版本, 安装`jsdom v10`低版本方便`node6`部署测试

 (v2.1.6) <Date:2019/09/01>
 - 修改`.gitignore`和`.npmignore`文件
 - 修改库名`coog`首字母大写`Coog`
 - 清除文件多余的空格
 - 清除`Coog`库外部方法`show()`和`hide()`
 - 添加新文件`operatorChain.js`，打通库外部和内部连接
 - 导入方式暂时使用 `import { Coog } from 'co-dialog'`
 - 更改文件名 `codialog.js` 和 `index.js`
 - 添加部署文件 .travis.yml
 - 部署测试未导入`Coog`库

(v2.1.5) <Date:2019/08/27>
 - 修改`src/domClass.js`文件名为`src/domElement.js`，修改`getClass`变量为`getNodeElement`，增加新方法`getAllNodeElement`
 - 删除`src/domFind.js`文件
 - 修改`src/index.js`文件
 - 修改`src/use/useOptions.js`文件方法`onDialogIsClose`判断条件`isExit`改为`!isNull`

(v2.1.4) <Date:2018/11/25>
- code 优化
- index.js 优化 `timeout` 是否为数字类型
- src/use/useOptions.js 文件修改layout选项`ten`缺少调用
- resetScroll 文件对attr未识别的字符串`search`进行条件验证

(v2.1.3) <Date:2018/11/25>
- code & bugs 优化
- index.js文件修改find方法else if条件，查找节点属性的后缀含有空格`(\s*)$`
- index.js文件修改`this.tracker = false；`特殊字符'，'改为英文字符';'
- domClass.js文件移除`getElementsByClassName`方法, 使用`getClass`方法
- 将会优化 多个弹出框的 点击事件失效的问题，采取coog多个输出多个实例对象，代替现在一个实例执行所有的 app 导致的问题

(v2.1.1) <Date:2018/11/22>
- code 优化
- src/index.js文件添加样式部分移到新文件addStyle.js里面
- src/index.js文件声明对象`dialogClassNamePart`移到defaultParameters.js文件下面
- src/use/useOtions文件设置'确认'or'取消'按钮的背景颜色设置为不等于默认的背景颜色，并设置按钮:hover行为
- assets/css/co-dialog.min.css修改button样式的背景颜色
- src/use/useOtions.js文件下判断obj条件的模块，全部拆分成obj功能函数的模块
- `export`输出单一模块或类统一使用`export default`处理。
- conflict 优化
- index.js文件移除外部`babel-polyfill`模块
- add module 优化
- tracker使用追踪器，coog.app('.dialog').tracker为true表示存在，否则不存在这个弹出框节点

(v2.1.0) <Date:2018/11/13>
- bug 修复
- 修改src/use/useOptions.js文件，其中'case typeGroup[3]: return '多了一个return，删除'return'避免`type: 'info'`失效
- dialogTemplate.js文件模版字符串丢失'>'尖括号

(v2.0.9) <Date:2018/11/13>
 - bug 修复
 - README.md文件'版本改变'日志移入history.md文件里 添加'##浏览器兼容'
 - dialogTemplate.js文件方法替换用es6字符串模版
 - appContext.js文件修改'dialogTemplate()'为'dialogTemplate.replace(/(^|\n)\s*/g,'')'

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

(v1.7.4)
 - 优化$tip方法，提示信息功能兼容IE8以上浏览器。

(v1.7.3)

 - 优化$tip方法，当页面滚动时精确定位，以及上下左右的显示位置居中，添加鼠标悬停和鼠标划出的回调方法（mouseover/mouseout）。

(v1.7.2)

 - 添加$tip方法，继承了use内部的tip对象的原理

(v1.7.1)

 - 优化配置项tip，自动添加绑定事件

 - 添加tip信息时，设置.hide方法必须在use()后面追加才能正确实现

(v1.7)[参考](https://github.com/koringz/co-dialog/tree/v1.7)

 - 优化清除定时器功能（如设定倒计时）

 - 添加跟随元素定位提示框


(v1.6)[参考](https://github.com/koringz/co-dialog/tree/v1.6)

 - 优化.show().hide({timeout: 3000,callback: function})与.show({timeout: 3000,callback: function})，表示处理超时的倒计时或其他节点信息。

 - 添加一个新的方法$methods，继承use内部的methods方法的原理。

 - 添加节点信息全部交给onHeaderBefore/onBodyBefore/onFooterBefore处理。

 - 通过设置ref="name"实现节点的获取，比如this.$header.$refs.name就是获取头部的节点，具体看简洁版。


(v1.4)[参考](https://github.com/koringz/co-dialog/tree/v1.4)

 - 使用timeout设置超时自动隐藏元素.show().hide({timeout: 3000})和超时自动显示元素hide().show({timeout: 3000}), 分别代表3s之后隐藏和3s之后显示

 - 是否使用遮罩层 isMask默认为true使用遮罩层，否则同理

 - 添加了抓手特效 isGesture 默认为false不展示抓手功能，否则同理

 - 可拖动弹出框 默认为false不可拖动dialog, 否则同理

 - 内容溢出滚动效果 默认y轴滚动效果 直接设置isOverflow为true即可 如果想要x统一滚动 请使用对象的方式 {properties: {x:true, y: true}}

(v1.1)[参考](https://github.com/koringz/co-dialog/tree/v1.0)

 - 添加弹出框自适应高度(adaptDialogHeight)和自适应宽度(adaptDialogWidth)

(v1.0)[参考](https://github.com/koringz/co-dialog/tree/v1.0)

-  修复默认垂直居中状态 [hide()隐藏要在use()后面执行, 禁止在methods方法里面设置高度和内/外边距, 尽量在(onHeaderBefore/onBodyBefore/onFooterBefore)方法当中给father or sub元素设置高和边距, 防止影响垂直居中]
-  CSS3动画效果已经引入 [渐变 淡入 淡出 贝塞尔]