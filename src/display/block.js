import { isNum, isFun} from './../staticMethods.js'
import resetScroll from './../resetScroll.js'

export const showHandle = (self, _currentElements, options) => {
    if (isNum(options.timeout)) {
        self.setTimer = setTimeout(() => {
            if (self.setTimer) {
                clearTimeout(self.setTimer);
            }

            _currentElements.style.display = 'block';
            resetScroll({
                name: 'add',
                value: ' codialog-show'
            });
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
            resetScroll({
                name: 'remove',
                value: ' codialog-show'
            });
        },
        options.timeout);
    }

    if (isFun(options.callback)) {
        options.callback(_currentElements);
    }
}