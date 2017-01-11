//  Budget Model Error Model

(function (angular) {
    "use strict";

    function actualRentCapError(nfnSvc, langTranslate) {
        var model, notification, options, translate;
        translate = langTranslate('actual-rent-cap').translate;

        model = {};
        //notification = notificationModel();
        options = {};

        model.emptyData = {
            getErrorMsgs: {
                "INVALID_PARAM": {
                    desc: translate('actual_rent_cap_get_invalid_param_error')
                 
                },
                "NOT_FOUND": {
                    desc: translate('actual_rent_cap_get_no_data_error')
                   
                }
            },
            putErrorMsgs: {
                "INVALID_PARAM": {
                    desc: translate('actual_rent_cap_put_invalid_param_error')
                   
                }
            }
        };

        model.form = {};
        angular.copy(model.emptyData, model.form);

        model.fetchErrorMessage = function (err) {
            if (err.data.message !== undefined && err.data.message !== "") {
                return model.getKeyFromMessage(err.data.message);
            }
            else {
                return err.data.message;
            }
        };

        model.errorHasKey = function (msg) {
            return msg.match("|");
        };

        model.getKeyFromMessage = function (msg) {
            var array = msg.split('|');
            return array[0];
        };

        model.wrapShowMsg = function (msg,obj) {
            if (obj[msg]) {
                model.showErrorMsg(obj[msg]);
            }
            else {
                logc("Budget Actual rent cap settings module: Error not defined");
            }
        };

        model.isStatus = function (resp, status) {
            if (resp.status === status) {
                return true;
            }
            else {
                return false;
            }
        };

        model.onGetError = function (resp) {
            //if (model.isStatus(resp, 400)) {
                var msg = model.fetchErrorMessage(resp);
                model.wrapShowMsg(msg, model.form.getErrorMsgs);
            //}
        };

        model.onPutError = function (resp) {
           // if (model.isStatus(resp, 400)) {
                var msg = model.fetchErrorMessage(resp);
                model.wrapShowMsg(msg,model.form.putErrorMsgs);
            //}
        };

        model.showErrorMsg = function (msg) {
            model.showNotification(msg.desc);
        };

        model.showNotification = function (data) {
            nfnSvc.error(data);
        };

        model.showSaveSuccNotification = function () {
           nfnSvc.success(translate('actual_rent_cap_save_succ_msg'));
        };

        model.showSaveErrorNotification = function () {
          nfnSvc.error(translate('actual_rent_cap_save_err_msg'));
        };

        model.reset = function () {
            angular.copy(model.emptyData, model.form);
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('actualRentCapError', [
            'notificationService',
            'appLangTranslate',
            actualRentCapError
        ]);
})(angular);
