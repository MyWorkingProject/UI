(function () {
    'use strict';

    function factory($rootScope, $modal, modalOptions) {
        function modalService(options) {
            var model = {},
                doneHandler, cancelHandler,
                modal;

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

            model.modalInstance = function () {
                return {
                    done: model.doneInvoker,
                    cancel: model.cancelInvoker
                };
            };

            model.hide = function () {
                modal.hide();
            };

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

            model.resolve = function (resolver) {
                var scope = $rootScope.$new();
                if (typeof (options) === "string") {
                    options = modalOptions(options);
                }
                options.scope = scope;
                options.show = false;
                options.prefixEvent = options.prefixEvent || "rpBdgt.modal";
                options.resolve = resolver;

                scope.$on(options.prefixEvent + '.hide', function () {
                    modal.destroy();
                    modal = undefined;
                });
                modal = $modal(options);

                options.resolve = resolver;
                options.resolve.rpBdgtModalInstance = model.modalInstance;
                modal = $modal(options);
                return model;
            };

            model.destroy = function () {
                if (modal) {
                    modal.destroy();
                }
                model = undefined;
            };

            return model;
        }

        modalService.confirm = function (options) {
            options = options || {};
            var _options = angular.extend(modalOptions('confirm'), options);
            var model = modalService(_options);

            model.modalInstance = function () {
                return {
                    accept: model.doneInvoker,
                    reject: model.cancelInvoker
                };
            };

            model.setContent = function (content) {
                _options.resolve.rpBdgtContentModel = function () {
                    return content;
                };
                return model;
            };

            model.setResult = function (result) {
                _options.resolve.rpBdgtResultModel = function () {
                    return result;
                };
                return model;
            };

            model.accept = function (handler) {
                model.done(handler);
                return model;
            };

            model.reject = function (handler) {
                model.cancel(handler);
                return model;
            };

            return model;
        };

        modalService.alert = function (options) {
            options = options || {};
            var _options = angular.extend(modalOptions('alert'), options);
            var model = modalService(_options);

            model.modalInstance = function () {
                return {
                    ok: model.doneInvoker,
                    cancel: model.cancelInvoker
                };
            };

            model.setContent = function (content) {
                _options.resolve.rpBdgtContentModel = function () {
                    return content;
                };
                return model;
            };

            model.ok = function (handler) {
                model.done(handler);
                return model;
            };

            return model;
        };

        return modalService;
    }

    angular
        .module("budgeting")
        .factory("rpBdgtModalService", [
            '$rootScope',
            '$modal',
            'rpBdgtModalOptions',
            factory
        ]);
})();
