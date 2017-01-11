
(function (angular) {
    "use strict";

    function factory(notificationModel) {
        var model = {}, options;

     

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
            notificationModel.success(desc);
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('rentOptionsNotifications', [
            'notificationService',
            factory
        ]);
})(angular);

