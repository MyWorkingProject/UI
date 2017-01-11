//  Manage other options error handling

(function (angular) {
    'use strict';

    function factory(langTranslate, notificationModel/*,  notificationModel*/) {
        var translate, model, form, body, btnClick, options;
        model = {};
        translate = langTranslate('otherOptions').translate;
        model.defaultPageProps = {
            errorObj: {
                title: 'Error Dialog',
                desc: '',
                info: '',
                type: ''
            }
        };


        model.errorMsgs = {
            "saveOtherOptionsException": {
                "UNKNOWN_ERROR": {
                    title: translate('ex_saveOtherOptionsException_title'),
                    desc: translate('ex_saveOtherOptionsException_desc'),
                    info: translate('ex_saveOtherOptionsException_info'),
                    type: 'error'
                }
            },
            "getOtherOptionsException": {
                "NOT_FOUND": {
                    title: translate('ex_getOtherOptionsNotFoundException_title'),
                    desc: translate('ex_getOtherOptionsNotFoundException_desc'),
                    info: translate('ex_getOtherOptionsNotFoundException_info'),
                    type: 'error'
                },
                "UNKNOWN_ERROR": {
                    title: translate('ex_getOtherOptionsException_title'),
                    desc: translate('ex_getOtherOptionsException_desc'),
                    info: translate('ex_getOtherOptionsException_info'),
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
                notificationModel.showErrorInfo(obj[msg].desc);
            }
            else {
                logc("Model settings - Other Options Error Handling Module: Error not defined");
            }
        };

        model.showOtherOptionsSaveException = function (resp) {
            if (resp.data !== undefined && resp.data !== null) {
                model.wrapShowMessage(resp.data.message, model.errorMsgs.saveOtherOptionsException);
            }
        };

        model.showOtherOptionsGetException = function (resp) {
            if (resp.data !== undefined && resp.data !== null) {
                model.wrapShowMessage(resp.data.message, model.errorMsgs.getOtherOptionsException);
            }
        };


        model.showErrorMessage = function (msg) {
            notificationModel.error(msg);
        };


        return model;

    }

    angular
        .module('budgeting')
        .factory('manageOtherOptionsErrorHandling', [
           'appLangTranslate', /*'budgetWorkflowStatusNotifications',*/
           'otherOptionsNotifications',
            factory
        ]);
})(angular);