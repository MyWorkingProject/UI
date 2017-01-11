//  Scrolling Tabs Screen Directive

(function (angular) {
    "use strict";

    function rpScrollingTabsScreen(timeout, windowSize) {
        function link(scope, elem, attr) {
            var dir = scope.tabsScreen;

            dir.getWidth = function () {
                return elem.width();
            };

            dir.scroll = function (sl, time) {
                elem.animate({
                    scrollLeft: sl
                }, time || 250);
            };

            dir.reset = function () {
                elem.prop('scrollLeft', 0);
            };
        }

        return {
            link: link,
            restrict: 'C'
        };
    }

    angular
        .module("app")
        .directive('rpScrollingTabsScreen', [
            'timeout',
            'windowSize',
            rpScrollingTabsScreen
        ]);
})(angular);
