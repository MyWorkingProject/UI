//  defaultAdjustments Error Handling

(function (angular) {
    "use strict";

    function factory(langTranslate, notificationModel) {
        var model = {};
        var translate;//, notification = notificationModel();
        translate = langTranslate('defaultsAdjustments').translate;
         model.errorMsgs = {         
            "defaultAdjustmentsErrorMsg": {
                "NOT_FOUND": {
                    title: 'Not found',
                    desc: 'Unable to get Category adjestment percentage list becasue of no records found',                   
                    type: 'error'
                },
                "INVALID_PARAM": {
                    title: translate('bdgt_defaultAdjustments_erroPopText'),
                    desc: translate('bdgt_defaultAdjustments_invalid_param')
                }
            },
            "saveDefaultAdjustmentsErrorMsg": {
                "INVALID_PARAM": {
                    title: translate('bdgt_defaultAdjustments_erroPopText'),
                    desc: translate('bdgt_defaultAdjustments_invalid_param')
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

        model.wrapShowMessage = function (msg, obj) {
            if (obj[msg]) {
                notificationModel.error(obj[msg]);
            }
            else {
                logc("Default Adjustments Error Handling Module: Error not defined");
            }
        };
  
    
        model.saveDefaultAdjustmentsSuccess = function () {
            notificationModel.success(translate('bdgt_defaultAdjustments_success_msg'));
        };

        model.saveDefaultAdjustmentsError = function (resp) {
            if (resp.data !== undefined && resp.data !== null) {
                model.wrapShowMessage(resp.data.messageText, model.errorMsgs.saveDefaultAdjustmentsErrorMsg);
            }
        };      
        model.getDefaultAdjustmentsError = function (resp) {
             if (resp.data !== undefined && resp.data !== null) {
                model.wrapShowMessage(resp.data.messageText, model.errorMsgs.defaultAdjustmentsErrorMsg);
            }
        };       
  
        return model;
    }

    angular
        .module("budgeting")
        .factory('adjustmentsError', [
           'appLangTranslate', 'notificationService',
            factory
        ]);
})(angular);

