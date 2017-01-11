//  New User Form Model

(function (angular) {
    "use strict";

    function factory(appLangTranslate, dialogSvc, notificationModel) {
        var model, translate, notification = notificationModel();
        model = {};
        model.chartName = "";
        translate = appLangTranslate('newMasterchart').translate;
        model.assignChartName = function (chartName) {
            model.chartName = chartName;
        };

        model.chartFailureErrorObject = {
            errorMsgs: {
                "CHART_NOT_FOUND": {
                    title: translate('bdgt_newmasterchart_erroPopText'),
                    desc: translate('bdgt_newmasterchart_chart_not_found')
                },
                "INVALID_PARAM": {
                    title: translate('bdgt_newmasterchart_erroPopText'),
                    desc: translate('bdgt_newmasterchart_invalid_param')
                }
            }
        };

        model.wizardFailureErrorObject = {
            errorMsgs: {
                "INVALID_PARAM": {
                    title: translate('bdgt_newmasterchart_erroPopText'),
                    desc: translate('bdgt_newmasterchart_wizard_update_failure')
                }
            }
        };

        model.wrapShowMsg = function (msg, obj) {
            if (obj.errorMsgs[msg]) {
                model.showErrorNotification(obj.errorMsgs[msg]);
            }
            else {
                logc("New Master chart Error Handling Module: Error not defined");
            }
        };

        model.masterChartFailure = function (response) {
            if (response.status === 400) {
                if (response.data.messageText === "DUPLICATE") {
                    //Duplicate master chart name exists
                    model.showDuplcateMessage();
                }
                else {
                    model.wrapShowMsg(response.data.message, model.chartFailureErrorObject);
                }
            }

        };

        model.wizardFailure = function (response) {
            if (response.status === 400) {
                model.wrapShowMsg(response.data.message, model.wizardFailureErrorObject);
            }
        };

        model.showDuplcateMessage = function (formName) {

            var dialog = dialogSvc();
            dialog.update({
                type: 'warn',
                showCancel: true,
                showContinue: false,
                cancelButtonText: 'close',
                title: translate('bdgt_newmasterchart_existsmsg'),
                question: '',
                info: model.chartName + ' ' + translate('bdgt_newmasterchart_existsdetmsg')
            });

            dialog.show();
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

        return model;
    }

    angular
        .module("budgeting")
        .factory('newMasterchartErrorModel', ['appLangTranslate', 'rpDialogModel', 'rpNotificationModel', factory]);
})(angular);
