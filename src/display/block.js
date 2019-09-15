import { isNum, isFun} from './../staticMethods.js'
import resetScroll from './../resetScroll.js'

export const showHandle = (self, _currentElements, options) => {
    if (isNum(options.timeout)) {
        self.setTimer = setTimeout(() => {
            if (self.setTimer) {
                clearTimeout(self.setTimer);
            }

            _currentElements.style.display = 'block';
            resetScroll(' codialog-show', true);
            options.timeout = null;
        },
        options.timeout);
    }

    if (isFun(options.callback)) {
        options.callback(_currentElements);
    }
}

export const hideHandle = (self, _currentElements, options) => {
    if (isNum(options.timeout)) {
        self.setTimer = setTimeout(() => {
            if (self.setTimer) {
                clearTimeout(self.setTimer);
            }

            _currentElements.style.display = 'none';
            resetScroll(' codialog-show', false);
        },
        options.timeout);
    }

    if (isFun(options.callback)) {
        options.callback(_currentElements);
    }
}