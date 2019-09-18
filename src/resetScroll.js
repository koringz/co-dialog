import { isExist, search } from './staticMethods.js'
import { setClassName } from './domMethods.js'

/*
 *  重置scrollTop属性
 *  option = {
 *      name: 'add'|| 'remove',
 *      value: ' codialog-show'
 *  }
*/
const resetScroll = function (option) {
    const body = document.body;
    const domEl = document.documentElement
    // 设置body时 不能给body css设置 width:100%
    // 防止padding不起作用
    const { offsetWidth } = body;

    if (option.name === 'add') {
        setClassName([body,domEl], params => params + option.value);
        body.style.paddingRight = `${body.offsetWidth - offsetWidth}px`
    }
    if (option.name === 'remove') {
        setClassName([body,domEl], params => params.replace(new RegExp(option.value, 'gm'), ''));
        body.style.paddingRight = 0
    }
}

export default resetScroll