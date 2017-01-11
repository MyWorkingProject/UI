//  Property List Model

(function (angular) {
    "use strict";

    function factory(langTranslate, notificationModel) {
        var model = {};

        var translate;//, notification = notificationModel();
        translate = langTranslate('glAccountFind').translate;
         model.errorMsgs = {  
            "commentsSaveException": {
                 "INVALID_PARAM": {
                 title: translate('bdgt_comments_erroPopText'),
                 desc: translate('bdgt_comments_dashboard_comment_create_update_invalid_param')
                },
                 "INVALID_COMMENT_SOURCE": {
                     title: translate('bdgt_comments_erroPopText'),
                     desc: translate('bdgt_comments_dashboard_comment_delete_invalid_comment_source')
                 }
            },
        
         
            "getMasterChartListError": {
                "INVALID_PARAM": {
                    title: translate('bdgt_glFind_erroPopText'),
                    desc: translate('bdgt_glFind_get_invalid_param')
                }
            }           
        };

        model.getCommentsErrorObj = {
            errorMsgs: {
                "INVALID_PARAM": {
                    title: translate('bdgt_comments_erroPopText'),
                    desc: translate('bdgt_comments_invalid_param')
                },
                "UNKNOWN_ERROR": {
                    title: translate('bdgt_comments_erroPopText'),
                    desc: translate('bdgt_comments_unknown_error')
                }

            }
        };
        model.showNotification = function (data) {
            //notification.flushAll();
           // notification.extend(data).show();
        };

        model.showErrorNotification = function (msg) {
            var options = {
                type: "error",
                autoHideTime: -1,
                title: msg.title,
                descr: msg.desc
            };

            notificationModel.error(msg.desc);
        };

        model.wrapShowMsg = function (msg, obj) {
            if (obj.errorMsgs[msg]) {
                model.showErrorNotification(obj.errorMsgs[msg]);
            }
            else {
                logc("Budget Comments Error Handling Module: Error not defined");
            }
        };

        model.wrapShowMessage = function (msg, obj) {
            if (obj[msg]) {
                notificationModel.showErrorInfo(obj[msg]);
            }
            else {
                logc("Budget Comments Error Handling Module: Error not defined");
            }
        };

        model.getCommentsError = function (response) {
            if (response.status === 400) {
                model.wrapShowMsg(response.data.message, model.getCommentsErrorObj);
            }
        };
        // Dashboard comments section starts here
        model.getMasterChartListError = function (resp) {
            if (resp.data !== undefined && resp.data !== null) {
                model.wrapShowMessage(resp.data.messageText, model.errorMsgs.getMasterChartListError);
            }
        };
        
        return model;
    }

    angular
        .module("budgeting")
        .factory('glAccountFindError', [
           'appLangTranslate', 'notificationService',
            factory
        ]);
})(angular);

