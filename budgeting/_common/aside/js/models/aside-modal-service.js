(function () {
    'use strict';

    function factory($rootScope, $q, $aside, asideOptions) {
        return function (options) {
            var model = {},
                modal,
                scope,
                doneHandler,
                cancelHandler,
                notifyHandler,
                listenHandler;

            function init() {
                return model;
            }

            model.show = function () {
                if (!modal) {
                    model.resolve(options.resolve || {});
                }
                modal.$promise.then(modal.show);
                return model;
            };

            model.done = function (handler) {
                doneHandler = handler;
                return model;
            };

            model.cancel = function (handler) {
                cancelHandler = handler;
                return model;
            };

            model.listen = function (handler) {
                listenHandler = handler;
                return model;
            };

            model.notify = function (data) {
                if (modal.$isShown) {
                    model.listenInvoker(data);
                }
            };

            model.destroy = function () {
                if (modal) {
                    modal.destroy();
                    modal = undefined;
                }
            };

            model.hide = function () {
                modal.hide();
            };

            model.isVisible = function () {
                return !modal && modal.$isShown;
            };

            model.doneInvoker = function (result) {
                model.hide();
                if (angular.isFunction(doneHandler)) {
                    doneHandler(result);
                }
            };

            model.cancelInvoker = function (result) {
                model.hide();
                if (angular.isFunction(cancelHandler)) {
                    cancelHandler(result);
                }
            };

            model.notifyInvoker = function (data) {
                if (angular.isFunction(listenHandler)) {
                    listenHandler(data);
                }
            };

            model.listenInvoker = function (data) {
                if (angular.isFunction(notifyHandler)) {
                    notifyHandler(data);
                }
            };

            model.asideModalInstance = function(){
                return {
                    done: model.doneInvoker,
                    cancel: model.cancelInvoker,
                    notify: model.notifyInvoker,
                    listen: function(handler){
                        notifyHandler = handler;
                    }
                };
            };

            model.resolve = function (resolver) {
                scope = $rootScope.$new();
                if (typeof (options) === "string") {
                    options = asideOptions(options);
                }
                options.scope = scope;
                options.show = false;
                options.prefixEvent = options.prefixEvent || "rpBdgt.aside.modal";                
                options.resolve = resolver;
                options.resolve.rpBdgtAsideModalInstance = model.asideModalInstance;

                scope.$on(options.prefixEvent + '.hide', function () {
                    modal.destroy();
                    modal = undefined;
                });
                modal = $aside(options);
                return model;
            };

            return init();

        };
    }

    angular
        .module("budgeting")
        .factory("rpBdgtAsideModalService", [
            '$rootScope',
            '$q',
            '$aside',
            'rpBdgtAsideOptions',
            factory
        ]);
})();
