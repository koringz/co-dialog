const { isExist } = require('./staticMethods.js');

// validate style exist
export const validateBrowserCompatiblityAnimationEvent = (el, eventObjectName) => {
    for(var k in eventObjectName) {
        if(isExist(el.style[k])) {
            return eventObjectName[k]
        }
    }
}