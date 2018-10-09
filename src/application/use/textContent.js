
codialog.prototype.textContent = function (obj) {
  // 重置属性绑定
  // 改变默认的文本和节点数据
  if (typeof obj.title != 'undefined' && typeof obj.title == 'string' && this.find(this.rootDirectory.header,'[title]')) {
      this.find(this.rootDirectory.header,'[title]').innerHTML = obj.title;
  }
  if (typeof obj.message != 'undefined' && typeof obj.message == 'string' && this.find(this.rootDirectory.body,'[message]')) {
      this.find(this.rootDirectory.body,'[message]').innerHTML = this.message || obj.message;
  }
  if (typeof obj.cancleButtonText != 'undefined' && typeof obj.cancleButtonText == 'string' && this.find(this.rootDirectory.footerButton, '[cancle]')) {
      this.find(this.rootDirectory.footerButton, '[cancle]').textContent = obj.cancleButtonText
  }
  if (typeof obj.confirmButtonText != 'undefined' && typeof obj.confirmButtonText == 'string' && this.find(this.rootDirectory.footerButton, '[confirm]')) {
      this.find(this.rootDirectory.footerButton, '[confirm]').textContent = obj.confirmButtonText
  }
  if (typeof obj.cancleButtonColor != 'undefined' && typeof obj.cancleButtonColor == 'string' && this.find(this.rootDirectory.footerButton, '[cancle]')) {
      this.find(this.rootDirectory.footerButton, '[cancle]').style.color = obj.cancleButtonColor
  }
  if (typeof obj.confirmButtonColor != 'undefined' && typeof obj.confirmButtonColor == 'string' && this.find(this.rootDirectory.footerButton, '[confirm]')) {
      this.find(this.rootDirectory.footerButton, '[confirm]').style.color = obj.confirmButtonColor
  }
  if (typeof obj.cancleButtonBackground != 'undefined' && typeof obj.cancleButtonBackground == 'string' && this.find(this.rootDirectory.footerButton, '[cancle]')) {
      this.find(this.rootDirectory.footerButton, '[cancle]').style.background = obj.cancleButtonBackground
  }
  if (typeof obj.confirmButtonBackground != 'undefined' && typeof obj.confirmButtonBackground == 'string' && this.find(this.rootDirectory.footerButton, '[confirm]')) {
      this.find(this.rootDirectory.footerButton, '[confirm]').style.background = obj.confirmButtonBackground
  }
  if (typeof obj.titleColor != 'undefined' && typeof obj.titleColor == 'string' && this.find(this.rootDirectory.header, '[title]')) {
      this.find(this.rootDirectory.header, '[title]').style.color = obj.titleColor
  }
  if (typeof obj.closeColor != 'undefined' && typeof obj.closeColor == 'string' && this.find(this.rootDirectory.header, '[close]')) {
      this.find(this.rootDirectory.header, '[close]').style.color = obj.closeColor
  }
  if (typeof obj.messageColor != 'undefined' && typeof obj.messageColor == 'string' && this.find(this.rootDirectory.body, '[message]')) {
      this.find(this.rootDirectory.body, '[message]').style.color = obj.messageColor
  }
}