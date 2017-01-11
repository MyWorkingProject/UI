//  User Properties Model

(function (angular) {
    'use strict';

    function factory(langTranslate,  notificationModel) {
        var translate, model, form, body, btnClick, options;
        model = {};
        translate = langTranslate('budgetWorkflowStatus').translate;
        model.defaultPageProps = {
            errorObj: {
                title: 'Error Dialog',
                desc: '',
                info: '',
                type:''
            }
        };

        model.errorMsgs = {           
            "getBdgtWorkflowStatusException": {
                "INVALID_PARAM": {
                    title: translate('ex_getData_invalidParams_title'),
                    desc: translate('ex_getData_desc'),
                    info: translate('ex_getData_info'),
                    type: 'error'
                },
                "UNKNOWN_ERROR": {
                    title: translate('ex_getData_title_unKnown_error'),
                    desc: translate('ex_getData_desc_unKnown_error'),
                    info: translate('ex_getData_info_unknown_error'),
                    type: 'error'
                }
            },
            "showBgtStatusException": {
                "INVALID_PARAM": {
                    title: translate('ex_status_title_invalid_param'),
                    desc: translate('ex_status_desc_msgInvalidParam'),
                    info: translate('ex_status_info_invalid_param'),
                    type: 'error'
                },
                
            },
            "showBdgtModelException": {
                "NOT_FOUND": {
                    title: translate('ex_bdgtModel_title_invalid_param'),
                    desc: translate('ex_bdgtModel_invalid_param'),
                    info: translate('ex_bdgtModel_info_invalid_param'),
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
                logc("Budget workflow status Error Handling Module: Error not defined");
            }
        };

        model.getBdgtWorkflowStatusException = function (resp) {
            model.wrapShowMessage(resp.data.message, model.errorMsgs.getBdgtWorkflowStatusException);
        };


        model.showBgtStatusException = function (resp) {
            model.wrapShowMessage(resp.data.message, model.errorMsgs.showBgtStatusException);
        };


        model.showBdgtModelException = function (resp) {
            model.wrapShowMessage(resp.data.message, model.errorMsgs.showBdgtModelException);
        };
       

        return model;

    }

    angular
        .module('budgeting')
        .factory('budgetWorkflowStatusErrorHandling', [
           'appLangTranslate', 'budgetWorkflowStatusNotifications',
            factory
        ]);
})(angular);