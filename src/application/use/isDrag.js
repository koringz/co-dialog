codialog.prototype.isDrag = function (obj) {
  var self = this;
  // 开启抓手特效
  // 只有点击之后才有手势效果
  if (typeof obj.isDrag != 'undefined' && obj.isDrag) {
      var ready = true;
      var dragCurrentDialog = {};
      var mouseCurrentPosition = {};
      var mouseMovePosition = {};

      if(typeof obj.isGesture != 'undefined' && obj.isGesture) {
          this.rootDirectory.dialog.style.cursor = 'move';
      }
      else {
          this.rootDirectory.dialog.style.cursor = 'unset';
      }
      
      var dialog = this.rootDirectory.dialog;
      this.addEventListener(dialog, 'mousedown', function (ev) {
          // 第一次重置居左 
          // dialog的left和top属性都统一到矢量位移上
          dragCurrentDialog = {
              x: dialog.offsetLeft - document.body.scrollLeft,
              y: dialog.offsetTop -  document.body.scrollTop
          };

          mouseCurrentPosition = {
              x: ev.screenX,
              y: ev.screenY
          };

          ready = true;

          var mousemove = function (evt) {
              if(ready) {
                  // 鼠标的窗口位移坐标
                  mouseMovePosition = {
                      x: evt.screenX,
                      y: evt.screenY
                  };

                  dragCurrentDialog.x += (mouseMovePosition.x - mouseCurrentPosition.x);
                  dragCurrentDialog.y += (mouseMovePosition.y - mouseCurrentPosition.y);

                  mouseCurrentPosition = mouseMovePosition;

                  // 鼠标的位移变化
                  dialog.style.left = dragCurrentDialog.x + 'px';
                  dialog.style.top = dragCurrentDialog.y + 'px';

                  self.preventDefault(ev);
              }
          };

          self.addEventListener(self.$(document), 'mousemove', mousemove);

          self.addEventListener(self.$(document), 'mouseup', function (ev) {
              self.removeEventListener(dialog.ownerDocument,'mouseover', mousemove);
              ready = false;
              self.preventDefault(ev);
          });

          self.preventDefault(ev);
      });
  }
}