const { classList, isExist } = require('./staticMethods.js');

// 重置scrollTop属性
export const resetScroll = (attr, isTruth) => {
    var bodyNode = document.body;
    // 设置body时 不能给body css设置 width:100%
    // 防止padding不起作用
    var previousBody = bodyNode.offsetWidth
    if(isTruth) {
        classList(bodyNode, attr, document.body);
        classList(document.documentElement, attr, document.documentElement);
        var currentBody = bodyNode.offsetWidth
        bodyNode.style.paddingRight = currentBody - previousBody + 'px'
    }
    else {
        var ignoreZoreClass = classList(document.body) || classList(document.documentElement);
        if(isExist(ignoreZoreClass)) {
            classList(document.body, classList(document.body).replace(attr,''), '');
            classList(document.documentElement, classList(document.documentElement).replace(attr,''), '');
            bodyNode.style.paddingRight = '0'
        }
        else return null;
    }
}