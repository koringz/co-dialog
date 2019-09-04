import codialog from './codialog.js'
import operatorChain from './operatorChain.js'

class coog {
	constructor(options) {
	}
}

Object.assign(coog, operatorChain)

Object.assign(coog.prototype, codialog.prototype)

const Coog = coog

export default Coog