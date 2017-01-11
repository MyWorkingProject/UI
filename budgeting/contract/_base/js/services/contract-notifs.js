// New Contract Notification Controller

(function (angular, logc) {
    "use strict";

    function NotificationService(notifSvc, i18n) {

        this.generic = function (opt) {
            notifSvc.notify(opt);
        };

        this.inform = function(msgKey) {
            notifSvc.info( i18n.translate(msgKey) );
        };

        this.todo = function (msg) {
            logc("TODO: %s", msg);
            notifSvc.notice("This feature is not yet available.");
        };

        this.error = function (titleKey, msgKey) {
            if(titleKey && msgKey) {
                var opt = {
                    type: "error",
                    icon: true,
                    title: i18n.translate(titleKey),
                    text: i18n.translate(msgKey)
                };

                notifSvc.notify(opt);
            } else if(titleKey) {
                notifSvc.error( i18n.translate(titleKey) );
            } else if(msgKey) {
                notifSvc.error( i18n.translate(msgKey) );
            } 
        };

        this.confirmDialog = function(titleKey, msgKey, confirmCallback, cancelCallback) {
            var opt = {
                title: i18n.translate(titleKey),
                text: i18n.translate(msgKey),
                hide: false,
                confirm: {
                    confirm: true
                },
                buttons: {
                    closer: false,
                    sticker: false
                },
                history: {
                    history: false
                }
            };

            if(!confirmCallback) {
                confirmCallback = angular.noop;
            }
            if(!cancelCallback) {
                cancelCallback = angular.noop;
            }

            notifSvc.notify(opt).get()
                .on("pnotify.confirm", confirmCallback)
                .on("pnotify.cancel", cancelCallback);
        };

    }

    angular
        .module("budgeting")
        .service("contractNotifSvc", [
            "notificationService",
            "contractTranslatorSvc",
            NotificationService
        ]);
})(angular, logc);
