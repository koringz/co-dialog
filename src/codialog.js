import codialog from './index.js'
import operatorChain from './operatorChain.js'

class coog {
	constructor(options) {
	}
}

Object.assign(coog, operatorChain)

Object.assign(coog.prototype, codialog.prototype)

const Coog = coog

export { Coog }