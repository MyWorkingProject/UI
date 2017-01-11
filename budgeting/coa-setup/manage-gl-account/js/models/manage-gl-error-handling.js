//  User Properties Model

(function (angular) {
    "use strict";

    function factory(langTranslate,  notificationModel) {
        var translate, model, form, body, btnClick, options;
        model = {};
        translate = langTranslate('manageGlAccount').translate;
        model.defaultPageProps = {
            errorObj: {
                title: 'Error Dialog',
                desc: '',
                info: '',
                type:''
            }
        };

        model.errorMsgs = {
            "getglListException": {
                "INVALID_PARAM": {
                    title: translate('bdgt_manageglaccount_title_invalid_param'),
                    desc: translate('bdgt_manageglaccount_desc_invalid_param'),
                    info: translate('bdgt_manageglaccount_info_invalid_param'),
                    type:'error'
                },
                "NOT_FOUND": {
                    title: translate('bdgt_manageglaccount_dilog_chart_not_found'),
                    desc: translate('bdgt_manageglaccount_desc_chart_not_found'),
                    info: translate('bdgt_manageglaccount_info_no_records_found'),
                    type: 'error'
                }
            },
            "masterChartFailure": {
                "INVALID_PARAM": {
                    title: translate('bdgt_manageglaccount_invalid_param'),
                    desc: '',
                    info: translate('bdgt_manageglaccount_erroPopText'),
                    type: 'error'
                },
                "CHART_NOT_FOUND": {
                    title: translate('bdgt_manageglaccount_erroPopText'),
                    desc: '',
                    info: translate('bdgt_manageglaccount_chart_not_found'),
                    type: 'error'
                }
            },
            "getglByIDException": {
                "INVALID_PARAM": {
                    title: translate('bdgt_manageglaccount_title_invalid_param'),
                    desc: translate('bdgt_manageglaccount_glById_desc_invalid_param'),
                    info: translate('bdgt_manageglaccount_info_invalid_param'),
                    type: 'error'
                },
                "NOT_FOUND": {
                    title: translate('bdgt_manageglaccount_dilog_chart_not_found'),
                    desc: translate('bdgt_manageglaccount_glById_desc_chart_not_found'),
                    info: translate('bdgt_manageglaccount_info_no_records_found'),
                    type: 'error'
                }
            },
            "actionsException": {
                "INVALID_PARAM": {
                    title: translate('bdgt_manageglaccount_title_invalid_param'),
                    desc: translate('bdgt_manageglaccount_actions_desc_invalid_param'),
                    info: translate('bdgt_manageglaccount_info_invalid_param'),
                    type: 'error'
                }
            },
            "getAccTypesException": {
                "NOT_FOUND": {
                    title: translate('bdgt_manageglaccount_dilog_chart_not_found'),
                    desc: translate('bdgt_manageglaccount_desc_accntType_not_found'),
                    info: translate('bdgt_manageglaccount_info_chart_not_found'),
                    type: 'error'
                }
            },
            "getAccountcategoryException": {
                "INVALID_PARAM": {
                    title: translate('bdgt_manageglaccount_title_invalid_param'),
                    desc: translate('bdgt_manageglaccount_desc_accntCategory_not_found'),
                    info: translate('bdgt_manageglaccount_info_invalid_param'),
                    type: 'error'
                },
                "UNKNOWN_ERROR": {
                    title: translate('bdgt_manageglaccount_title_unKnown_error'),
                    desc: translate('bdgt_manageglaccount_desc_accntCategory_unKnown_error'),
                    info: translate('bdgt_manageglaccount_error_info_unknown_error'),
                    type: 'error'
                }
            },
            "showDeleteGlException": {
                "INVALID_PARAM": {
                    title: translate('bdgt_manageglaccount_title_invalid_param'),
                    desc: translate('bdgt_manageglaccount_dilog_msgInvalidParam'),
                    info: translate('bdgt_manageglaccount_info_invalid_param'),
                    type: 'error'
                },
                "GLACCOUNT_USED_IN_PROPERTY": {
                    title: translate('bdgt_manageglaccount_dilog_unDelete'),
                    desc: '',
                    info: translate('bdgt_manageglaccount_dilog_msgUsedInProperty'),
                    type: 'error'
                }
            },
            "updateWizStepError": {
                "INVALID_PARAM": {
                    title: translate('bdgt_import_error_title_invalid_param'),
                    desc: translate('bdgt_import_error_desc_invalid_param'),
                    info: translate('bdgt_import_error_info_invalid_param'),
                    type: 'error'
                }
            },
            "wizNextAlert": {
                "INVALID": {
                    title: translate('bdgt_manageglaccount_wizAlert'),
                    desc: translate('bdgt_manageglaccount_wizAlert_error_desc'),
                    info: translate('bdgt_manageglaccount_wizAlert_info'),
                    type: 'Warn'
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
                logc("Manage Gl Account Error Handling Module: Error not defined");
            }
        };

        model.getglListException = function (resp) {
            model.wrapShowMessage(resp.data.message, model.errorMsgs.getglListException);
        };


        model.masterChartFailure = function (resp) {
            model.wrapShowMessage(resp.data.message, model.errorMsgs.masterChartFailure);
        };


        model.getglByIDException = function (resp) {
            model.wrapShowMessage(resp.data.message, model.errorMsgs.getglByIDException);
        };

        model.actionsException = function (resp) {
            model.wrapShowMessage(resp.data.message, model.errorMsgs.actionsException);
        };

        model.getAccTypesException = function (resp) {
            model.wrapShowMessage(resp.data.message, model.errorMsgs.getAccTypesException);
        };

        model.getAccountcategoryException = function (resp) {
            model.wrapShowMessage(resp.data.message, model.errorMsgs.getAccountcategoryException);
        };

        model.showDeleteGlException = function (resp) {
            model.wrapShowMessage(resp.data.message, model.errorMsgs.showDeleteGlException);
        };

        model.updateWizStepError = function (resp) {
            model.wrapShowMessage(resp.data.message, model.errorMsgs.updateWizStepError);
        };

        model.wizAlertException = function () {
            model.wrapShowMessage("INVALID", model.errorMsgs.wizNextAlert);
        };

        return model;

    }

    angular
        .module("budgeting")
        .factory('manageGlErrorHandling', [
           'appLangTranslate','manageglNotifications',
            factory
        ]);
})(angular);