 
codialog.prototype.showMask = function (obj) {
  // 显示遮罩层 default: true
  /** **
  ** 是否显示遮罩层 **
  - 添加了动画效果
  - dialog层嵌套在mask遮罩层里面
  - 不能给dialog设置position属性
  - 只能给dialog设置backgound背景透明
  ** **/
  var currentDialogElement = this.$(this.dialogElement);
  if (typeof obj.isMask != 'undefined' && typeof obj.isMask == 'boolean' && this.find(currentDialogElement,'[mask]')) {
      if (!obj.isMask) {
          this.find(currentDialogElement,'[mask]').style.backgroundColor = 'transparent';
      }
  }
}