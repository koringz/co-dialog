import  { isFun } from './staticMethods.js'

export const getContext = function (params) {
    let dialogElement = this.$(this.dialogElement)
    if (dialogElement) {
        let message = this.find(dialogElement,'[message]')
        if (message) {
            if (isFun(params)) {
                return params.call(this, message)
            }
            return message.innerHTML
        }
    }
}

export const getTitle = function (params) {
    let dialogElement = this.$(this.dialogElement)
    if (dialogElement) {
        let title = this.find(dialogElement,'[title]')
        if (title) {
            if (isFun(params)) {
                return params.call(this, title)
            }
            return title.innerHTML
        }
    }
}