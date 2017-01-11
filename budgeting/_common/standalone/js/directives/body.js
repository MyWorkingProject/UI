//  Body Directive

(function (angular) {
    "use strict";

    function body($document, BodySvc, deviceInfoSvc, windowSize) {
        var svc = BodySvc,
            html = angular.element('html'),
            doc = angular.element($document),
            hasTouch = deviceInfoSvc.hasTouch();

        function link(scope, elem, attr) {
            var eventNames = ['click', 'mouseDown', 'mouseMove', 'mouseUp', 'mouseLeave'];

            if (hasTouch) {
                eventNames = ['touchStart', 'touchMove', 'touchEnd'];
            }

            eventNames.forEach(function (name) {
                var eventName = name.toLowerCase() + '.body';
                elem.on(eventName, function (e) {
                    scope.$apply(function () {
                        svc[name].set(e);
                    });
                });
            });

            function resize() {
                var docHeight = doc.height(),
                    windowHeight = windowSize.getSize().height,
                    minHt = windowHeight > docHeight ? windowHeight : docHeight;

                svc.minHeight.set(minHt);
            }

            svc.minHeight.watch(function (minHeight) {
                elem.css('minHeight', minHeight);
            });

            svc.minHeightVersion.watch(function () {
                elem.css('minHeight', '');
                svc.minHeight.set('');

                resize();

                resize.delay(200);

                resize.delay(2000);
            });

            svc.isLocked.watch(function (isLocked) {
                html[isLocked ? 'addClass' : 'removeClass']('locked');
                elem[isLocked ? 'addClass' : 'removeClass']('locked');
            });

            svc.animation.watch(function (anim) {
                var data = {};
                data[anim.metric] = anim.value;
                elem.animate(data, anim.time);
            });
        }

        return {
            link: link,
            restrict: "E"
        };
    }

    angular
        .module("budgeting")
        .directive("body", [
            '$document',
            'BodySvc',
            'deviceInfoSvc',
            'windowSize',
            body
        ]);
})(angular);

//  Body Directive

// angular.module("budgeting").directive('body', ['$document', 'BodySvc', 'deviceInfoSvc', 'windowSize',

//     function ($document, BodySvc, deviceInfoSvc, windowSize) {
//         var svc = BodySvc,
//             html = angular.element('html'),
//             doc = angular.element($document),
//             hasTouch = deviceInfoSvc.hasTouch();

//         function link(scope, element, attributes) {
//             var eventNames = ['click', 'mouseDown', 'mouseMove', 'mouseUp', 'mouseLeave'];

//             if (hasTouch) {
//                 eventNames = ['touchStart', 'touchMove', 'touchEnd'];
//             }

//             eventNames.forEach(function (name) {
//                 var eventName = name.toLowerCase() + '.body';
//                 element.on(eventName, function (e) {
//                     scope.$apply(function () {
//                         svc[name].set(e);
//                     });
//                 });
//             });

//             function resize() {
//                 var docHeight = doc.height(),
//                     windowHeight = windowSize.height.get(),
//                     minHt = windowHeight > docHeight ? windowHeight : docHeight;

//                 svc.minHeight.set(minHt);
//             }

//             svc.minHeight.watch(function (minHeight) {
//                 element.css('minHeight', minHeight);
//             });

//             svc.minHeightVersion.watch(function () {
//                 element.css('minHeight', '');
//                 svc.minHeight.set('');

//                 resize();

//                 resize.delay(200);

//                 resize.delay(2000);
//             });

//             svc.isLocked.watch(function (isLocked) {
//                 html[isLocked ? 'addClass' : 'removeClass']('locked');
//                 element[isLocked ? 'addClass' : 'removeClass']('locked');
//             });

//             svc.animation.watch(function (anim) {
//                 var data = {};
//                 data[anim.metric] = anim.value;
//                 element.animate(data, anim.time);
//             });
//         }

//         return {
//             link: link,
//             restrict: 'E'
//         };
//     }
// ]);
