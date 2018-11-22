import { isFun, isStr, inArray } from './staticMethods.js'

const getElementsByClassName = (parent, childClass) => {
    if (isFun(parent.getElementsByClassName)) {
        var divTagName = parent.getElementsByTagName('*');
        var saveSensitiveElement = [];

        for (const getNode of divTagName) {
            if (isStr(getNode.className)) {
                if (inArray(childClass, getNode.className.split(' '))) {
                    saveSensitiveElement.push(getNode);
                    break;
                }
            }
        }

        return saveSensitiveElement[0]
    }
}

export default getElementsByClassName