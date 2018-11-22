import { isExist } from './staticMethods.js'

// validate style exist
const validateBrowserCompatiblityAnimationEvent = function (el, eventObjectName) {
    for(const k in eventObjectName) {
        if(isExist(el.style[k])) {
            return eventObjectName[k]
        }
    }
}

export default validateBrowserCompatiblityAnimationEvent