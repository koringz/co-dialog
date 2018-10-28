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
