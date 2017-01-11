//  Users List Notifications Model

(function (angular) {
    "use strict";

    function factory(notificationModel) {
        var model = {}, notification = notificationModel(), options;

        model.notification = notificationModel();

        model.showErrorNotification = function (title, desc) {
            options = {
                type: 'error',
                autoHideTime: -1,
                title: title,
                descr: desc
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
        .factory('masterchartNotifications', [
            'rpNotificationModel',
            factory
        ]);
})(angular);

