const { forEach } = require('./staticMethods.js');

/*
需要在dialog body里面加载其他元素, 比如图片的失效 和 其他图片icon信息
或者添加一条新的节点信息
*/
function defineRefs (child) {
    var obj = new Object;
    var refList = this.find(child.children,'[ref]', []);
    forEach(refList, function (item) {
        obj[item.getAttribute('ref')] = item;
    });
    return obj;
}

export const defaultRefs = (PROTO) => {
    ['onHeader','onBody','onFooter'].map( function (items) {
        PROTO[items] = function (child) {
            return {
                $refs: defineRefs.call(this, child)
            }
        }
    });
}
