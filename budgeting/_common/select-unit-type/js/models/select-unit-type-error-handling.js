//  Property List Model

(function (angular) {
    "use strict";

    function factory(langTranslate, notificationModel) {
        var model = {};

        var translate;//, notification = notificationModel();
        translate = langTranslate('selectUnitType').translate;
         model.errorMsgs = {  
             "selectUnitTypeError": {
                 "INVALID_PARAM": {
                     title: translate('bdgt_selectUnitType_erroPopText'),
                     desc: translate('bdgt_selectUnitType_get_invalid_param')
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
                logc("Select Unit Type: Error not defined");
            }
        };

        model.wrapShowMessage = function (msg, obj) {
            if (obj[msg]) {
                notificationModel.showErrorInfo(obj[msg]);
            }
            else {
                logc("Select Unit Type: Error not defined");
            }
        };
        model.getProperiesException = function (resp) {
            if (resp.data !== undefined && resp.data !== null) {
                model.wrapShowMessage(resp.data.messageText, model.errorMsgs.selectUnitTypeError);
            }
        };        
        return model;
    }

    angular
        .module("budgeting")
        .factory('selectUnitTypeError', [
           'appLangTranslate', 'notificationService',
            factory
        ]);
})(angular);

