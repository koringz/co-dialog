// static parameters
export const $default = {
    title: '', // 内容 ui
    message: '', // 内容 ui
    footerText : '', // 内容 ui
    layout: 'center',
    timeout: 0, // setTimeout
    isGesture: true, // 处理 evnet
    isDrag: false, // 处理 evnet
    isClose: true, // 处理 evnet
    onResize: true, // 处理 event
    type: '', // 显示 ui
    isMask: true, // 显示 ui
    animation: true, // 显示 ui
    customAnimation: 'bounceIn', // 显示 ui
    titleColor: '#9A9B9C', // 显示 ui
    closeColor: '#9A9B9C', // 显示 ui
    messageColor: '#696969', // 显示 ui
    showCloseButton: true, // 显示 ui
    showCancleButton: false, // 显示 ui
    showConfirmButton: true, // 显示 ui
    cancleButtonText: '取消', // 内容 ui
    confirmButtonText: '确定', // 内容 ui
    cancleButtonColor: '#fff', // 显示 ui
    confirmButtonColor: '#fff', // 显示 ui
    cancleButtonBackground: '#aaa', // 显示 ui
    confirmButtonBackground: '#51BF8C', // 显示 ui
    methods: function () {},
    onDialogBefore: function () {},
    onHeaderBefore: function () {},
    onBodyBefore: function () {},
    onFooterBefore: function () {},
    onDialogAfter: function () {},
    onHeaderAfter: function () {},
    onBodyAfter: function () {},
    onFooterAfter: function () {},
    confirmCallback: function () {},
    cancleCallback: function () {},
};

export const animatiomApi = [
    'bounce','flash','pulse','rubberBand','shake', 'headShake','bounceOutLeft',
    'swing', 'tada', 'wobble', 'jello', 'bounceIn', 'bounceInDown','fadeInDownBig',
    'bounceInLeft', 'bounceInRight', 'bounceInUp', 'bounceOut', 'bounceOutDown',
    'bounceOutRight', 'bounceOutUp', 'fadeIn', 'fadeInDown', 'rotateInUpLeft',
    'fadeInLeftBig', 'fadeInRight', 'fadeInRightBig', 'fadeInUp', 'fadeInUpBig',
    'fadeOutDown', 'fadeOutDownBig', 'fadeOutLeft', 'fadeOutLeftBig', 'fadeOutRight',
    'fadeOutUp', 'fadeOutUpBig', 'flipInX', 'flipInY', 'flipOutX', 'flipOutY','fadeInLeft',
    'lightSpeedIn', 'lightSpeedOut', 'rotateIn', 'rotateInDownLeft', 'rotateInDownRight',
    'rotateInUpRight',  'rotateOut', 'rotateOutDownLeft', 'rotateOutDownRight', 'zoomOutLeft',
    'hinge', 'jackInTheBox', 'rollIn', 'rollOut', 'zoomIn', 'zoomInDown','rotateOutUpRight',
    'zoomInLeft', 'zoomInRight', 'zoomInUp', 'zoomOut', 'zoomOutDown', 'rotateOutUpLeft',
    'zoomOutRight', 'zoomOutUp', 'slideInDown', 'slideInLeft', 'slideInRight', 'slideInUp',
    'slideOutDown', 'slideOutLeft', 'slideOutRight', 'fadeOutRightBig','fadeOut','slideOutUp'
];

export const supportBrowserAnimationEventOfName_start = {
    "excuteAnimation"   : "animationstart",
    "OAnimation"        : "oAnimationStart",
    "MozAnimation"      : "animationstart",
    "WebkitAnimation"   : "webkitAnimationStart",
    'MSAnimation'       : 'MSAnimationStart'
};

export const supportBrowserAnimationEventOfName_final = {
    "excuteAnimation"   : "animationend",
    "OAnimation"        : "oAnimationEnd",
    "MozAnimation"      : "animationend",
    "WebkitAnimation"   : "webkitAnimationEnd",
    'MSAnimation'       : 'MSAnimationEnd'
};