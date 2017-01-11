//  Property List Model

(function (angular) {
    "use strict";

    function factory(langTranslate, notificationModel) {
        var model = {};

        var translate;//, notification = notificationModel();
        translate = langTranslate('addProperties').translate;
         model.errorMsgs = {  
             "propertiesError": {
                 "INVALID_PARAM": {
                     title: translate('bdgt_addProperties_erroPopText'),
                     desc: translate('bdgt_addProperties_get_invalid_param')
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
                logc("Add Properties: Error not defined");
            }
        };

        model.wrapShowMessage = function (msg, obj) {
            if (obj[msg]) {
                notificationModel.showErrorInfo(obj[msg]);
            }
            else {
                logc("Add Properties: Error not defined");
            }
        };
        model.getProperiesException = function (resp) {
            if (resp.data !== undefined && resp.data !== null) {
                model.wrapShowMessage(resp.data.messageText, model.errorMsgs.propertiesError);
            }
        };        
        return model;
    }

    angular
        .module("budgeting")
        .factory('addPropertiesError', [
           'appLangTranslate', 'notificationService',
            factory
        ]);
})(angular);

