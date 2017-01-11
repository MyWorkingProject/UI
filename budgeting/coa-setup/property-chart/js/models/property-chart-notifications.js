//  Property List Model

(function (angular) {
    "use strict";

    function factory(langTranslate, notificationModel) {
        var model = {};

        var translate, notification = notificationModel();
        translate = langTranslate('propertyChart').translate;


        model.getPropertyChartError = function (response) {
            if (response.status === 400) {
                model.showErrorNotification(translate('bdgt_propertychart_erroPopText'), translate('bdgt_propertychart_unknown_error'));
            }

        };

        model.showNotification = function (data) {
            notification.flushAll();
            notification.extend(data).show();
        };

        model.showErrorNotification = function (title, desc) {
            var options = {
                type: "error",
                autoHideTime: -1,
                title: title,
                descr: desc
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
        .factory('propertyChartNotification', [
           'appLangTranslate', 'rpNotificationModel',
            factory
        ]);
})(angular);

