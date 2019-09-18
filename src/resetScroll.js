import { isExist, search } from './staticMethods.js'
import { setClassName } from './domMethods.js'

/*
 *  重置scrollTop属性
 *  option = {
 *      state: 'add'|| 'remove',
 *      value: ' codialog-show'
 *  }
*/
const resetScroll = function (option) {
    const body = document.body;
    const domEl = document.documentElement
    // 设置body时 不能给body css设置 width:100%
    // 防止padding不起作用
    const { offsetWidth } = body;

    if (option.state === 'add') {
        setClassName([body,domEl], (params) => {
            return params + option.value
        });
        domEl.style.paddingRight = body.style.paddingRight = `${body.offsetWidth - offsetWidth}px`
    }
    if (option.state === 'remove') {
        setClassName([body,domEl], (params) => {
            return params.replace(new RegExp(option.value, 'gm'), '')
        });
        domEl.style.paddingRight = body.style.paddingRight = 0
    }
}

export default resetScroll