
function isUndefined (options) {
    return typeof options == 'undefined'
}

function isFun (options) {
    return typeof options != 'undefined' && typeof options == 'function'
}

function isObj (options) {
    return typeof options != 'undefined' && options instanceof Object
}

function isArr (options) {
    return typeof options != 'undefined' && options instanceof Array
}

function isStr (options) {
    return typeof options != 'undefined' && typeof options == 'string'
}
