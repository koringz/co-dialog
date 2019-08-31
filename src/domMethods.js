import { isExist, isStr } from './staticMethods.js'

export const contains = (node) => (node === document.body) ? false : document.body.contains(node);

export const removeChild = (child) => {
    if(isExist(child)) return null;

    if (child.parentElement.removeChild) {
        return child.parentElement.removeChild(child)
    }
    return child.parentElement.removeNode(child)
}

export const preventDefault = (ev) => {
    if(ev.preventDefault) {
        ev.preventDefault();
    }
    else if(ev.stopPropagation) {
        ev.stopPropagation();
    }
    else return false;
}

export const addEventListener = (el, type, fallback) => {
    if(el.addEventListener) {
        el.addEventListener(type, fallback, false);
    }
    else if(el.attachEvent) {
        el.attachEvent(`on${type}`, fallback);
    }
}

export const removeEventListener = (el,type,callback)=> {
    if(el.removeEventListener){
        el.removeEventListener(type,callback,false);
    }
    else{
        el.detachEvent(`on${type}`, callback);
    }
}

export const classOrId = {
    _class(el, name) {
        if(el.classList) {
            el.setAttribute('class',name);
        }
        else {
            el.className = name;
        }
    },
    _id(el, name) {
        el.setAttribute('id',name);
    }
}

export const createDivAndSetAttribute = (options) => {
    const createDiv = document.createElement('div');

    if (options.charAt(0) == '.') {
        classOrId._class(createDiv, options.slice(1));
    }
    if (options.charAt(0) == '#') {
        classOrId._id(createDiv, options.slice(1));
    }

    return createDiv
}

// compatiblity
function eachClassName (_splitArrItems, className) {
    var params = '';
    for(var len = _splitArrItems.length, kk = 0; kk < len; kk++) {
        // disabled changed the parameters of type. maybe there are HTML elements
        if(typeof _splitArrItems[kk] == 'object') {
            params += _splitArrItems[kk][className]
        }
    }
    return params
}

export function classList (nowNodeList, params) {
    var argTransformToArray = [Array.prototype.slice.apply(arguments).slice(2)]

    if(isStr(params)) {
        if(nowNodeList.classList) {
            nowNodeList.setAttribute('class', eachClassName(argTransformToArray[0], 'classList') + params);
        }
        else if(nowNodeList.className) {
            nowNodeList.setAttribute('class', eachClassName(argTransformToArray[0], 'className') + params);
        }
        else return null;
    }
    else return nowNodeList.className || nowNodeList.classList;
}