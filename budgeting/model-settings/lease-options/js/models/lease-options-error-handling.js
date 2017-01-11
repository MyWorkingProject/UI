//  Budget Model Error Model

(function (angular) {
    "use strict";

    function LeaseOptionsError(nfnSvc, langTranslate) {
        var model, notification, options, translate;
        translate = langTranslate('LeaseOptions').translate;

        model = {};
        //notification = notificationModel();
        options = {};

        model.emptyData = {
            getErrorMsgs: {
                "INVALID_PARAM": {
                    title: translate('lease_options_get_msgs_inv_param_txt'),
                    desc: translate('lease_options_get_msgs_inv_param_txt'),
                    info: translate('lease_options_get_msgs_inv_param_txt')
                },
                "UNKNOWN_ERROR": {
                    title: translate('lease_options_get_msgs_unknwn_err_desc'),
                    desc: translate('lease_options_get_msgs_unknwn_err_desc'),
                    info: translate('lease_options_get_msgs_unknwn_err_desc')
                }
            },
            putErrorMsgs: {
                "INVALID_PARAM": {
                    title: translate('lease_options_put_msgs_inv_param_txt'),
                    desc: translate('lease_options_put_msgs_inv_param_txt'),
                    info: translate('lease_options_put_msgs_inv_param_txt')
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
                logc("Budget lease options settings module: Error not defined");
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
            if (model.isStatus(resp, 400)) {
                var msg = model.fetchErrorMessage(resp);
                model.wrapShowMsg(msg,model.form.getErrorMsgs);
            }
        };

        model.onPutError = function (resp) {
            if (model.isStatus(resp, 400)) {
                var msg = model.fetchErrorMessage(resp);
                model.wrapShowMsg(msg,model.form.putErrorMsgs);
            }
        };

        model.showErrorMsg = function (msg) {
           /* options = {
                type: 'error',
                autoHideTime: -1,
                title: msg.title,
                descr: msg.desc
            };*/

            //options.actions = [{
            //    text: 'Close',
            //    method: notification.hide
            //}];

            model.showNotification(msg.desc);
        };

        model.showNotification = function (data) {
            nfnSvc.error(data);
        };

        model.showSaveSuccNotification = function () {
            nfnSvc.success(translate('lease_options_save__succ_msg_txt'));
        };

        model.reset = function () {
            angular.copy(model.emptyData, model.form);
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('LeaseOptionsError', [
            'notificationService',
            'appLangTranslate',
            LeaseOptionsError
        ]);
})(angular);
