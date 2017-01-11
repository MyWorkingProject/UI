//  User Properties Model

(function (angular) {
    'use strict';

    function factory(langTranslate,notificationModel/*,  notificationModel*/) {
        var translate, model, form, body, btnClick, options;
        model = {};
        translate = langTranslate('manageTasks').translate;
        model.defaultPageProps = {
            errorObj: {
                title: 'Error Dialog',
                desc: '',
                info: '',
                type:''
            }
        };

        
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
            "getBdgtUsersException": {
                "NOT_FOUND": {
                    title: translate('ex_getUsers_notFound_title'),
                    desc: translate('ex_getUsers_notFound_desc'),
                    info: translate('ex_getUsers_notFound_info'),
                    type: 'error'
                },
                
            },
            "getBdgtProeprtiesException": {
                "NOT_FOUND": {
                    title: translate('ex_getProperty_notFound_title'),
                    desc: translate('ex_getProperty_notFound_desc'),
                    info: translate('ex_getProperty_notFound_info'),
                    type: 'error'
                }
            },
            "taskSaveException": {
                "UNKNOWN_ERROR": {
                    title: translate('ex_taskSaveException_title'),
                    desc: translate('ex_taskSaveException_desc'),
                    info: translate('ex_taskSaveException_info'),
                    type: 'error'
                }
            },
            "getTaskException": {
                "NOT_FOUND": {
                    title: translate('ex_getTaskException_title'),
                    desc: translate('ex_getTaskException_desc'),
                    info: translate('ex_getTaskException_info'),
                    type: 'error'
                },
                
            },
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
                notificationModel.error(obj[msg].desc);
            }
            else {
                logc("Budget Manage Task Error Handling Module: Error not defined");
            }
        };

        model.showBdgtModelsException = function (resp) {
            if(resp.data !== undefined && resp.data !== null){
                model.wrapShowMessage(resp.data.message, model.errorMsgs.getBdgtModelsException);
            }
        };


        model.showBdgtUsersException = function (resp) {
            if(resp.data !== undefined && resp.data !== null){
                model.wrapShowMessage(resp.data.message, model.errorMsgs.getBdgtUsersException);
            }
        };


        model.showBdgtPropertiesException = function (resp) {
            if(resp.data !== undefined && resp.data !== null){
                model.wrapShowMessage(resp.data.message, model.errorMsgs.getBdgtProeprtiesException);
            }
        };
       
        model.showTaskSaveException = function (resp) {
            if(resp.data !== undefined && resp.data !== null){
                model.wrapShowMessage(resp.data.message, model.errorMsgs.taskSaveException);
            }
        };

        model.showTaskGetException = function (resp) {
            if(resp.data !== undefined && resp.data !== null){
                model.wrapShowMessage(resp.data.message, model.errorMsgs.getTaskException);
            }
        };

        model.showErrorMessage = function(msg){
            notificationModel.error(msg);
       };

        
        return model;

    }

    angular
        .module('budgeting')
        .factory('manageTasksErrorHandling', [
           'appLangTranslate', /*'budgetWorkflowStatusNotifications',*/
           'notificationService', 
            factory
        ]);
})(angular);