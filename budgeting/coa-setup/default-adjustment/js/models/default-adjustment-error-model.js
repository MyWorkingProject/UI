//  Default Adjustment Error Model

(function (angular) {
    "use strict";

    function factory(langTranslate, notificationModel) {
        var model, translate, notification, options;
        translate = langTranslate('defaultAdjustment').translate;
        model = {};
        notification = notificationModel();
        options = {};

        model.emptyData = {
            errorMsgs: {
                "INVALID_PARAM": {
                    title: translate('bdgt_defadj_error_title_invalid_param'),
                    desc: translate('bdgt_defadj_error_desc_invalid_param'),
                    info: translate('bdgt_defadj_error_info_invalid_param')
                },
                "UNKNOWN_ERROR": {
                    title: translate('bdgt_defadj_error_title_unknown_error'),
                    desc: translate('bdgt_defadj_error_desc_unknown_error'),
                    info: translate('bdgt_defadj_error_info_unknown_error')
                },

                "CHART_NOT_FOUND": {
                    title: translate('bdgt_defadj_error_title_chart_not_found'),
                    desc: translate('bdgt_defadj_error_desc_chart_not_found'),
                    info: translate('bdgt_defadj_error_info_chart_not_found')
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
                logc("Import Error Handling Module: Error not defined");
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

        model.showSuccMessage = function () {
            options = {
                type: 'success',
                autoHideTime: 3000,
                title: '', //Need to update from lang bundle
                descr: translate('bdgt_defadj_bdgt_model_success_appled')
            };

            options.actions = [{
                text: 'Close',
                method: notification.hide
            }];

            model.showNotification(options);
        };

        model.showErrorMsg = function (msg) {
            options = {
                type: 'error',
                autoHideTime: -1,
                title: msg.title,
                descr: msg.desc
            };

            options.actions = [{
                text: 'Close',
                method: notification.hide
            }];

            model.showNotification(options);
        };

        model.showNotification = function (data) {
            notification.flushAll();
            notification.extend(data).show();
        };

        model.reset = function () {
            angular.copy(model.emptyData, model.form);
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('defaultAdjustmentErrModel', [
            'appLangTranslate',
            'rpNotificationModel',
            factory
        ]);
})(angular);
