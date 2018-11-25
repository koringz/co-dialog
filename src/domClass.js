import { isFun, isStr, inArray } from './staticMethods.js'

const getClass = (parent, childClass) => {
    return parent.querySelector(`.${childClass}`)
}

export default getClass