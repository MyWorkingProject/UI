//  Scrolling Tabs Slider Directive

(function (angular) {
    "use strict";

    function rpScrollingTabsSlider(timeout, watchable) {
        function link(scope, elem, attr) {
            var timer,
                model = scope.model,
                dir = scope.tabsSlider;

            function setWidth() {
                timeout.cancel(timer);

                timer = timeout(function () {
                    var width = 0;

                    model.forEach(function (tab) {
                        width += tab.width.get();
                    });

                    elem.width(width);
                    dir.width.set(width);
                });
            }

            if (model) {
                model.forEach(function (tab) {
                    tab.width.watch(setWidth);
                });
            }
        }

        return {
            link: link,
            restrict: 'C'
        };
    }

    angular
        .module("app")
        .directive('rpScrollingTabsSlider', [
            'timeout',
            'watchable',
            rpScrollingTabsSlider
        ]);
})(angular);
