import { isFun, isStr, inArray } from './staticMethods.js'

export const getNodeElement = (parent, childElement) => {
    return parent.querySelector(`${childElement}`)
}

export const getAllNodeElement = (parent, childElement) => {
    return parent.querySelectorAll(`${childElement}`)
}