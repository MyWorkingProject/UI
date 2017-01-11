//  Overlay Service

angular.module("budgeting").factory('overlaySvc', ['$rootScope', '$compile', 'watchable',
    function ($rootScope, $compile, watchable) {
        var instance,
            installed = false,
            body = angular.element('body'),
            overlayHtml = '<overlay model="overlayModel" />';

        function overlaySvc() {
            var s = this;
            s.init();
        }

        var p = overlaySvc.prototype;

        p.init = function () {
            var s = this;
            s.model = {};
            s.model.event = watchable();
            return s;
        };

        p.install = function () {
            var s = this,
                $scope = $rootScope.$new(),
                overlay = angular.element(overlayHtml);

            if (installed) {
                return s;
            }

            installed = true;
            $scope.overlayModel = s.model;
            $compile(overlay)($scope);
            body.append(overlay);
            return s;
        };

        p.trigger = function (eventName) {
            var s = this;
            s.model.event.set(eventName);
            return s;
        };

        return function () {
            if (!instance) {
                instance = new overlaySvc();
            }
            return instance;
        };
    }
]);
