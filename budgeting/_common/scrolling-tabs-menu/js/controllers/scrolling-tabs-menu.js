//  Scrolling Tabs Menu Controller

(function (angular) {
    "use strict";

    function ScrollingTabsMenuCtrl($scope, watchable) {
        var vm = this,
            screen = {},
            slider = {},
            scrollIndex = 0,
            scrollStops = [0],
            tabs = $scope.model;

        vm.init = function () {
            slider.width = watchable(0);

            $scope.tabsScreen = screen;
            $scope.tabsSlider = slider;

            if (tabs && tabs.forEach) {
                tabs.forEach(function (tab) {
                    tab.width = watchable(0);
                });
            }
        };

        vm.scrollReset = function () {
            screen.reset();
        };

        vm.scrollLeft = function () {
            scrollIndex++;
            vm.canScrollRight = scrollIndex > 0;
            vm.canScrollLeft = scrollIndex < scrollStops.length - 1;
            screen.scroll(scrollStops[scrollIndex]);
        };

        vm.scrollRight = function () {
            scrollIndex--;
            vm.canScrollRight = scrollIndex > 0;
            vm.canScrollLeft = scrollIndex < scrollStops.length - 1;
            screen.scroll(scrollStops[scrollIndex]);
        };

        vm.setControls = function () {
          //  vm.scrollEnabled = screen.getWidth() < slider.width.get();
            return vm;
        };

        vm.setScrollStops = function () {
            var tabWidth,
                stop = 0,
                complete = false,
                screenWidth = screen.getWidth(),
                sliderWidth = slider.width.get(),
                scrollWidth = sliderWidth - screenWidth;

            if (!vm.scrollEnabled) {
                return vm;
            }

            scrollIndex = 0;
            vm.scrollReset();
            scrollStops = [0];
            vm.canScrollLeft = true;
            vm.canScrollRight = false;

            tabs.forEach(function (tab) {
                if (complete) {
                    return;
                }

                tabWidth = tab.width.get();

                if (screenWidth > scrollWidth) {
                    complete = true;
                    scrollStops.push(scrollWidth);
                }
                else if (stop + scrollStops.last() > scrollWidth) {
                    complete = true;
                    scrollStops.push(scrollWidth);
                }
                else if (stop + tabWidth > screenWidth) {
                    scrollStops.push(scrollStops.last() + stop);
                    stop = tabWidth;
                }
                else {
                    stop += tabWidth;
                }
            });

        };

        vm.activateTab = function (tabSelected) {
            tabs.forEach(function (tab) {
                tab.isActive = tab.text == tabSelected.text;
            });
        };

        vm.getScreenWidth = function () {
            return screen.getWidth();
        };

        vm.init();
    }

    angular
        .module("app")
        .controller('rpScrollingTabsMenuCtrl', [
            '$scope',
            'watchable',
            ScrollingTabsMenuCtrl
        ]);
})(angular);

