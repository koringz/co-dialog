import { isExist, isStr } from './staticMethods.js'

export const contains = (node) => (node === document.body) ? false : document.body.contains(node);

export const removeChild = (child) => {
    if (isExist(child)) return null;

    if (child.parentElement.removeChild) {
        return child.parentElement.removeChild(child)
    }
    return child.parentElement.removeNode(child)
}

export const preventDefault = (ev) => {
    if (ev.preventDefault) {
        ev.preventDefault();
    }
    else if (ev.stopPropagation) {
        ev.stopPropagation();
    }
    else return false;
}

export const addEventListener = (el, type, fallback) => {
    if (el.addEventListener) {
        el.addEventListener(type, fallback, false);
    }
    else if (el.attachEvent) {
        el.attachEvent(`on${type}`, fallback);
    }
}

export const removeEventListener = (el,type,callback)=> {
    if (el.removeEventListener){
        el.removeEventListener(type,callback,false);
    }
    else{
        el.detachEvent(`on${type}`, callback);
    }
}

export const classOrId = {
    _class(el, name) {
        if (el.classList) {
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

export function setClassName (arrNode, callback) {
    for (let node of arrNode) {
        if (node.classList) {
            node.setAttribute('class', callback(node.classList.value));
        }
        else if (items.className) {
            node.setAttribute('class', callback(node.className.value));
        }
    }
}