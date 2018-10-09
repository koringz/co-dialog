codialog.prototype.overtime = function  (obj) {
  // 超时自动关闭
  if (typeof obj.timeout != 'undefined' && typeof isNaN(obj.timeout)){
    this.hide({
        timeout: obj.timeout
    })
  }
}