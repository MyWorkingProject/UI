//  Users List Notifications Model

(function (angular) {
    "use strict";

    function factory(notificationModel) {
        var model = {}, options;

       // model.notification = notificationModel();

      /*  model.showErrorNotification = function (title, desc, type) {
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
        }; */

     model.showErrorInfo = function (msg) {
            if(msg.type=="notify"){
                model.showNotifyDialog(msg);
            }
            else if(msg.type=="error"){
                model.showErrorMsg(msg);
            }
        };

         model.showNotifyDialog=function(msg){
            notificationModel.notify(
            { 
                title: msg.title, 
                title_escape: false, 
                text: msg.desc, 
                text_escape: false, 
                styling: "bootstrap3", 
                type: "notice", 
                icon: true });
        };

        model.showErrorMsg=function(msg){
                notificationModel.error(msg.desc);
        };

        
        model.showSuccessNotification = function (desc) {
           /* var options = {
                type: 'success',
                autoHideTime: 3000,
                title: '',
                descr: desc
            };

            model.notification.extend(options).show();*/

            notificationModel.success(desc);
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('budgetTasksNotifications', [
            'notificationService',
            factory
        ]);
})(angular);

