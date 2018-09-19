
/*

trim

search

isArray

*/



        codialog.prototype.inArray = function (val, arr) {
            if(typeof val == 'string' || typeof val == 'number') {
                for(var i =0, len = arr.length; i < len; i++) {
                    if(arr[i] == val) {
                        return 1
                    }
                }
                return !1
            }
            return !1
        }


        codialog.prototype.isArray = function (arr) {
            if(Array.isArray) {
                return Array.isArray(arr)
            }
            else if(typeof arr != 'undefined' && Object.prototype.toString.call(arr) == '[object Array]') {
                return true
            }
            else return false;
        }

        
        codialog.prototype.search = function (options,val) {
            if(typeof options == 'string' && options.search(val) + 1) {
                return !0
            }
            return !1
        }

        codialog.prototype.trim = function (options) {
            if (this.search(options,' ')) {
                return options.replace(/(\s*)/g, '')
            }
            return options
        }