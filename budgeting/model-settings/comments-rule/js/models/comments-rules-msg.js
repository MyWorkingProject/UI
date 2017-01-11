//  Budget Model Error Model

(function (angular) {
    "use strict";

    function LeaseOptionsError(nfnSvc, langTranslate) {
        var model, notification, options, translate;
        translate = langTranslate('comments-rule').translate;

        model = {};
        //notification = notificationModel();
        options = {};

        model.emptyData = {
            getErrorMsgs: {
                "INVALID_PARAM": {
                    title: translate('comments_rule_get_msgs_inv_param_txt'),
                    desc: translate('comments_rule_get_msgs_inv_param_txt'),
                    info: translate('comments-rule_get_msgs_inv_param_txt')
                },
                "NOT_FOUND": {
                    title: translate('comments_rule_get_msgs_ntfnd_err_desc'),
                    desc: translate('comments_rule_get_msgs_ntfnd_err_desc'),
                    info: translate('comments_rule_get_msgs_ntfnd_err_desc')
                }
            },
            putErrorMsgs: {
                "INVALID_PARAM": {
                    title: translate('comments_rule_put_msgs_inv_param_txt'),
                    desc: translate('comments_rule_put_msgs_inv_param_txt'),
                    info: translate('comments_rule_put_msgs_inv_param_txt')
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
                logc("Budget Rule based comments options settings module: Error not defined");
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
            nfnSvc.success(translate('comments_rule_save_succ_msg_txt'));
        };

        model.reset = function () {
            angular.copy(model.emptyData, model.form);
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('CommentsRulesError', [
            'notificationService',
            'appLangTranslate',
            LeaseOptionsError
        ]);
})(angular);
