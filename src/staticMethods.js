// default static methods 
export const isUndefined = (options) => {
    return typeof options == 'undefined'
}

export const isExist = (options) => {
    return !isUndefined(options)
}

export const isFun = (options) => {
    return isExist(options) && typeof options == 'function'
}

export const isObj = (options) => {
    return isExist(options) && Object.prototype.toString.call(options) == '[object Object]'
}

export const isNull = (options) => {
    return isExist(options) && Object.prototype.toString.call(options) == '[object Null]'
}

export const isArr = (options) => {
    return isExist(options) && options instanceof Array
}

export const isStr = (options) => {
    return isExist(options) && typeof options == 'string'
}

export const isBoolean = (options) => {
    return isExist(options) && typeof options == 'boolean'
}

export const isTrue = (options) => {
  return isBoolean(options) && options
}

export const isFalse = (options) => {
  return isBoolean(options) && !options
}

export const isNum = (options) => {
    return isExist(options) && typeof options == 'number'
}

// 验证是否为空对象
export const isEmptyObj = (io) => {
    for (var dist in io) {
        return !1
    }
    return !0
}

export const isNan = (options) => {
    return isExist(options) && isNaN(options)
}

export const search = (options,val) => {
    if(isStr(options) && options.search(val) + 1) {
        return !0
    }
    return !1
}

export const trim = (options) => {
    if (search(options,' ')) {
        return options.replace(/(\s*)/g, '')
    }
    return options
}


export const forEach = (options, fallback, context) => {
  if(isExist(options)) {
    if(isFun(options.forEach)) {
      options.forEach(fallback, context || {})
      return;
    }
    for(var i =0; i < options.length; i++) {
      isFun(fallback) ? fallback.call(context || null, options[i], i) : nul
    }
  }
}

export const clone = (options) => {
    if(options instanceof Object) {
        if(isExist(JSON)) return JSON.parse(JSON.stringify(options))
        else return options
    }
}

export const assign = (orignal, objectGroup) => {
    if(isUndefined(objectGroup)) {
        return null;
    }
    if(isObj(objectGroup)) {
        for(var o in objectGroup) {
            orignal[o] = objectGroup[o];
        }
        return orignal;
    }
}

export const objectKey = (options) => {
    if(!options) return null;
    if(Object.keys) {
        return Object.keys(options);
    }
    var arrKey = []; 
    for(var k in options) {
        if(Object.prototype.hasOwnProperty.call(options, k)){
            arrKey.push(k)
        }
    }
    return arrKey
}

export const inArray = (val, arr) => {
    if(isStr(val) || isNum(arr)) {
        for(var i =0, len = arr.length; i < len; i++) {
            if(arr[i] == val) {
                return 1
            }
        }
        return !1
    }
    return !1
}

export const isArray = (arr) => {
    if(Array.isArray) {
        return Array.isArray(arr)
    }
    else if(isArr(arr)) {
        return true
    }
    else return false;
}

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
        ev.stopPropagation()
    }
    else return false;
}

export const addEventListener = (el, type, fallback) => {
    if(el.addEventListener) {
        el.addEventListener(type, fallback, false)
    }
    else if(el.attachEvent) {
        el.attachEvent('on' + type, fallback)
    }
}

export const removeEventListener = (el,type,callback)=> {
    if(el.removeEventListener){
        el.removeEventListener(type,callback,false);
    }
    else{
        el.detachEvent('on' + type, callback);
    }
}

// the first params exists
// and the second params is the callback methods
// this parameters will injected to fallback methods
// we can used the params as array objects
// call paramsAndCallback()
export const paramsAndCallback = (params, fallback) => {
  if(params) {
    fallback(params)
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
    var createDiv = document.createElement('div');

    if (options.charAt(0) == '.') {
        classOrId._class(createDiv, options.slice(1))
    }
    if (options.charAt(0) == '#') {
        classOrId._id(createDiv, options.slice(1))
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
