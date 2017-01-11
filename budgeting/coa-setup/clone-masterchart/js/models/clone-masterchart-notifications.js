//  Property List Model

(function (angular) {
    "use strict";

    function factory(langTranslate, notificationModel) {
        var model = {};

        var translate, notification = notificationModel();
        translate = langTranslate('cloneMasterchart').translate;


        model.cloneChartErrorObj = {
            errorMsgs: {
                "INVALID_PARAM": {
                    title: translate('bdgt_clonemasterchart_erroPopText'),
                    desc: translate('bdgt_clonemasterchart_invalid_param')
                },
                "UNKNOWN_ERROR": {
                    title: translate('bdgt_clonemasterchart_erroPopText'),
                    desc: translate('bdgt_clonemasterchart_unknown_error')
                }
            }
        };

        model.wizErrorObj = {
            errorMsgs: {
                "INVALID_PARAM": {
                    title: translate('bdgt_clonemasterchart_erroPopText'),
                    desc: translate('bdgt_clonemasterchart_wizard_update_failure')
                }
            }
        };



        model.showNotification = function (data) {
            notification.flushAll();
            notification.extend(data).show();
        };

        model.showErrorNotification = function (msg) {
            var options = {
                type: "error",
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

        model.wrapShowMsg = function (msg, obj) {
            if (obj.errorMsgs[msg]) {
                model.showErrorNotification(obj.errorMsgs[msg]);
            }
            else {
                logc("Clone chart Error Handling Module: Error not defined");
            }
        };

        model.getCloneChartError = function (response) {
            if (response.status === 400) {
                model.wrapShowMsg(response.data.message, model.cloneChartErrorObj);
            }
        };

        model.wizardFailure = function (response) {
            if (response.status === 400) {
                model.wrapShowMsg(response.data.message, model.wizErrorObj);
            }
        };


        return model;
    }

    angular
        .module("budgeting")
        .factory('cloneChartNotification', [
           'appLangTranslate', 'rpNotificationModel',
            factory
        ]);
})(angular);

