const { 
    forEach 
} = require('./staticMethods.js')

export const selfApi = ['onHeader','onBody','onFooter']

/*
需要在dialog body里面加载其他元素, 比如图片的失效 和 其他图片icon信息
或者添加一条新的节点信息
*/
const defineRefs = (self, child) => {
    var obj = new Object;
    var refList = self.find(child.children,'[ref]', []);
    forEach(refList, (item) => {
        if(item.getAttribute('ref')) {
            obj[item.getAttribute('ref')] = item;
        }
    });
    return obj;
}

export const defaultRefs = (PROTO) => {
    selfApi.map((items) => {
        PROTO[items] = function (child) {
            var self = this;
            return {
                $refs: defineRefs(self, child)
            }
        }
    });
}
