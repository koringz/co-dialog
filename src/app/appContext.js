const {
    isStr
} = require('../staticMethods.js')

const { 
    dialogTemplate 
} = require('../dialogTemplate.js')

const { 
    createDivAndSetAttribute
} = require('../domMethods.js')

export function appPushNewElements (attr) {
    if (isStr(attr), attr.search(/^(\.|\#)/) + 1, attr.slice(1).search(/^[\_|(a-zA-Z)]/) + 1) {
        var getElement = createDivAndSetAttribute(attr);
        getElement.innerHTML += dialogTemplate();
        document.body.appendChild(getElement);

        this.dialogElement = attr || null;
        this.cacheDialogElement.push(attr);
        return true
    } else return false
}
