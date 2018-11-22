import { isStr, isArray } from './staticMethods.js'

const fromAttributesToFindElement = (parentElement, attr, arr) => {
    let saveChildList = [];
    let parentLength = parentElement.length
    if (parentLength) {
        for (const items of parentElement) {
            // 检查属性 [mask] 为字符串 获得当前节点
            if (isStr(items.getAttribute(attr))) {
                {
                    saveChildList.push(items);
                }

                // 数组 继续执行for循环
                if (isArray(arr)) continue;
                else break; // break;退出兼容ie9and10
            } else {
                if (parentLength == 1) {
                    // 长度为1 往下找
                    return fromAttributesToFindElement(items.children, attr, arr)
                }
            }
        }
        if (isArray(arr)) return saveChildList;
        return saveChildList[0]
    }
}

export default fromAttributesToFindElement