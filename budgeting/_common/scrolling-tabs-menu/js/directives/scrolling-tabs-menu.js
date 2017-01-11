//  Scrolling Tabs Menu Directive

(function (angular) {
    "use strict";

    function rpScrollingTabsMenu(timeout, watchable, windowSize) {
        function link(scope, elem, attr, vm) {
            var dir = {};

            dir.getWidth = function () {
                return elem.width();
            };

            function setup() {
                timeout(function () {
                    // vm.setControls();
                    // timeout(vm.setScrollStops);
                });
            }

            windowSize.subscribe(setup);

            scope.tabsSlider.width.watch(setup);
        }

        return {
            scope: {
                model: '='
            },
            link: link,
            restrict: 'E',
            replace: true,
            controller: 'rpScrollingTabsMenuCtrl as vm',
            templateUrl: "templates/realpage/scrolling-tabs-menu/scrolling-tabs-menu.html"
        };
    }

    angular
        .module("app")
        .directive('rpScrollingTabsMenu', [
            'timeout',
            'watchable',
            'windowSize',
            rpScrollingTabsMenu
        ]);
})(angular);
