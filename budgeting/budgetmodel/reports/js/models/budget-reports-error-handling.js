//  User Properties Model

(function (angular) {
    "use strict";

    function factory(langTranslate,  notificationModel) {
         var translate, model, form, body, btnClick, options;
        model = {};
        translate = langTranslate('reports').translate;
        model.defaultPageProps = {
            errorObj: {
                title: 'Error Dialog',
                desc: '',
                info: '',
                type: ''
            }
        };

        model.errorMsgs = {
            "getDefaulReportsException": {
                "INVALID_PARAM": {
                    desc: translate('ex_getDefRep_err_desc'),
                    type: 'error'
                },
                "NOT_FOUND": {
                    desc: translate('ex_getDefRep_NotFnd_err_desc'),
                    type: 'error'
                }
            },
            "getCustReportsException": {
                "NOT_FOUND": {
                    desc: translate('ex_getCustReportData_err_desc'),
                    type: 'error'
                }
            },
            "postReportsException":{
                "INVALID_PARAM": {
                    desc: translate('ex_postReportsData_error_desc'),
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
                logc("Reports Error Handling Module: Error not defined");
            }
        };

        model.getDefReportsException = function (resp) {
            model.wrapShowMessage(resp.data.message, model.errorMsgs.getDefaulReportsException);
        };

        model.getCustReportsException = function (resp) {
            model.wrapShowMessage(resp.data.message, model.errorMsgs.getCustReportsException);
        };

         model.getPostException = function (resp) {
            model.wrapShowMessage(resp.data.messageText, model.errorMsgs.postReportsException);
        };


        return model;

    }

    angular
        .module("budgeting")
        .factory('budgetReportsErrorHandling', [
           'appLangTranslate', 'budgetReportsNotifications',
            factory
        ]);
})(angular);