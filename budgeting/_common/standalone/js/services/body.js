//  Body Service

(function (angular) {
    "use strict";

    function BodySvc(windowSize, watchable, deviceInfoSvc, eventStream) {
        var svc = {},
            hasTouch = deviceInfoSvc.hasTouch(),
            eventNames = ['click', 'mouseDown', 'mouseMove', 'mouseUp', 'mouseLeave'];

        if (hasTouch) {
            eventNames = ['touchStart', 'touchMove', 'touchEnd'];
        }

        eventNames.forEach(function (name) {
            svc[name] = watchable();
        });

        svc.isLocked = watchable();
        svc.minHeight = watchable();
        svc.minHeightVersion = watchable();

        svc.animation = watchable();

        svc.updateMinHeight = function () {
            svc.minHeightVersion.set(Date.now());
        };

        windowSize.subscribe(svc.updateMinHeight);

        return svc;
    }

    angular
        .module("budgeting")
        .factory('BodySvc', [
            'windowSize',
            'watchable',
            'deviceInfoSvc',
            'eventStream',
            BodySvc
        ]);
})(angular);
