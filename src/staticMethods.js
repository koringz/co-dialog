// default static methods
export const isUndefined = (options) => typeof options == 'undefined'

export const isExist = (options) => !isUndefined(options)

export const isNan = (options) => isNaN(options)

export const isFun = (options) => isExist(options) && typeof options == 'function'

export const isObj = (options) => isExist(options) && Object.prototype.toString.call(options) == '[object Object]'

export const isNull = (options) => isExist(options) && Object.prototype.toString.call(options) == '[object Null]'

export const isArr = (options) => isExist(options) && options instanceof Array

export const isStr = (options) => isExist(options) && typeof options == 'string'

export const isBoolean = (options) => isExist(options) && typeof options == 'boolean'

export const isNum = (options) => isExist(options) && typeof options == 'number'

export const isTrue = (options) => isBoolean(options) && options

export const isFalse = (options) => isBoolean(options) && !options

// 验证是否为空对象
export const isEmptyObj = (io) => {
    for (var dist in io) {
        return !1
    }
    return !0
}

export const search = (options,val) => {
    if (isStr(options) && options.search(val) + 1) {
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
  if (isExist(options)) {
    if (isFun(options.forEach)) {
      options.forEach(fallback, context || {})
      return;
    }
    for (var i =0; i < options.length; i++) {
      isFun(fallback) ? fallback.call(context || null, options[i], i) : nul
    }
  }
}

export const clone = (options) => {
    if (options instanceof Object) {
        if (isExist(JSON)) return JSON.parse(JSON.stringify(options))
        else return options
    }
}

export const objectKey = (options) => {
    if (!options) return null;
    if (Object.keys) {
        return Object.keys(options);
    }
    var arrKey = [];
    for (var k in options) {
        if (Object.prototype.hasOwnProperty.call(options, k)){
            arrKey.push(k)
        }
    }
    return arrKey
}

export const inArray = (val, arr) => {
    if (isStr(val) || isNum(arr)) {
        for (var i =0, len = arr.length; i < len; i++) {
            if (arr[i] == val) {
                return 1
            }
        }
        return !1
    }
    return !1
}

export const isArray = (arr) => {
    if (Array.isArray) {
        return Array.isArray(arr)
    }
    else if (isArr(arr)) {
        return true
    }
    else {
        return false;
    }
}