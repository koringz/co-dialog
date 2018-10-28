const {
    isFun,
    isStr,
    inArray
} = require('./staticMethods.js')

export const getElementsByClassName = (parent, childClass) => {
    if (isFun(parent.getElementsByClassName)) {
        var divTagName = parent.getElementsByTagName('*');
        var saveSensitiveElement = [];
        for (const getNode of divTagName) {
            if (isStr(getNode.className)) {
                var getClassNameGroup = getNode.className.split(' ');
                if (inArray(childClass, getClassNameGroup)) {
                    saveSensitiveElement.push(getNode);
                    break;
                }
            }
        }
        return saveSensitiveElement[0]
    }
}