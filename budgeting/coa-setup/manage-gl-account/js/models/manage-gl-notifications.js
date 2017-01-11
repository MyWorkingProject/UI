//  Users List Notifications Model

(function (angular) {
    "use strict";

    function factory(notificationModel) {
        var model = {}, notification = notificationModel(), options;

        model.notification = notificationModel();

        model.showErrorNotification = function (title, desc, type) {
            var obj = {
                "title": title,
                "desc": desc,
                "type": type
            };
            model.showErrorInfo(obj);
        };

        model.showErrorInfo = function (msg) {
            options = {
                type: msg.type,
                autoHideTime: -1,
                title: msg.title,
                descr: msg.desc
            };

            options.actions = [{
                text: 'Close',
                method: notification.hide
            }];

            model.notification.extend(options).show();
        };

        model.showSuccessNotification = function (desc) {
            var options = {
                type: 'success',
                autoHideTime: 3000,
                title: '',
                descr: desc
            };

            model.notification.extend(options).show();
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('manageglNotifications', [
            'rpNotificationModel',
            factory
        ]);
})(angular);

