//  User Properties Model

(function (angular) {
    'use strict';

    function factory(langTranslate, notificationModel, notificationService, content) {
        var translate, model, form, body, btnClick, options;
        model = {};
        translate = langTranslate('payrollEmployeeView').translate;
        model.defaultPageProps = {
            errorObj: {
                title: 'Error Dialog',
                desc: '',
                info: '',
                type:''
            }
        };

        model.errorMsgs = {           
            "GetEmployeePayRollData": {
                "INVALID_PARAM": {
                    desc: translate('ex_getData_desc'),                   
                    type: 'error'
                },
                "UNKNOWN_ERROR": {                    
                    desc: translate('ex_getData_desc_unKnown_error'),                    
                    type: 'error'
                }
            },
            "onEmployeePropertyDeleteError": {
                "PAYROLL_DATA_FOUND": {                  
                    desc: 'Cannot delete the Property', //translate('ex_getData_desc_unKnown_error'),                       
                    type: 'error'
                }
            },
            "showonGetEmployeeProperties": {
                "INVALID_PARAM": {
                    desc: translate('ex_status_desc_msgInvalidParam'),
                    type: 'error'
                },
                
            },
            "empGetEmpPayRollRightsError": {
                "INVALID_PARAM": {                   
                    desc: translate('ex_getData_desc'),
                    type: 'error'
                },
                "UNKNOWN_ERROR": {
                    desc: translate('ex_getData_desc_unKnown_error'),
                    type: 'error'
                }
            },
            
            "showBdgtModelException": {
                "NOT_FOUND": {
                    desc: translate('ex_bdgtModel_invalid_param'),
                    type: 'error'
                }
            },
            "showSaveEmployeeException": {
                "INVALID_PARAM": {
                    desc: translate('ex_bdgtModel_invalid_param'),
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
                notificationService.notify(obj[msg]);
            }
            else {
                logc(content.errorUndefined);
            }
        };

        //Error Handling while getting Eeployee data
        model.onGetEmployeePayRollDataError = function (resp) {
            model.wrapShowMessage(resp.data.messageText, model.errorMsgs.GetEmployeePayRollData);
        };

        //Error while getting employee properties
        model.onGetEmployeePropertiesError = function (resp) {
            model.wrapShowMessage(resp.data.messageText, model.errorMsgs.showonGetEmployeeProperties);
        };
        
        //Error while getting employee rights
        model.onGetEmpPayRollRightsError = function (resp) {
            model.wrapShowMessage(resp.data.messageText, model.errorMsgs.empGetEmpPayRollRightsError);
        };
        //Error while deleting employee properties
        model.onEmployeePropertyDeleteError = function (resp) {
            model.wrapShowMessage(resp.data.messageText, model.errorMsgs.onEmployeePropertyDeleteError);
        };

        model.onEmployeeSaveSuccess = function () {
            notificationService.success(content.successMessage);
        };
        model.onEmployeeSaveError = function (resp) {
            model.wrapShowMessage(resp.data.messageText, model.errorMsgs.showSaveEmployeeException);
       };


        model.showBdgtModelException = function (resp) {
            model.wrapShowMessage(resp.messageText, model.errorMsgs.showBdgtModelException);
        };
       

        return model;

    }

    angular
        .module('budgeting')
        .factory('employeeDetailsErrorHandling', [
           'appLangTranslate', 'budgetWorkflowStatusNotifications', 'notificationService', 'employeePayrollContent',
            factory
        ]);
})(angular);