//  Property List Model

(function (angular) {
    "use strict";

    function factory(langTranslate, notificationModel) {
        var model = {};

        var translate;//, notification = notificationModel();
        translate = langTranslate('budgetComments').translate;
         model.errorMsgs = {           
            "getBdgtModelsException": {
                "NOT_FOUND": {
                    title: translate('ex_getModel_notFound_title'),
                    desc: translate('ex_getModel_notFound_desc'),
                    info: translate('ex_getModel_notFound_info'),
                    type: 'error'
                },
                "UNKNOWN_ERROR": {
                    title: translate('ex_getData_title_unKnown_error'),
                    desc: translate('ex_getData_desc_unKnown_error'),
                    info: translate('ex_getData_info_unknown_error'),
                    type: 'error'
                }
            },
            "getBdgtYearsException": {
                "NOT_FOUND": {
                    title: translate('ex_getUsers_notFound_title'),
                    desc: translate('ex_getUsers_notFound_desc'),
                    info: translate('ex_getUsers_notFound_info'),
                    type: 'error'
                }                
            },
            "getBdgtPropertiesException": {
                "NOT_FOUND": {
                    title: translate('ex_getProperty_notFound_title'),
                    desc: translate('ex_getProperty_notFound_desc'),
                    info: translate('ex_getProperty_notFound_info'),
                    type: 'error'
                }         
            },
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
            "commentsEditException": {
                "INVALID_PARAM": {
                    title: translate('bdgt_comments_erroPopText'),
                    desc: translate('bdgt_comments_dashboard_comment_create_update_invalid_param')
                }
            },
            "commentsDeleteException": {
                "INVALID_PARAM": {
                    title: translate('bdgt_comments_erroPopText'),
                    desc: translate('bdgt_comments_dashboard_comment_get_invalid_param')
                }
            },
            "taskCommentResponseError": {
                "INVALID_PARAM": {
                    title: translate('bdgt_comments_erroPopText'),
                    desc: translate('bdgt_comments_dashboard_comment_get_invalid_param')
                }
            },
            "responseSaveException": {
                "INVALID_PARAM": {
                    title: translate('bdgt_comments_erroPopText'),
                    desc: translate('bdgt_comments_dashboard_comment_response_create_update_invalid_param')
                }
            },
            "responseEditException": {
                "INVALID_PARAM": {
                    title: translate('bdgt_comments_erroPopText'),
                    desc: translate('bdgt_comments_dashboard_comment_response_create_update_invalid_param')
                }
            },
            "responseDeleteException": {
                "INVALID_PARAM": {
                    title: translate('bdgt_comments_erroPopText'),
                    desc: translate('bdgt_comments_dashboard_comment_response_delete_invalid_param')
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

            /*options.actions = [{
                text: 'Close',
                method: notification.hide
            }];*/

            //model.showNotification(options);
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
        model.onTaskCommentRespError = function (resp) {   
            if (resp.data !== undefined && resp.data !== null) {
                model.wrapShowMessage(resp.data.messageText, model.errorMsgs.taskCommentResponseError);
            }
        };
        
        model.showCommentsSaveException = function (resp) {
            if (resp.data !== undefined && resp.data !== null) {
                model.wrapShowMessage(resp.data.messageText, model.errorMsgs.commentsSaveException);
            }
        };

        model.showCommentsEditException = function (resp) {
            if (resp.data !== undefined && resp.data !== null) {
                model.wrapShowMessage(resp.data.messageText, model.errorMsgs.commentsEditException);
            }
        };

        model.showCommentsDeleteException = function (resp) {
            if (resp.data !== undefined && resp.data !== null) {
                model.wrapShowMessage(resp.data.messageText, model.errorMsgs.commentsDeleteException);
            }
        };


        model.showDashboardSaveSuccess = function () {
            notificationModel.success(translate('bdgt_comments_dashboard_comment_success_create'));
        };
        model.showDashboardUpdateSuccess = function () {
            notificationModel.success(translate('bdgt_comments_dashboard_comment_success_update'));
        };
        model.showDashboardDeleteSuccess = function () {
            notificationModel.success(translate('bdgt_comments_dashboard_comment_success_delete'));
        };

        model.onGetError = function () {
            model.wrapShowMessage("statesError", model.errorMsgs.commentsStateException);
        };
        // Dashboard comments responses section

        model.onResponseSaveSuccess = function () {
            notificationModel.success(translate('bdgt_comments_dashboard_response_success_create'));          
        };
        model.onResponseSaveError = function (resp) {
            if (resp.data !== undefined && resp.data !== null) {
                model.wrapShowMessage(resp.data.messageText, model.errorMsgs.responseSaveException);
            }
        };

        model.onResponseEditSuccess = function () {
            notificationModel.success(translate('bdgt_comments_dashboard_response_success_edit'));            
        };
        model.onResponseEditError = function (resp) {
            if (resp.data !== undefined && resp.data !== null) {
                model.wrapShowMessage(resp.data.messageText, model.errorMsgs.responseEditException);
            }
        };

        model.onResponseDeleteSuccess = function () {
            notificationModel.success(translate('bdgt_comments_dashboard_response_success_delete'));
        };
        model.onResponseDeleteError = function (resp) {
            if (resp.data !== undefined && resp.data !== null) {
                model.wrapShowMessage(resp.data.messageText, model.errorMsgs.responseDeleteException);
            }
        };

        // Dashboard comments responses section ends here

        /*
        model.showBdgtPropertiesException = function (resp) {
            if (resp.data !== undefined && resp.data !== null) {
                model.wrapShowMessage(resp.data.message, model.getBdgtPropertiesException);
            }
        };

        model.showBdgtModelsException = function (resp) {
            if (resp.data !== undefined && resp.data !== null) {
                model.wrapShowMessage(resp.data.message, model.getBdgtModelsException);
            }
        };
        model.showBdgtYearsException = function (resp) {
            if (resp.data !== undefined && resp.data !== null) {
                model.wrapShowMessage(resp.data.message, model.getBdgtYearsException);
            }
        }; */
        return model;
    }

    angular
        .module("budgeting")
        .factory('commentsError', [
           'appLangTranslate', 'notificationService',
            factory
        ]);
})(angular);

