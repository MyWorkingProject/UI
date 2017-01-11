//  Budget Model Error Model

(function (angular) {
    "use strict";

    function BdgtModelMsg(nfnSvc, langTranslate) {
        var model, notification, options, translate;
        translate = langTranslate('BdgtModelDetails').translate;

        model = {};
        //notification = notificationModel();
        options = {};

        model.emptyData = {
            errorMsgs: {
                "INVALID_PARAM": {
                    title: translate('bdgt_model_msgs_inv_param_txt'),
                    desc: translate('bdgt_model_msgs_inv_param_txt'),
                    info: translate('bdgt_model_msgs_inv_param_txt')
                },
                "UNKNOWN_ERROR": {
                    title: translate('bdgt_model_msgs_unknwn_err_txt'),
                    desc: translate('bdgt_model_msgs_unknwn_err_desc'),
                    info: translate('bdgt_model_msgs_unknwn_err_desc')
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

        model.wrapShowMsg = function (msg) {
            if (model.form.errorMsgs[msg]) {
                model.showErrorMsg(model.form.errorMsgs[msg]);
            }
            else {
                logc("Budget Model Base Module: Error not defined");
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

        model.onError = function (resp) {
            if (model.isStatus(resp, 400)) {
                var msg = model.fetchErrorMessage(resp);
                model.wrapShowMsg(msg);
            }
        };

        model.showErrorMsg = function (msg) {
            options = {
                type: 'error',
                autoHideTime: -1,
                title: msg.title,
                descr: msg.desc
            };

            //options.actions = [{
            //    text: 'Close',
            //    method: notification.hide
            //}];

            model.showNotification(msg.title);
        };

        model.showNotification = function (data) {
            //notification.flushAll();
            //notification.extend(data).show();
            nfnSvc.error(data);
        };

        model.reset = function () {
            angular.copy(model.emptyData, model.form);
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('BdgtModelMsg', [
            'notificationService',
            'appLangTranslate',
            BdgtModelMsg
        ]);
})(angular);
