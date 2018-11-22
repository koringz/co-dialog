import {isExist } from './staticMethods.js'
import {classList } from './domMethods.js'

// 重置scrollTop属性
const resetScroll = function (attr, isTruth) {
    var bodyNode = document.body;
    // 设置body时 不能给body css设置 width:100%
    // 防止padding不起作用
    const { offsetWidth } = bodyNode;
    if(isTruth) {
        classList(bodyNode, attr, document.body);
        classList(document.documentElement, attr, document.documentElement);
        bodyNode.style.paddingRight = `${bodyNode.offsetWidth - offsetWidth}px`
    }
    else {
        var ignoreZoreClass = classList(document.body) || classList(document.documentElement);
        if(isExist(ignoreZoreClass)) {
            classList(document.body, classList(document.body).replace(attr,''), '');
            classList(document.documentElement, classList(document.documentElement).replace(attr,''), '');
            bodyNode.style.paddingRight = 0
        }
        else return null;
    }
}

export default resetScroll