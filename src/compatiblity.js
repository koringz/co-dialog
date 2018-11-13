import { isExist } from './staticMethods.js'

// validate style exist
export const validateBrowserCompatiblityAnimationEvent = (el, eventObjectName) => {
    for(const k in eventObjectName) {
        if(isExist(el.style[k])) {
            return eventObjectName[k]
        }
    }
}