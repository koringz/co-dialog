import codialog from './codialog.js'

export default function operatorChain() {}

/*
 * 打通`Coog`库外部和内部进行连接起来
 * 去掉`hide`和`show`方法
 * 并不是默认执行显示和隐藏,而是根据用户自定义设置`hide`和`show`实现需求功能.
 * 默认点击阴影部分会自动隐藏弹出框
 * Coog.app('.codialog').use({title: 'hello world! ^_^'})
 */
operatorChain.app = function (options) {
	let instance = new(codialog)
	return instance.app(options)
}

operatorChain.$ = function (options) {
	let instance = new(codialog)
	return instance.$(options)
}