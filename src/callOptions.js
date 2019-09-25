import  { isFun } from './staticMethods.js'

const getMessage = function (attr, msg) {
    let dialogElement = this.$(this.dialogElement)
    if (dialogElement) {
        attr = this.find(dialogElement,attr)
        if (attr) {
            return attr[msg]
        }
    }
}

const getStyle = function (attr, properties) {
    let dialogElement = this.$(this.dialogElement)
    if (dialogElement) {
        attr = this.find(dialogElement,attr)
        if (attr) {
            return attr.style[properties]
        }
    }
}

const setStyle = function (attr, properties, params) {
    let dialogElement = this.$(this.dialogElement)
    if (dialogElement) {
        attr = this.find(dialogElement,attr)
        if (attr) {
            attr.style[properties] = params
        }
    }
}

export const getContent = function () {
    return getMessage.call(this, '[message]', 'innerHTML')
}

export const getTitle = function () {
    return getMessage.call(this, '[title]', 'innerHTML')
}

export const getTitleColor = function () {
    return getStyle.call(this, '[title]', 'color')
}

export const getConfirmColor = function () {
    return getStyle.call(this, '[confirm]', 'color')
}

export const setConfirmColor = function (params) {
    return setStyle.call(this, '[confirm]', 'color', params)
}

export const setTitleColor = function (params) {
    return setStyle.call(this, '[title]', 'color', params)
}