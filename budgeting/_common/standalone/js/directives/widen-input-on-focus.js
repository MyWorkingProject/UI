//  Widen On Focus Directive

(function (angular) {
    "use strict";

    function widenOnFocus() {
        var body,
            evns = '.widenOnFocus';

        function link(scope, elem, attr) {
            var dir = {},
                defWidth = 0,
                widthIncr = 0,
                active = false,
                blur = 'blur' + evns,
                focus = 'focus' + evns,
                mouseleave = 'mouseleave' + evns;

            function init() {
                defWidth = elem.width();
                elem.on(focus, dir.activate);
                body = body || angular.element('body');
                widthIncr = parseInt(attr.widenOnFocus);
            }

            dir.allowAnimation = function () {
                return body.width() > 620;
            };

            dir.activate = function () {
                if (dir.allowAnimation()) {
                    active = true;
                    dir.animate();
                    elem.on(blur, dir.deactivate);
                    body.on(mouseleave, dir.triggerBlur);
                }
            };

            dir.deactivate = function () {
                if (dir.allowAnimation()) {
                    active = false;
                    dir.animate();
                    elem.off(blur);
                    body.off(mouseleave);
                }
            };

            dir.triggerBlur = function () {
                dir.deactivate();
                elem.trigger(blur);
            };

            dir.animate = function () {
                var width = active ? widthIncr : 0;
                elem.animate({
                    width: defWidth + width
                }, 200);
            };

            init();
        }

        return {
            link: link,
            restrict: 'A'
        };
    }

    angular
        .module("budgeting")
        .directive('widenOnFocus', [widenOnFocus]);
})(angular);
