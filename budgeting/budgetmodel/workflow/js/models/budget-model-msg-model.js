//  Budget Model Workflow Error Model

(function (angular) {
    "use strict";

    function BdgtModelWorkflowMsg() {
        var model, notification, options;
        //translate = langTranslate('defaultAdjustment').translate;
        model = {};
        //notification = notificationModel();
        options = {};

        model.emptyData = {
            errorMsgs: {
                "INVALID_PARAM": {
                    title: "Invalid Parameter",
                    desc: "Invalid Parameter",
                    info: "Invalid Parameter"
                },
                "UNKNOWN_ERROR": {
                    title: "Unknown Error",
                    desc: "Unable to show information becasue of unknown error",
                    info: "Unable to show information becasue of unknown error"
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

            model.showNotification(options);
        };

        model.showNotification = function (data) {
            //notification.flushAll();
            //notification.extend(data).show();
        };

        model.reset = function () {
            angular.copy(model.emptyData, model.form);
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('BdgtModelWorkflowMsg', [
            BdgtModelWorkflowMsg
        ]);
})(angular);
