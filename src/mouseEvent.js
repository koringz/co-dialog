import { classList } from './domMethods.js'

let ignoreBorderSideClick = false;

export const mouseEvent = (self, dialog, mask) => {
    // 默认点击mask隐藏弹出框 点击dialog不会隐藏弹出框
    mask.onclick = (ea) => {
        if (ignoreBorderSideClick) {
            return ignoreBorderSideClick = false, null;
        }
        ea = ea || window.event;
        if ((ea.target || ea.srcElement) == mask) {
            // 点击外边框 清除timeout未到时间关闭的定时器
            if (self.setTimer) {
                clearTimeout(self.setTimer);
            }

            self.$(self.dialogElement).style.display = 'none';

            {
                // 重置scrollTop属性
                classList(document.body, classList(document.body).replace(' codialog-show', ''), '');
                classList(document.documentElement, classList(document.documentElement).replace(' codialog-show', ''), '');
                document.body.style.paddingRight = 0
            }
        }
    }

    dialog.onmousedown = () => {
        mask.onmouseup = (ea) => {
            mask.onmouseup = null;
            ea = ea || window.event;
            if ((ea.target || ea.srcElement) == mask) {
                ignoreBorderSideClick = true;
            }
        }
    }

    mask.onmousedown = () => {
        dialog.onmouseup = (ea) => {
            dialog.onmouseup = null;
            ea = ea || window.event;
            if ((ea.target || ea.srcElement) == dialog || dialog.contains(ea.target || ea.srcElement)) {
                ignoreBorderSideClick = true;
            }
        }
    }
}