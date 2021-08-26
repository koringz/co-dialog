(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Coog = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  // default static methods
  var isUndefined = function isUndefined(options) {
    return typeof options == 'undefined';
  };
  var isExist = function isExist(options) {
    return !isUndefined(options);
  };
  var isNan = function isNan(options) {
    return isNaN(options);
  };
  var isFun = function isFun(options) {
    return isExist(options) && typeof options == 'function';
  };
  var isObj = function isObj(options) {
    return isExist(options) && Object.prototype.toString.call(options) == '[object Object]';
  };
  var isNull = function isNull(options) {
    return isExist(options) && Object.prototype.toString.call(options) == '[object Null]';
  };
  var isArr = function isArr(options) {
    return isExist(options) && options instanceof Array;
  };
  var isStr = function isStr(options) {
    return isExist(options) && typeof options == 'string';
  };
  var isBoolean = function isBoolean(options) {
    return isExist(options) && typeof options == 'boolean';
  };
  var isNum = function isNum(options) {
    return isExist(options) && typeof options == 'number';
  };
  var isTrue = function isTrue(options) {
    return isBoolean(options) && options;
  };
  var isFalse = function isFalse(options) {
    return isBoolean(options) && !options;
  }; // 验证是否为空对象

  var isEmptyObj = function isEmptyObj(io) {
    for (var dist in io) {
      return !1;
    }

    return !0;
  };
  var search = function search(options, val) {
    if (isStr(options) && options.search(val) + 1) {
      return !0;
    }

    return !1;
  };
  var trim = function trim(options) {
    if (search(options, ' ')) {
      return options.replace(/(\s*)/g, '');
    }

    return options;
  };
  var forEach = function forEach(options, fallback, context) {
    if (isExist(options)) {
      if (isFun(options.forEach)) {
        options.forEach(fallback, context || {});
        return;
      }

      for (var i = 0; i < options.length; i++) {
        isFun(fallback) ? fallback.call(context || null, options[i], i) : nul;
      }
    }
  };
  var clone = function clone(options) {
    if (options instanceof Object) {
      if (isExist(JSON)) return JSON.parse(JSON.stringify(options));else return options;
    }
  };
  var objectKey = function objectKey(options) {
    if (!options) return null;

    if (Object.keys) {
      return Object.keys(options);
    }

    var arrKey = [];

    for (var k in options) {
      if (Object.prototype.hasOwnProperty.call(options, k)) {
        arrKey.push(k);
      }
    }

    return arrKey;
  };
  var inArray = function inArray(val, arr) {
    if (isStr(val) || isNum(arr)) {
      for (var i = 0, len = arr.length; i < len; i++) {
        if (arr[i] == val) {
          return 1;
        }
      }

      return !1;
    }

    return !1;
  };
  var isArray = function isArray(arr) {
    if (Array.isArray) {
      return Array.isArray(arr);
    } else if (isArr(arr)) {
      return true;
    } else {
      return false;
    }
  };

  var staticMethods = /*#__PURE__*/Object.freeze({
    __proto__: null,
    isUndefined: isUndefined,
    isExist: isExist,
    isNan: isNan,
    isFun: isFun,
    isObj: isObj,
    isNull: isNull,
    isArr: isArr,
    isStr: isStr,
    isBoolean: isBoolean,
    isNum: isNum,
    isTrue: isTrue,
    isFalse: isFalse,
    isEmptyObj: isEmptyObj,
    search: search,
    trim: trim,
    forEach: forEach,
    clone: clone,
    objectKey: objectKey,
    inArray: inArray,
    isArray: isArray
  });

  var selfApi = ['onHeader', 'onBody', 'onFooter'];
  /*
  需要在dialog body里面加载其他元素, 比如图片的失效 和 其他图片icon信息
  或者添加一条新的节点信息
  */

  var defineRefs = function defineRefs(self, child) {
    var obj = new Object();
    var refList = self.find(child.children, '[ref]', []);
    forEach(refList, function (item) {
      if (item.getAttribute('ref')) {
        obj[item.getAttribute('ref')] = item;
      }
    });
    return obj;
  };

  var defaultRefs = function defaultRefs(PROTO) {
    selfApi.map(function (items) {
      PROTO[items] = function (child) {
        var self = this;
        return {
          $refs: defineRefs(self, child)
        };
      };
    });
  };

  var validateBrowserCompatiblityAnimationEvent = function validateBrowserCompatiblityAnimationEvent(el, eventObjectName) {
    for (var k in eventObjectName) {
      if (isExist(el.style[k])) {
        return eventObjectName[k];
      }
    }
  };

  var contains = function contains(node) {
    return node === document.body ? false : document.body.contains(node);
  };
  var removeChild = function removeChild(child) {
    if (isExist(child)) return null;

    if (child.parentElement.removeChild) {
      return child.parentElement.removeChild(child);
    }

    return child.parentElement.removeNode(child);
  };
  var preventDefault = function preventDefault(ev) {
    if (ev.preventDefault) {
      ev.preventDefault();
    } else if (ev.stopPropagation) {
      ev.stopPropagation();
    } else return false;
  };
  var addEventListener = function addEventListener(el, type, fallback) {
    if (el.addEventListener) {
      el.addEventListener(type, fallback, false);
    } else if (el.attachEvent) {
      el.attachEvent("on".concat(type), fallback);
    }
  };
  var removeEventListener = function removeEventListener(el, type, callback) {
    if (el.removeEventListener) {
      el.removeEventListener(type, callback, false);
    } else {
      el.detachEvent("on".concat(type), callback);
    }
  };
  var classOrId = {
    _class: function _class(el, name) {
      if (el.classList) {
        el.setAttribute('class', name);
      } else {
        el.className = name;
      }
    },
    _id: function _id(el, name) {
      el.setAttribute('id', name);
    }
  };
  var createDivAndSetAttribute = function createDivAndSetAttribute(options) {
    var createDiv = document.createElement('div');

    if (options.charAt(0) == '.') {
      classOrId._class(createDiv, options.slice(1));
    }

    if (options.charAt(0) == '#') {
      classOrId._id(createDiv, options.slice(1));
    }

    return createDiv;
  };
  function setClassName(arrNode, callback) {
    var _iterator = _createForOfIteratorHelper(arrNode),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var node = _step.value;

        if (node.classList) {
          node.setAttribute('class', callback(node.classList.value));
        } else if (items.className) {
          node.setAttribute('class', callback(node.className.value));
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  // static parameters
  var $default = {
    title: '',
    // 内容 ui
    message: '',
    // 内容 ui
    footerText: '',
    // 内容 ui
    layout: 'center',
    timeout: 0,
    // setTimeout
    isGesture: true,
    // 处理 evnet
    isDrag: false,
    // 处理 evnet
    isClose: true,
    // 处理 evnet
    onResize: true,
    // 处理 event
    type: '',
    // 显示 ui
    isMask: true,
    // 显示 ui
    animation: true,
    // 显示 ui
    customAnimation: 'bounceIn',
    // 显示 ui
    titleColor: '#9A9B9C',
    // 显示 ui
    closeColor: '#9A9B9C',
    // 显示 ui
    messageColor: '#696969',
    // 显示 ui
    showCloseButton: true,
    // 显示 ui
    showCancleButton: false,
    // 显示 ui
    showConfirmButton: true,
    // 显示 ui
    cancleButtonText: '取消',
    // 内容 ui
    confirmButtonText: '确定',
    // 内容 ui
    cancleButtonColor: '#fff',
    // 显示 ui
    confirmButtonColor: '#fff',
    // 显示 ui
    cancleButtonBackground: '#aaa',
    // 显示 ui
    confirmButtonBackground: '#51BF8C',
    // 显示 ui
    methods: function methods() {},
    onDialogBefore: function onDialogBefore() {},
    onHeaderBefore: function onHeaderBefore() {},
    onBodyBefore: function onBodyBefore() {},
    onFooterBefore: function onFooterBefore() {},
    onDialogAfter: function onDialogAfter() {},
    onHeaderAfter: function onHeaderAfter() {},
    onBodyAfter: function onBodyAfter() {},
    onFooterAfter: function onFooterAfter() {},
    confirmCallback: function confirmCallback() {},
    cancleCallback: function cancleCallback() {}
  };
  var animatiomApi = ['bounce', 'flash', 'pulse', 'rubberBand', 'shake', 'headShake', 'bounceOutLeft', 'swing', 'tada', 'wobble', 'jello', 'bounceIn', 'bounceInDown', 'fadeInDownBig', 'bounceInLeft', 'bounceInRight', 'bounceInUp', 'bounceOut', 'bounceOutDown', 'bounceOutRight', 'bounceOutUp', 'fadeIn', 'fadeInDown', 'rotateInUpLeft', 'fadeInLeftBig', 'fadeInRight', 'fadeInRightBig', 'fadeInUp', 'fadeInUpBig', 'fadeOutDown', 'fadeOutDownBig', 'fadeOutLeft', 'fadeOutLeftBig', 'fadeOutRight', 'fadeOutUp', 'fadeOutUpBig', 'flipInX', 'flipInY', 'flipOutX', 'flipOutY', 'fadeInLeft', 'lightSpeedIn', 'lightSpeedOut', 'rotateIn', 'rotateInDownLeft', 'rotateInDownRight', 'rotateInUpRight', 'rotateOut', 'rotateOutDownLeft', 'rotateOutDownRight', 'zoomOutLeft', 'hinge', 'jackInTheBox', 'rollIn', 'rollOut', 'zoomIn', 'zoomInDown', 'rotateOutUpRight', 'zoomInLeft', 'zoomInRight', 'zoomInUp', 'zoomOut', 'zoomOutDown', 'rotateOutUpLeft', 'zoomOutRight', 'zoomOutUp', 'slideInDown', 'slideInLeft', 'slideInRight', 'slideInUp', 'slideOutDown', 'slideOutLeft', 'slideOutRight', 'fadeOutRightBig', 'fadeOut', 'slideOutUp'];
  var supportBrowserAnimationEventOfName_start = {
    "excuteAnimation": "animationstart",
    "OAnimation": "oAnimationStart",
    "MozAnimation": "animationstart",
    "WebkitAnimation": "webkitAnimationStart",
    'MSAnimation': 'MSAnimationStart'
  };
  var supportBrowserAnimationEventOfName_final = {
    "excuteAnimation": "animationend",
    "OAnimation": "oAnimationEnd",
    "MozAnimation": "animationend",
    "WebkitAnimation": "webkitAnimationEnd",
    'MSAnimation': 'MSAnimationEnd'
  };

  var aniConfig = {};

  var animation = /*#__PURE__*/function () {
    function animation(options) {
      _classCallCheck(this, animation);

      this.animationElement = [];
      this.animationName = 'bounceOut';
    } // base on co-ani plugins api


    _createClass(animation, [{
      key: "animate",
      value: function animate(options) {
        this.animationElement = [options];
        var that = this;
        animatiomApi.map(function (items) {
          animation.prototype[items] = that.callAnimationApi;
        });
        return this;
      }
    }, {
      key: "callAnimationApi",
      value: function callAnimationApi(_animationName, _animationConfig) {
        this.animationName = _animationName;
        aniConfig = _animationConfig; // 开始执行初始回调  第一次执行动画 需要display : block

        if (aniConfig.type === 'start' && isFun(aniConfig.callback)) {
          aniConfig.callback();
        }

        return this;
      }
    }, {
      key: "excuteAnimation",
      value: function excuteAnimation(showAndHideApi) {
        var _this = this;

        var getNodeList = document.querySelector(this.animationElement[0]);
        var supportsAntEvent_final = validateBrowserCompatiblityAnimationEvent(getNodeList, supportBrowserAnimationEventOfName_final);
        var supportsAntEvent_start = validateBrowserCompatiblityAnimationEvent(getNodeList, supportBrowserAnimationEventOfName_start);

        if (showAndHideApi.type.toLowerCase() == 'end') {
          setClassName([getNodeList], function (params) {
            return "".concat(params, " ").concat(_this.animationName, " animatedHalf");
          });
        }

        if (showAndHideApi.type.toLowerCase() == 'start') {
          setClassName([getNodeList], function (params) {
            return "".concat(params, " ").concat(_this.animationName, " animated");
          });
        } // 2种情况
        // 显示弹出框时 有一次动画开始 到结束过程
        // 隐藏弹出框时 也有一次动画开始 到结束过程
        // 不同之处就是隐藏时  本身就显示的弹出框 可见动画被监听
        // 而之前隐藏的弹出框  不可见 就不会立马被监听


        var callAnimationEventStart = function callAnimationEventStart() {
          return removeEventListener(getNodeList, supportsAntEvent_start, callAnimationEventFinal);
        };

        var callAnimationEventFinal = function callAnimationEventFinal() {
          // 显示和隐藏的弹出框 都会监听一次结束

          /**
           * ***Note***
           * 切换另一个弹出框, 就要关闭当前的弹出框
           * 但是当前弹出框只有监听动画结束, 才去执行回调, 监听动画结束是一个监听事件, 
           * 通过异步回调执行(不能立即执行), 注意这时异步去执行另一个弹出框的情况, 等另一个执行结束回来执行当前弹出框回调,
           * 必须等待真正结束之后, 再调用另一个弹出框动画, 否则上一个和下一个弹出框会交叉执行
           */
          if (showAndHideApi.type.toLowerCase() === 'end') {
            showAndHideApi.callback(_this.animationName);
            setClassName([getNodeList], function (params) {
              return params.replace(new RegExp(" ".concat(_this.animationName, " animatedHalf"), 'gm'), '');
            }); // 执行另一个动画

            if (typeof _this.waitConfirmCallback === 'function') {
              _this.waitConfirmCallback();
            }
          }

          if (showAndHideApi.type.toLowerCase() === 'start') {
            setClassName([getNodeList], function (params) {
              return params.replace(new RegExp(" ".concat(_this.animationName, " animated"), 'gm'), '');
            });
          }

          removeEventListener(getNodeList, supportsAntEvent_final, callAnimationEventFinal);
          removeEventListener(getNodeList, supportsAntEvent_start, callAnimationEventStart);
        };

        addEventListener(getNodeList, supportsAntEvent_final, callAnimationEventFinal);
        addEventListener(getNodeList, supportsAntEvent_start, callAnimationEventStart);
      }
    }, {
      key: "render",
      value: function render() {
        this.excuteAnimation(aniConfig);
      }
    }]);

    return animation;
  }();

  var dialogNodeNamePart = ['header', 'body', 'footer'];
  function useOptions() {
    var _ref = arguments.length <= 0 ? undefined : arguments[0],
        obj = _ref.obj,
        dialog = _ref.dialog;
        _ref.mask;
        var header = _ref.header,
        body = _ref.body,
        footer = _ref.footer,
        footerButtonGroup = _ref.footerButtonGroup,
        currentDialogElement = _ref.currentDialogElement;

    if (isObj(obj)) onDialogHeaderBodyFooterMethod(obj, dialog, header, body, footer);
    coDialogTimeout(this, obj);
    coDialogIsDrag(this, obj, dialog);
    coDialogFooterText(this, obj, footer);
    coDilaogIsMask(this, obj, currentDialogElement);
    onDialogInnertextOrBasestyle(this, obj, header, body, footerButtonGroup);
    onDialogType(this, obj, body);
    onDialogMethods(this, obj, dialogNodeNamePart, currentDialogElement);
    onDialogIsClose(this, obj, header, footerButtonGroup);
    onDialogShowButton(this, obj, header, footerButtonGroup);
    onDialogAfter(obj, dialog, header, body, footer);
    onDialogOnresize(obj, dialog, currentDialogElement);
    coDialogAnimation(this, obj, currentDialogElement);
  }
  var onDialogHeaderBodyFooterMethod = function onDialogHeaderBodyFooterMethod(obj, dialog, header, body, footer) {
    // 在执行前处理节点属性设置
    if (obj.onDialogBefore || obj.onHeaderBefore || obj.onBodyBefore || obj.onFooterBefore) {
      if (isFun(obj.onDialogBefore)) {
        obj.onDialogBefore.call(dialog, dialog);
      }

      if (isFun(obj.onHeaderBefore)) {
        obj.onHeaderBefore.call(header, header);
      }

      if (isFun(obj.onBodyBefore)) {
        obj.onBodyBefore.call(body, body);
      }

      if (isFun(obj.onFooterBefore)) {
        obj.onFooterBefore.call(footer, footer);
      }
    }
  };
  var coDialogTimeout = function coDialogTimeout(self, obj) {
    // 超时自动关闭
    if (isNum(obj.timeout) && Number(obj.timeout) > 0) {
      self.hide({
        timeout: obj.timeout
      });
    }
  };
  var coDilaogIsMask = function coDilaogIsMask(self, obj, currentDialogElement) {
    /** **
    - 是否显示遮罩层
    - 添加了动画效果
    - dialog层嵌套在mask遮罩层里面
    - 不能给dialog设置position属性
    - 只能给dialog设置backgound背景透明
    ** **/
    if (isFalse(obj.isMask) && self.find(currentDialogElement, '[mask]')) {
      self.find(currentDialogElement, '[mask]').style.backgroundColor = 'transparent';
    }
  };
  var coDialogIsDrag = function coDialogIsDrag(self, obj, dialog) {
    // 开启抓手特效
    // 只有点击之后才有手势效果
    if (isTrue(obj.isDrag)) {
      var ready = true;
      var dragCurrentDialog = {};
      var mouseCurrentPosition = {};
      var mouseMovePosition = {};

      if (isTrue(obj.isGesture)) {
        dialog.style.cursor = 'move';
      } else {
        dialog.style.cursor = 'unset';
      }

      addEventListener(dialog, 'mousedown', function (ev) {
        // 第一次重置居左
        // dialog的left和top属性都统一到矢量位移上
        dragCurrentDialog = {
          x: dialog.offsetLeft - document.body.scrollLeft,
          y: dialog.offsetTop - document.body.scrollTop
        };
        mouseCurrentPosition = {
          x: ev.screenX,
          y: ev.screenY
        };
        ready = true;

        var mousemove = function mousemove(evt) {
          if (ready) {
            // 鼠标的窗口位移坐标
            mouseMovePosition = {
              x: evt.screenX,
              y: evt.screenY
            };
            dragCurrentDialog.x += mouseMovePosition.x - mouseCurrentPosition.x;
            dragCurrentDialog.y += mouseMovePosition.y - mouseCurrentPosition.y;
            mouseCurrentPosition = mouseMovePosition; // 鼠标的位移变化

            dialog.style.left = "".concat(dragCurrentDialog.x, "px");
            dialog.style.top = "".concat(dragCurrentDialog.y, "px");
          }
        };

        {
          addEventListener(self.$(document), 'mousemove', mousemove);
          addEventListener(self.$(document), 'mouseup', function (ev) {
            removeEventListener(dialog.ownerDocument, 'mouseover', mousemove);
            ready = false;
            preventDefault(ev);
          });
        }
        preventDefault(ev);
      });
    }
  };
  var coDialogFooterText = function coDialogFooterText(self, obj, footer) {
    // 底部有无按钮
    // 底部显示的是倒计时或者是其他信息
    // attr = [textGroup] or string
    var textGroupElement = self.find(footer, '[textGroup]');

    if (isStr(obj.footerText) && textGroupElement) {
      textGroupElement.innerHTML = obj.footerText;
    } else if (isArray(obj.footerText) && textGroupElement) {
      if (obj.footerText.length > 0) {
        textGroupElement.innerHTML = obj.footerText.concat().join('');
      }
    } else {
      if (textGroupElement) {
        removeChild(textGroupElement);
      }
    }
  };
  var onDialogInnertextOrBasestyle = function onDialogInnertextOrBasestyle(self, obj, header, body, footerButtonGroup) {
    // 重置属性绑定
    // 改变默认的文本和节点数据
    var content;

    if ((content = self.find(header, '[title]')) && content) {
      content.innerHTML = obj.title;
      content.style.color = obj.titleColor;
    }

    if ((content = self.find(body, '[message]')) && content) {
      content.innerHTML = self.message || obj.message;
      content.style.color = obj.messageColor;
    }

    if ((content = self.find(footerButtonGroup, '[confirm]')) && content) {
      content.textContent = obj.confirmButtonText;
      content.style.color = obj.confirmButtonColor;
      if (obj.confirmButtonBackground == '#51BF8C') ;else content.style.backgroundColor = obj.confirmButtonBackground;
    }

    if ((content = self.find(footerButtonGroup, '[cancle]')) && content) {
      content.textContent = obj.cancleButtonText;
      content.style.color = obj.cancleButtonColor;
      if (obj.cancleButtonBackground == '#aaa') ;else content.style.backgroundColor = obj.cancleButtonBackground;
    }

    if ((content = self.find(header, '[close]')) && content) {
      content.style.color = obj.closeColor;
    }
  };
  var onDialogType = function onDialogType(self, obj, body) {
    // 根据 type 不同显示弹出框
    // type:`success`, `error`, `warning`, `info`, `question`
    if (isStr(obj.type)) {
      var typeGroup = ['success', 'error', 'warning', 'info', 'question'];
      var types = obj.type.replace(/\s*/gi, '').toLowerCase();
      var isTruth = typeGroup.indexOf(types);

      if (isTruth != -1) {
        typeGroup.map(function (item) {
          if (types === item) {
            self.find(body, ".codialog-icon-".concat(item)).style.display = 'flex';
          } else {
            self.find(body, ".codialog-icon-".concat(item)).style.display = 'none';
          }
        });
      }
    }
  };
  var onDialogMethods = function onDialogMethods(self, obj, dialogNodeNamePart, currentDialogElement) {
    // 所有子节点都会被获取 进行修改
    // 但是都在before执行之后才执行methods
    if (isFun(obj['methods'])) {
      forEach(selfApi, function (items, index) {
        self[dialogNodeNamePart[index]] = self[items]({
          children: self.find(currentDialogElement, "[".concat(dialogNodeNamePart[index], "]"))
        });
      });
      obj.methods.call(self, currentDialogElement);
    }
  };
  var onDialogIsClose = function onDialogIsClose(self, obj, header, footerButtonGroup) {
    // 是否禁用 colse(关闭) dialog
    // 默认开启 colse x
    // default: true
    if (isTrue(obj.isClose)) {
      // 防止通过 this.dialogElement 元素查找失效
      self.$(self.dialogElement);

      var cacheCloseList = [];
      var headerClose = self.find(header, '[close]');

      if (!isNull(headerClose)) {
        cacheCloseList.push(headerClose);
      }

      var footerCancle = self.find(footerButtonGroup, '[cancle]');

      if (!isNull(footerButtonGroup), isExist(footerCancle)) {
        cacheCloseList.push(footerCancle);
      }

      var footerConfirm = self.find(footerButtonGroup, '[confirm]');

      if (!isNull(footerButtonGroup), !isNull(footerConfirm)) {
        cacheCloseList.push(footerConfirm);
      }

      if (cacheCloseList.length > 0) {
        forEach(cacheCloseList, function (close, index) {
          var currentNode = close;

          currentNode.onclick = function (e) {
            if (self.setTimer) {
              clearTimeout(self.setTimer);
            } // 确认按钮的回调函数


            if (isStr(currentNode.getAttribute('confirm')) && isFun(obj.confirmCallback)) {
              self.waitConfirmCallback = obj.confirmCallback;
            } // 取消按钮的回调函数
            else if (isStr(currentNode.getAttribute('cancle')) && isFun(obj.cancleCallback)) {
                self.waitCancleCallback = obj.cancleCallback;
              }

            self.hide();
            self.closeBackValue = true;
          };
        });
      }
    }
  };
  var onDialogShowButton = function onDialogShowButton(self, obj, header, footerButtonGroup) {
    // 是否显示关闭按钮 默认显示 true
    // 防止自定义获取不到节点
    // 显示取消按钮 默认隐藏 false
    // 防止自定义获取不到节点
    // 显示确定按钮 默认显示
    // 防止自定义获取不到节点
    var getClose, getCancle, getConfirm;

    if (isFalse(obj.showCloseButton) && (getClose = self.find(header, '[close]'), getClose) && isExist(getClose)) {
      getClose.style.display = 'none';
    }

    if (isTrue(obj.showCancleButton) && (getCancle = self.find(footerButtonGroup, '[cancle]'), getCancle) && isExist(getCancle)) {
      getCancle.style.display = 'inline-block';
    }

    if (isFalse(obj.showConfirmButton) && (getConfirm = self.find(footerButtonGroup, '[confirm]'), getConfirm) && isExist(getConfirm)) {
      getConfirm.style.display = 'none';
    }
  };
  var onDialogAfter = function onDialogAfter(obj, dialog, header, body, footer) {
    // 所有节点和函数都执行之后处理
    if (obj.onDialogAfter || obj.onHeaderAfter || obj.onBodyAfter || obj.onFooterAfter) {
      if (isFun(obj.onDialogAfter)) obj.onDialogAfter.call(dialog, dialog);
      if (isFun(obj.onHeaderAfter)) obj.onHeaderAfter.call(header, header);
      if (isFun(obj.onBodyAfter)) obj.onBodyAfter.call(body, body);
      if (isFun(obj.onFooterAfter)) obj.onFooterAfter.call(footer, footer);
    }
  };
  var onDialogOnresize = function onDialogOnresize(obj, dialog, currentDialogElement) {
    // layout 弹出框初始位置 上|下|左|右|居中|左上|左下|右上|右下
    if (isStr(obj.layout) && obj.layout.length) resize();
    if (isTrue(obj.onResize)) window.onresize = function () {
      return resize();
    };

    function resize() {
      var windowWidth = (document.documentElement || document.body).clientWidth;
      var windowHeidth = (document.documentElement || document.body).clientHeight; // offsetWidth 处理隐藏不能获取 offsetWidth style

      var isOpenDialog = false;

      if (currentDialogElement.style.display != 'block') {
        currentDialogElement.style.zIndex = '-9999';
        currentDialogElement.style.display = 'block';
        isOpenDialog = true;
      }

      var targetWidth = dialog.offsetWidth;
      var targetHeight = dialog.offsetHeight;

      if (isOpenDialog) {
        currentDialogElement.style.display = 'none';
        isOpenDialog = false;
      }

      currentDialogElement.style.zIndex = '9999';
      var getBraowserAxis = {
        x: windowWidth / 2,
        y: windowHeidth / 2
      };
      var getTargetAxis = {
        x: targetWidth / 2,
        y: targetHeight / 2
      };
      var currentPostion = obj.layout.toLowerCase().split(' '); // 过滤空字符串

      currentPostion = currentPostion.filter(function (items) {
        return items.length;
      }); // 默认重心位置

      function layoutDefaultCenter() {
        dialog.style.left = "".concat(getBraowserAxis.x - getTargetAxis.x, "px");
        dialog.style.top = "".concat(getBraowserAxis.y - getTargetAxis.y, "px");
      } // 只有一个位置


      var ten = 10;

      if (currentPostion.length == 1) {
        currentPostion = trim(currentPostion[0]);

        switch (currentPostion) {
          case 'center':
            layoutDefaultCenter();
            break;

          case 'left':
            dialog.style.left = "".concat(ten, "px");
            dialog.style.top = "".concat(getBraowserAxis.y - getTargetAxis.y, "px");
            break;

          case 'right':
            dialog.style.left = "".concat(windowWidth - targetWidth - ten, "px");
            dialog.style.top = "".concat(getBraowserAxis.y - getTargetAxis.y, "px");
            break;

          case 'top':
            dialog.style.left = "".concat(getBraowserAxis.x - getTargetAxis.x, "px");
            dialog.style.top = "".concat(ten, "px");
            break;

          case 'bottom':
            dialog.style.left = "".concat(getBraowserAxis.x - getTargetAxis.x, "px");
            dialog.style.top = "".concat(windowHeidth - targetHeight - ten, "px");
            break;

          default:
            layoutDefaultCenter();
            break;
        }
      } else if (currentPostion.length > 1) {
        // 有二个位置
        currentPostion = currentPostion.join(' ');

        if (currentPostion == 'left top' || currentPostion == 'top left') {
          dialog.style.left = "".concat(ten, "px");
          dialog.style.top = "".concat(ten, "px");
        } else if (currentPostion == 'left bottom' || currentPostion == 'bottom left') {
          dialog.style.left = "".concat(ten, "px");
          dialog.style.top = "".concat(windowHeidth - targetHeight - ten, "px");
        } else if (currentPostion == 'right top' || currentPostion == 'top right') {
          dialog.style.left = "".concat(windowWidth - targetWidth + ten, "px");
          dialog.style.top = "".concat(ten, "px");
        } else if (currentPostion == 'right bottom' || currentPostion == 'bottom right') {
          dialog.style.left = "".concat(windowWidth - targetWidth, "px");
          dialog.style.top = "".concat(windowHeidth - targetHeight - ten, "px");
        } else {
          layoutDefaultCenter();
        }
      }
    }
  };
  var coDialogAnimation = function coDialogAnimation(self, obj, currentDialogElement) {
    if (isBoolean(obj.animation) && currentDialogElement) {
      if (obj.animation) {
        self.hasAnimation = true;
      } else {
        if (isStr(obj.customAnimation)) {
          self.hasAnimation = false;
          self.customAnimation = obj.customAnimation;
        }
      }
    }
  };

  var dialogTemplate = "\n<div mask=\"\" class=\"codialog-mask\" aria-hidden=\"false\">\n    <div dialog=\"\" class=\"codialog-frame\" role=\"dialog\" aria-dialog=\"true\">\n        <div aria-dialogBox=\"true\" class=\"codialog-box\">\n            <div class=\"codialog-styles\">\n                <div header=\"\" class=\"codialog-styles-head dialog-header\">\n                    <div class=\"codialog-head-content\">\n                        <div title=\"\" ref=\"title\" class=\"codialog-head-title codialog-head-info\">\n                            <span ></span>\n                        </div>\n                        <div close=\"\" ref=\"close\" class=\"codialog-head-close\">\n                            <button type=\"button\" class=\"addClose\">\xD7</button>\n                        </div>\n                    </div>\n                </div>\n                <div body=\"\" class=\"codialog-styles-content dialog-body\">\n                    <div class=\"codialog-content-message\" dialog-body-overflow>\n                        <div class=\"codialog-icon codialog-icon-success\">\n                            <div class=\"codialog-success-ring\"></div>\n                            <span class=\"codialog-icon-success--line-small\"></span>\n                            <span class=\"codialog-icon-success--line-long\"></span>\n                        </div>\n                        <div class=\"codialog-icon codialog-icon-error\">\n                            <span class=\"codialog-icon-error--line-left\"></span>\n                            <span class=\"codialog-icon-error--line-right\"></span>\n                        </div>\n                        <div class=\"codialog-icon codialog-icon-warning\">\n                            <span class=\"codialog-icon-error--text\">!</span>\n                        </div>\n                        <div class=\"codialog-icon codialog-icon-info\">\n                            <span class=\"codialog-icon-info--text\">!</span>\n                        </div>\n                        <div class=\"codialog-icon codialog-icon-question\">\n                            <span class=\"codialog-icon-question--text\">?</span>\n                        </div>\n                        <div message=\"\" ref=\"message\" class=\"codialog-message-text message-text codialog-text\">\n                            <span></span>\n                        </div>\n                    </div>\n                </div>\n                <div footer=\"\" class=\"codialog-styles-foot dialog-footer\">\n                    <div class=\"codialog-foot-button codialog-foot-text\">\n                        <div textGroup=\"\" ref=\"text\" class=\"codialog-text-group\"></div>\n                        <div buttonGroup=\"\" ref=\"button\" class=\"codialog-button-group\">\n                            <button type=\"button\" confirm=\"\" class=\"primary codialog-group-btn\">\u786E\u5B9A</button>\n                            <button type=\"button\" cancle=\"\" class=\"cancle codialog-group-btn\">\u53D6\u6D88</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n";

  function appPushNewElements(attr) {
    if (attr.search(/^(\.|\#)/) + 1, attr.slice(1).search(/^[\_|(a-zA-Z)]/) + 1) {
      var getElement = createDivAndSetAttribute(attr);
      {
        getElement.innerHTML = dialogTemplate.replace(/(^|\n)\s*/g, '');
        document.body.appendChild(getElement);
      }
      {
        this.dialogElement = attr || null;
        this.cacheDialogElement.push(attr);
      }
      return true;
    } else return false;
  }

  /*
   *  重置scrollTop属性
   *  option = {
   *      name: 'add'|| 'remove',
   *      value: ' codialog-show'
   *  }
  */

  var resetScroll = function resetScroll(option) {
    var body = document.body;
    var domEl = document.documentElement; // 设置body时 不能给body css设置 width:100%
    // 防止padding不起作用

    var offsetWidth = body.offsetWidth;

    if (option.name === 'add') {
      setClassName([body, domEl], function (params) {
        return params + option.value;
      });
      body.style.paddingRight = "".concat(body.offsetWidth - offsetWidth, "px");
    }

    if (option.name === 'remove') {
      setClassName([body, domEl], function (params) {
        return params.replace(new RegExp(option.value, 'gm'), '');
      });
      body.style.paddingRight = 0;
    }
  };

  function excuteShowAnimation(options, currentDialogNode) {
    var resetDefaultAnimation = 'bounceIn'; // 兼容 animation.

    if (validateBrowserCompatiblityAnimationEvent(currentDialogNode, supportBrowserAnimationEventOfName_final) != undefined) {
      if (isFalse(this.hasAnimation)) resetDefaultAnimation = this.customAnimation || resetDefaultAnimation; // animation动画加载

      this.animate(options)[resetDefaultAnimation](resetDefaultAnimation, {
        type: 'start',
        callback: function callback() {
          // 动画未开始
          // 内部框不显示 高度为 0
          currentDialogNode.style.display = 'block';
          resetScroll({
            name: 'add',
            value: ' codialog-show'
          });
        }
      }).render();
    } else {
      // ie9 不兼容 animation.
      currentDialogNode.style.display = 'block';
      resetScroll({
        name: 'add',
        value: ' codialog-show'
      });
    }
  }

  function excuteHideAnimation(options, currentDialogNode) {
    // 兼容 animation.
    if (validateBrowserCompatiblityAnimationEvent(currentDialogNode, supportBrowserAnimationEventOfName_final) != undefined) {
      // animation动画加载
      this.animate(options).fadeOut('fadeOut', {
        type: 'end',
        callback: function callback() {
          currentDialogNode.style.display = 'none';
          resetScroll({
            name: 'remove',
            value: ' codialog-show'
          });
        }
      }).render();
    } else {
      // ie9 不兼容 animation.
      currentDialogNode.style.display = 'none';
      resetScroll({
        name: 'remove',
        value: ' codialog-show'
      });
    }
  }

  var getMessage = function getMessage(attr, msg) {
    var dialogElement = this.$(this.dialogElement);

    if (dialogElement) {
      attr = this.find(dialogElement, attr);

      if (attr) {
        return attr[msg];
      }
    }
  };

  var getStyle = function getStyle(attr, properties) {
    var dialogElement = this.$(this.dialogElement);

    if (dialogElement) {
      attr = this.find(dialogElement, attr);

      if (attr) {
        return attr.style[properties];
      }
    }
  };

  var setStyle = function setStyle(attr, properties, params) {
    var dialogElement = this.$(this.dialogElement);

    if (dialogElement) {
      attr = this.find(dialogElement, attr);

      if (attr) {
        attr.style[properties] = params;
      }
    }
  };

  var getContent = function getContent() {
    return getMessage.call(this, '[message]', 'innerHTML');
  };
  var getTitle = function getTitle() {
    return getMessage.call(this, '[title]', 'innerHTML');
  };
  var getTitleColor = function getTitleColor() {
    return getStyle.call(this, '[title]', 'color');
  };
  var getConfirmButtonColor = function getConfirmButtonColor() {
    return getStyle.call(this, '[confirm]', 'color');
  };
  var getCancleButtonColor = function getCancleButtonColor() {
    return getStyle.call(this, '[cancle]', 'color');
  };
  var getCloseColor = function getCloseColor() {
    return getStyle.call(this, '[close]', 'color');
  };
  var setCloseColor = function setCloseColor(params) {
    return setStyle.call(this, '[close]', 'color', params);
  };
  var setCancleButtonColor = function setCancleButtonColor(params) {
    return getStyle.call(this, '[cancle]', 'color', params);
  };
  var setConfirmButtonColor = function setConfirmButtonColor(params) {
    return setStyle.call(this, '[confirm]', 'color', params);
  };
  var setTitleColor = function setTitleColor(params) {
    return setStyle.call(this, '[title]', 'color', params);
  };

  var callOptions = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getContent: getContent,
    getTitle: getTitle,
    getTitleColor: getTitleColor,
    getConfirmButtonColor: getConfirmButtonColor,
    getCancleButtonColor: getCancleButtonColor,
    getCloseColor: getCloseColor,
    setCloseColor: setCloseColor,
    setCancleButtonColor: setCancleButtonColor,
    setConfirmButtonColor: setConfirmButtonColor,
    setTitleColor: setTitleColor
  });

  var getNodeElement = function getNodeElement(parent, childElement) {
    return parent.querySelector("".concat(childElement));
  };
  var getAllNodeElement = function getAllNodeElement(parent, childElement) {
    return parent.querySelectorAll("".concat(childElement));
  };

  var showHandle = function showHandle(self, _currentElements, options) {
    if (isNum(options.timeout)) {
      self.setTimer = setTimeout(function () {
        if (self.setTimer) {
          clearTimeout(self.setTimer);
        }

        _currentElements.style.display = 'block';
        resetScroll({
          name: 'add',
          value: ' codialog-show'
        });
        options.timeout = null;
      }, options.timeout);
    }

    if (isFun(options.callback)) {
      options.callback(_currentElements);
    }
  };
  var hideHandle = function hideHandle(self, _currentElements, options) {
    if (isNum(options.timeout)) {
      self.setTimer = setTimeout(function () {
        if (self.setTimer) {
          clearTimeout(self.setTimer);
        }

        _currentElements.style.display = 'none';
        resetScroll({
          name: 'remove',
          value: ' codialog-show'
        });
      }, options.timeout);
    }

    if (isFun(options.callback)) {
      options.callback(_currentElements);
    }
  };

  var ignoreBorderSideClick = false;
  var mouseEvent = function mouseEvent(self, dialog, mask) {
    // 默认点击mask隐藏弹出框 点击dialog不会隐藏弹出框
    mask.onclick = function (ea) {
      if (ignoreBorderSideClick) {
        return ignoreBorderSideClick = false, null;
      }

      ea = ea || window.event;

      if ((ea.target || ea.srcElement) == mask) {
        // 点击外边框 清除timeout未到时间关闭的定时器
        if (self.setTimer) {
          clearTimeout(self.setTimer);
        }

        self.$(self.dialogElement).style.display = 'none'; // 重置scrollTop属性

        resetScroll({
          name: 'remove',
          value: ' codialog-show'
        });
      }
    };

    dialog.onmousedown = function () {
      mask.onmouseup = function (ea) {
        mask.onmouseup = null;
        ea = ea || window.event;

        if ((ea.target || ea.srcElement) == mask) {
          ignoreBorderSideClick = true;
        }
      };
    };

    mask.onmousedown = function () {
      dialog.onmouseup = function (ea) {
        dialog.onmouseup = null;
        ea = ea || window.event;

        if ((ea.target || ea.srcElement) == dialog || dialog.contains(ea.target || ea.srcElement)) {
          ignoreBorderSideClick = true;
        }
      };
    };
  };

  var codialog = /*#__PURE__*/function (_animation) {
    _inherits(codialog, _animation);

    var _super = _createSuper(codialog);

    function codialog(options) {
      var _this;

      _classCallCheck(this, codialog);

      _this = _super.call(this, options);
      _this.name = 'Coog';
      _this.xString = [];
      _this.setTimer = null;
      _this.tracker = false;
      _this.version = 'v2.1.7';
      _this.hasAnimation = true;
      _this.closeBackValue = false;
      _this.cacheDialogElement = [];
      _this.customAnimation = 'bounceOut';
      _this.dialogElement = options || null;
      return _this;
    }

    _createClass(codialog, [{
      key: "app",
      value: function app(params) {
        if ((this.tracker = false) || contains(this.$(params))) {
          this.dialogElement = params; // 添加一个追踪当前类的条件
          // 通过 this.app('.dialog').tracker
          // 验证存在为true 否则为false
          // 一般用在 onDialogBefore\onHeaderBefore\onBodyBefore\onFooterBefore\methods 等函数里
          // 当函数里面使用dom动态添加外部节点时, 可以避免多次`appendChildren`添加
          // 比如 if (coog.app('.dialog').tracker) return; else dom.appendChildren(node)

          this.tracker = true;
        } else {
          var firstCheckedAppMethodOfParamsIsCorrect = appPushNewElements.call(this, params);

          if (!firstCheckedAppMethodOfParamsIsCorrect) {
            this.tracker = false;
            return window.console.warn("this methods .app(\"".concat(params, "\") accepts wrong parameters.you must define correct \"class\" and \"id\" and \"_\"")) && false;
          }
        }

        return this;
      }
    }, {
      key: "hide",
      value: function hide(options) {
        var _currentElements = this.$(this.dialogElement);

        if (this.isObj(options)) {
          hideHandle(this, _currentElements, options);
        } else if (this.isUndefined(options)) {
          excuteHideAnimation.call(this, "".concat(this.dialogElement, " [mask]"), _currentElements);
        }

        return this;
      }
    }, {
      key: "show",
      value: function show(options) {
        var _currentElements = this.$(this.dialogElement);

        if (this.isObj(options)) {
          showHandle(this, _currentElements, options);
        } else if (this.isUndefined(options)) {
          excuteShowAnimation.call(this, "".concat(this.dialogElement, " [dialog]"), _currentElements);
        }

        return this;
      }
    }, {
      key: "use",
      value: function use(obj, success_config) {
        var currentDialogElement = this.$(this.dialogElement);
        var dialog = this.find(currentDialogElement, '[dialog]');
        var mask = this.find(currentDialogElement, '[mask]');
        var header = this.find(currentDialogElement, '[header]');
        var body = this.find(currentDialogElement, '[body]');
        var footer = this.find(currentDialogElement, '[footer]');
        var footerButtonGroup = this.find(footer, '[buttonGroup]'); // 情况1：传入''字符串

        if (this.isStr(obj) && (this.xString = arguments, this.xString)) {
          switch (this.xString.length) {
            case 1:
              obj = {
                message: this.xString[0],
                onHeaderBefore: function onHeaderBefore() {
                  this.style.display = 'none';
                }
              };
              break;

            case 2:
              obj = {
                title: this.xString[0],
                message: this.isStr(this.xString[1]) ? this.xString[1] : 'No message text'
              };
              break;

            case 3:
              obj = {
                title: this.xString[0],
                message: this.isStr(this.xString[1]) ? this.xString[1] : 'No message',
                type: this.isStr(this.xString[2]) ? this.xString[2] : ''
              };
              break;

            default:
              obj = {
                title: this.xString[0],
                message: this.isStr(this.xString[1]) ? this.xString[1] : 'No message',
                type: this.isStr(this.xString[2]) ? this.xString[2] : ''
              };
              break;
          }

          this.xString = [];
        } // 多次调用 禁修改默认属性


        obj = _extends(this.clone($default), obj);
        useOptions.apply(this, [{
          obj: obj,
          dialog: dialog,
          mask: mask,
          header: header,
          body: body,
          footer: footer,
          footerButtonGroup: footerButtonGroup,
          currentDialogElement: currentDialogElement
        }]);
        mouseEvent(this, dialog, mask);
        return this;
      }
    }, {
      key: "$",
      value: function $(options) {
        if (options.nodeType === 9) return options.documentElement;else if (this.isFun(options.HTMLDocument)) return options;
        return this.find(document.body, options);
      }
    }, {
      key: "find",
      value: function find(parent, options, arr) {
        if ((typeof parent === "undefined" ? "undefined" : _typeof(parent)) == 'object') {
          if (this.isStr(options)) {
            if (this.isArr(arr)) {
              return getAllNodeElement(parent || parent.ownerDocument, options);
            }

            return getNodeElement(parent || parent.ownerDocument, options);
          }
        }
      }
    }]);

    return codialog;
  }(animation);
  defaultRefs(codialog.prototype);

  _extends(codialog.prototype, staticMethods, callOptions);

  function operatorChain() {}
  /*
   * 打通`Coog`库外部和内部进行连接起来
   * 并不是默认执行显示和隐藏,而是根据用户自定义设置`hide`和`show`实现需求功能.
   * 默认点击阴影部分会自动隐藏弹出框
   * Coog.app('.codialog').use({title: 'hello world! ^_^'})
   */

  operatorChain.app = function (options) {
    var instance = new codialog();
    return instance.app(options);
  };

  operatorChain.$ = function (options) {
    var instance = new codialog();
    return instance.$(options);
  };

  var coog = function coog(options) {
    _classCallCheck(this, coog);
  };

  _extends(coog, operatorChain);

  _extends(coog.prototype, codialog.prototype);

  var Coog = coog;

  return Coog;

})));

"undefined"!=typeof document&&function(e,t){var n=e.createElement("style");if(e.getElementsByTagName("head")[0].appendChild(n),n.styleSheet)n.styleSheet.disabled||(n.styleSheet.cssText=t);else try{n.innerHTML=t}catch(e){n.innerText=t}}(document,".codialog-mask{position:fixed;left:0;right:0;top:0;bottom:0;align-items:center;text-align:center;z-index:999;background-color:rgba(0,0,0,.4)}.codialog-show{overflow-y:hidden;height:auto!important}.codialog-frame{display:flex;position:absolute;background-color:#fff;border-radius:6px;overflow:hidden;box-shadow:0 0 12px rgba(0,0,0,.5);border:calc(0px);pointer-events:auto;z-index:99999}.codialog-frame .codialog-box{display:block;width:520px;max-width:100%;height:100%}.codialog-box .codialog-styles{height:inherit}.codialog-styles .codialog-styles-head{padding:15px 19px;box-shadow:-2px 4px 20px #e8e8e8 inset;border-bottom:1px solid #ddd}.codialog-styles-head .codialog-head-content{display:table;width:100%;clear:both;text-align:left!important}.codialog-head-content .codialog-head-close,.codialog-head-content .codialog-head-title{display:table-cell;position:relative;vertical-align:middle}.codialog-head-content .codialog-head-title{float:left;text-align:left;color:#9a9b9c}.codialog-head-content .codialog-head-close{float:right;text-align:right;color:#ccc}.codialog-head-content .codialog-head-close>button,.codialog-head-content .codialog-head-title>span{display:inline-block;font-weight:700;font-size:16px}.codialog-head-content .codialog-head-title>span{margin-left:0;color:inherit;font-weight:400}.codialog-head-content .codialog-head-close>button{position:relative;justify-content:center;width:19px;height:19px;margin:0;padding:0;transition:color .1s ease-out;border:none;border-radius:0;background:0 0;color:inherit;font-family:serif;font-size:17px;line-height:19px;cursor:pointer;overflow:hidden}.codialog-styles .codialog-styles-content{display:block;margin-top:28px;margin-left:64px;margin-right:64px;font-size:28px;overflow-y:hidden;color:#696969;text-align:center}.codialog-styles-content .codialog-content-message{position:relative}.codialog-icon{position:relative;display:flex;margin:0 auto 20px;height:76px;width:76px;line-height:76px;border-radius:50%;border:4px solid transparent;text-align:center;user-select:none;justify-content:center}.codialog-success-ring{position:absolute;width:100%;height:100%;border:4px solid hsla(98,55%,69%,.2);border-radius:50%;box-sizing:content-box;z-index:2;left:-4px;top:-4px}.codialog-icon-success .codialog-icon-success--line-small{position:absolute;display:inline-block;top:48px;left:16px;width:20px;height:5px;background-color:#a5dc86;transform:rotate(45deg)}.codialog-icon-success .codialog-icon-success--line-long{position:absolute;display:inline-block;top:41px;left:25px;width:42px;height:5px;background-color:#a5dc86;transform:rotate(135deg)}.codialog-icon-error{border-color:#f27474}.codialog-icon-error--line-left{position:absolute;display:inline-block;top:38px;width:45px;height:5px;border-radius:.125em;transform:rotate(45deg);left:15px;background-color:#f27474}.codialog-icon-error--line-right{position:absolute;display:inline-block;top:38px;width:45px;height:5px;border-radius:.125em;transform:rotate(-45deg);right:17px;background-color:#f27474}.codialog-icon-warning{border-color:#facea8;color:#f8bb86}.codialog-icon-error--text{color:#f8bb86;font-size:56px}.codialog-icon-info{border-color:#9de0f6}.codialog-icon-info--text{color:#3fc3ee;font-size:56px;transform:rotate(180deg)}.codialog-icon-question{border-color:#c9dae1;color:#87adbd}.codialog-icon-question--text{font-size:56px}.codialog-icon-error,.codialog-icon-info,.codialog-icon-question,.codialog-icon-success,.codialog-icon-warning{display:none}.codialog-content-message .codialog-message-text{width:100%;font-size:inherit}.codialog-styles .codialog-styles-foot{display:block;margin-top:30px;padding-bottom:22px}.codialog-styles-foot .codialog-foot-button{display:block}.codialog-foot-button .codialog-button-group{text-align:center}.codialog-button-group .codialog-group-btn{display:inline-block;margin:0 8px;padding:10px 32px;font-size:16px;font-weight:500;outline:0;border:none;cursor:pointer;-moz-border-radius:6px;-webkit-border-radius:6px;-ms-border-radius:6px;border-radius:6px;transition:background-color ease-in-out .2s}.codialog-foot-button .codialog-button-group button[confirm]{background-color:#51bf8c}.codialog-foot-button .codialog-button-group button[confirm]:hover{background-color:#45b680}.codialog-foot-button .codialog-button-group button[cancle]{display:none;background-color:#16aeee;background-color:#16aeee;color:#fff}.codialog-foot-button .codialog-text-group{text-align:center;color:#585858}@media only screen and (max-width:801px){.codialog-frame{width:96%}.codialog-frame .codialog-box{width:100%}}.animatedHalf{-webkit-animation-duration:.2s;animation-duration:.2s;-webkit-animation-fill-mode:both;animation-fill-mode:both}.animated{-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-fill-mode:both;animation-fill-mode:both}@-webkit-keyframes bounceIn{20%,40%,60%,80%,from,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}20%{-webkit-transform:scale3d(1.1,1.1,1.1);transform:scale3d(1.1,1.1,1.1)}40%{-webkit-transform:scale3d(.9,.9,.9);transform:scale3d(.9,.9,.9)}60%{opacity:1;-webkit-transform:scale3d(1.03,1.03,1.03);transform:scale3d(1.03,1.03,1.03)}80%{-webkit-transform:scale3d(.97,.97,.97);transform:scale3d(.97,.97,.97)}to{opacity:1;-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1)}}@keyframes bounceIn{20%,40%,60%,80%,from,to{-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}20%{-webkit-transform:scale3d(1.1,1.1,1.1);transform:scale3d(1.1,1.1,1.1)}40%{-webkit-transform:scale3d(.9,.9,.9);transform:scale3d(.9,.9,.9)}60%{opacity:1;-webkit-transform:scale3d(1.03,1.03,1.03);transform:scale3d(1.03,1.03,1.03)}80%{-webkit-transform:scale3d(.97,.97,.97);transform:scale3d(.97,.97,.97)}to{opacity:1;-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1)}}.bounceIn{-webkit-animation-duration:.75s;animation-duration:.75s;-webkit-animation-name:bounceIn;animation-name:bounceIn}@-webkit-keyframes fadeOut{from{opacity:1}to{opacity:0}}@keyframes fadeOut{from{opacity:1}to{opacity:0}}.fadeOut{-webkit-animation-name:fadeOut;animation-name:fadeOut}");