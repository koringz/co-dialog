export const dialogTemplate = `
<div mask="" class="codialog-mask" aria-hidden="false">
    <div dialog="" class="codialog-frame" role="dialog" aria-dialog="true">
        <div aria-dialogBox="true" class="codialog-box">
            <div class="codialog-fixed">
                <div class="codialog-styles">
                    <div header="" class="codialog-styles-head dialog-header">
                        <div class="codialog-head-content">
                            <div title="" ref="title" class="codialog-head-title codialog-head-info">
                                <span ></span>
                            </div>
                            <div close="" ref="close" class="codialog-head-close">
                                <button type="button" class="addClose">×</button>
                            </div>
                        </div>
                    </div>
                    <div body="" class="codialog-styles-content dialog-body">
                        <div class="codialog-content-message" dialog-body-overflow>
                            <div class="codialog-icon codialog-icon-success">
                                <div class="codialog-success-ring"></div>
                                <span class="codialog-icon-success--line-small"></span>
                                <span class="codialog-icon-success--line-long"></span>
                            </div>
                            <div class="codialog-icon codialog-icon-error">
                                <span class="codialog-icon-error--line-left"></span>
                                <span class="codialog-icon-error--line-right"></span>
                            </div>
                            <div class="codialog-icon codialog-icon-warning">
                                <span class="codialog-icon-error--text">!</span>
                            </div>
                            <div class="codialog-icon codialog-icon-info"
                                <span class="codialog-icon-info--text">!</span>
                            </div>
                            <div class="codialog-icon codialog-icon-question">
                                <span class="codialog-icon-question--text">?</span>
                            </div>
                            <div message="" ref="message" class="codialog-message-text message-text codialog-text">
                                <span></span>
                            </div>
                        </div>
                    </div>
                    <div footer="" class="codialog-styles-foot dialog-footer">
                        <div class="codialog-foot-button codialog-foot-text">
                            <div textGroup="" ref="text" class="codialog-text-group"></div>
                            <div buttonGroup="" ref="button" class="codialog-button-group">
                                <button type="button" confirm="" class="primary group-btn">确定</button>
                                <button type="button" cancle="" class="cancle group-btn">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`
