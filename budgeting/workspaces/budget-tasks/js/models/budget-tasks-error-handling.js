//  User Properties Model

(function (angular) {
    "use strict";

    function factory(langTranslate,  notificationModel) {
         var translate, model, form, body, btnClick, options;
        model = {};
        translate = langTranslate('contracts').translate;
        model.defaultPageProps = {
            errorObj: {
                title: 'Error Dialog',
                desc: '',
                info: '',
                type: ''
            }
        };

        model.errorMsgs = {
            "getContractsException": {
                "INVALID_PARAM": {
                    title: translate('ex_getData_invalidParams_title'),
                    desc: translate('ex_getData_desc'),
                    info: translate('ex_getData_info'),
                    type: 'error'
                },
                "NOT_FOUND": {
                    title: translate('ex_getData_title_unKnown_error'),
                    desc: translate('ex_getData_desc_unKnown_error'),
                    info: translate('ex_getData_info_unknown_error'),
                    type: 'error'
                }
            },
            "getTaskCompleteException":{
                "INVALID_PARAM": {
                    title: "INVALID_PARAM",
                    desc: "Task id is invalid",
                    info:"Task id is invalid",
                    type: 'error'
                }
            },
            "getTaskDeleteException":{
                 "INVALID_PARAM": {
                    title: "INVALID_PARAM",
                    desc: "Task id is invalid",
                    info:"Task id is invalid",
                    type: 'error'
                }
            }
        };

        model.form = angular.extend({}, model.defaultPageProps);

        model.isStatus = function (resp, exId) {
            if (resp.status === exId) {
                return true;
            }
            return false;
        };

        model.wrapShowMessage = function (msg, obj) {
            if (obj[msg]) {
                notificationModel.showErrorInfo(obj[msg]);
            }
            else {
                logc("Contracts Error Handling Module: Error not defined");
            }
        };

        model.getTasksException = function (resp) {
            model.wrapShowMessage(resp.data.message, model.errorMsgs.getContractsException);
        };

         model.getTaskCompleteException = function (resp) {
            model.wrapShowMessage(resp.data.messageText, model.errorMsgs.getTaskCompleteException);
        };

         model.getTaskDeleteException = function (resp) {
            model.wrapShowMessage(resp.data.messageText, model.errorMsgs.getTaskDeleteException);
        };

        return model;

    }

    angular
        .module("budgeting")
        .factory('budgetTasksErrorHandling', [
           'appLangTranslate', 'budgetTasksNotifications',
            factory
        ]);
})(angular);