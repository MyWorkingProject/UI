//  Scrolling Tab Directive

(function (angular) {
    "use strict";

    function rpScrollingTab(timeout, computedStyle) {
        function link(scope, elem, attr) {
            timeout(function () {
                var style = computedStyle(elem);
                scope.model.width.set(style.outerWidth(true));
            });
        }

        return {
            scope: {
                model: '='
            },
            link: link,
            restrict: 'C'
        };
    }

    angular
        .module("app")
        .directive('rpScrollingTab', ['timeout', 'rpComputedStyle', rpScrollingTab]);
})(angular);
