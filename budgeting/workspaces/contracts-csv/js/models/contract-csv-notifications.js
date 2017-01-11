//  Users List Notifications Model

(function (angular) {
    'use strict';

    function factory(notificationModel) {
        var model = {},options;
        //notification = notificationModel()

        //model.notification = notificationModel();

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
                method: ''//notification.hide
            }];

            notificationModel.error(msg.desc);
            //model.notification.extend(options).show();
        };


        model.showErrorInfoDesc = function (msg,desc) {
            notificationModel.error(msg.desc + desc);
            //model.notification.extend(options).show();
        };

       model.showError = function (desc) {
            notificationModel.error(desc);
            //model.notification.extend(options).show();
        }; 
        

        model.showSuccessNotification = function (msg) {
           /* var options = {
                type: 'success',
                autoHideTime: 3000,
                title: '',
                descr: desc
            }; */
             notificationModel.success(msg);
           // model.notification.extend(options).show();
        };

        return model;
    }

    angular
        .module('budgeting')
        .factory('contractCSVNotifications', [
            'notificationService',
            factory
        ]);
})(angular);

