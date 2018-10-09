 
codialog.prototype.x_string = function (obj,args) {
    // 情况1：传入''字符串
    if (args.length && typeof obj == 'string' && this.xString.push(args)) {
        switch (this.xString[0].length) {
            case 1:
                obj = {
                    message: this.xString[0][0],
                    onHeaderBefore: function () {
                        this.style.display = 'none'
                    }
                };
                break;
            case 2:
                var getSecondPart = this.xString[0][1];
                obj = {
                    title: this.xString[0][0],
                    message: typeof getSecondPart == 'string' ? getSecondPart : 'No message text'
                };
                break;
            case 3:
                var getSecondPart = this.xString[0][1];
                var getThirdPart = this.xString[0][2];
                obj = {
                    title: this.xString[0][0],
                    message: typeof getSecondPart == 'string' ? getSecondPart : 'No message',
                    confirmButtonText: typeof getThirdPart == 'string' ? getThirdPart : 'No confirm text'
                };
                break;
            default:
                break;
        }
        this.xString = [];
    }
}