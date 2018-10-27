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
    confirmButtonBackground: '#45B680', // 显示 ui
    methods: function () {},
    onDialogBefore: function () {},
    onHeaderBefore: function () {},
    onBodyBefore: function () {},
    onFooterBefore: function () {},
    onDialogAfter: function () {},
    onHeaderAfter: function () {},
    onBodyAfter: function () {},
    onFooterAfter: function () {},
    confirmCallback: null,
    cancleCallback: null
};

export const dialogTemplate = (_root) => {
    var str = '';
    // 属性设置="" 兼容ie10
    str += '<div mask="" class="codialog-mask" aria-hidden="false">';
    str += '<div dialog="" class="codialog-frame" role="dialog" aria-dialog="true">';
    str += '<div aria-dialogBox="true" class="codialog-box">';
    str += '<div class="codialog-fixed">';
    str += '<div class="codialog-styles">';
    str += '<div header="" class="codialog-styles-head dialog-header">';
    str += '<div class="codialog-head-content">';
    str += '<div title="" ref="title" class="codialog-head-title codialog-head-info">';
    str += '<span ></span>';
    str += '</div>';
    str += '<div close="" ref="close" class="codialog-head-close">';
    str += '<button type="button" class="addClose">×</button>';
    str += '</div>';
    str += '</div>';
    str += '</div>';
    str += '<div body="" class="codialog-styles-content dialog-body">';
    str += '<div class="codialog-content-message" dialog-body-overflow>';
    str += '<div class="codialog-icon codialog-icon-success">';
    str += '<div class="codialog-success-ring"></div>';
    str += '<span class="codialog-icon-success--line-small"></span>';
    str += '<span class="codialog-icon-success--line-long"></span>';
    str += '</div>';
    str += '<div class="codialog-icon codialog-icon-error">'
    str += '<span class="codialog-icon-error--line-left"></span>';
    str += '<span class="codialog-icon-error--line-right"></span>';
    str += '</div>';
    str += '<div class="codialog-icon codialog-icon-warning">'
    str += '<span class="codialog-icon-error--text">!</span>';
    str += '</div>';
    str += '<div class="codialog-icon codialog-icon-info">'
    str += '<span class="codialog-icon-info--text">!</span>';
    str += '</div>';
    str += '<div class="codialog-icon codialog-icon-question">'
    str += '<span class="codialog-icon-question--text">?</span>';
    str += '</div>';
    str += '<div message="" ref="message" class="codialog-message-text message-text codialog-text">';
    str += '<span ></span>';
    str += '</div>';
    str += '</div>';
    str += '</div>';
    str += '<div footer="" class="codialog-styles-foot dialog-footer">';
    str += '<div class="codialog-foot-button codialog-foot-text">';
    str += '<div textGroup="" ref="text" class="codialog-text-group"></div>';
    str += '<div buttonGroup="" ref="button" class="codialog-button-group">';
    str += '<button type="button" confirm="" class="primary group-btn">确定</button>';
    str += '<button type="button" cancle="" class="cancle group-btn">取消</button>';
    str += '</div>';
    str += '</div>';
    str += '</div>';
    str += '</div>';
    str += '</div>';
    str += '</div>';
    str += '</div>';
    str += '</div>';
    return str
}

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
export const supportBrowserAnimationEventOfName_end = {
    "excuteAnimation"      : "animationend",
    "OAnimation"     : "oAnimationEnd",
    "MozAnimation"   : "animationend",
    "WebkitAnimation": "webkitAnimationEnd",
    'MSAnimation': 'MSAnimationEnd'
};
export const supportBrowserAnimationEventOfName_start = {
    "excuteAnimation"      : "animationstart",
    "OAnimation"     : "oAnimationStart",
    "MozAnimation"   : "animationstart",
    "WebkitAnimation": "webkitAnimationStart",
    'MSAnimation': 'MSAnimationStart'
};