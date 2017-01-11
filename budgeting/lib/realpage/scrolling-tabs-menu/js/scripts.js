//  Source: _lib\realpage\scrolling-tabs-menu\js\_bundle.inc
angular.module("rpScrollingTabsMenu", []);

//  Source: _lib\realpage\scrolling-tabs-menu\js\templates\templates.inc.js
angular.module('rpScrollingTabsMenu').run(['$templateCache', function($templateCache) {
$templateCache.put("realpage/scrolling-tabs-menu/templates/scrolling-tabs-menu.html",
"<div class=\"rp-scrolling-tabs-wrap\"><div class=\"rp-scrolling-tabs-menu\"><span ng-show=\"$ctrl.scrollEnabled()\" ng-click=\"scrollScreen.scrollLeft()\" ng-class=\"{disabled: !$ctrl.canScrollLeft()}\" class=\"scroll-left rp-icon-angle-right text-neutral-05\"></span> <span ng-show=\"$ctrl.scrollEnabled()\" ng-click=\"scrollScreen.scrollRight()\" ng-class=\"{disabled: !$ctrl.canScrollRight()}\" class=\"scroll-right rp-icon-angle-left text-neutral-05\"></span><div class=\"rp-scrolling-tabs-screen\" rp-scrolling-tabs-screen=\"$ctrl.scrollScreenModel\"><ul class=\"rp-scrolling-tabs-slider\" rp-scrolling-tabs-slider=\"$ctrl.scrollScreenModel\"><li class=\"rp-scrolling-tab\" ng-repeat=\"tab in $ctrl.model.data\" rp-scrolling-tab=\"$ctrl.scrollScreenModel\"><a ng-if=\"tab.href\" href=\"{{tab.href}}\" class=\"rp-scrolling-tab-link\" ng-click=\"$ctrl.activateTab(tab)\" ng-class=\"{active: tab.isActive}\">{{tab.text}}</a> <span ng-if=\"!tab.href\" ng-click=\"$ctrl.activateTab(tab)\" ng-class=\"{active: tab.isActive}\" class=\"rp-scrolling-tab-link rp-scrolling-tab-text\">{{tab.text}}</span></li></ul></div></div></div>");
}]);


//  Source: _lib\realpage\scrolling-tabs-menu\js\components\scrolling-tabs-menu.js
// Scrolling Tabs Menu Component

(function (angular) {
    "use strict";

    function Controller(winSize, scrollScreenModel) {
        var events,
            vm = this,
            scrollScreen = scrollScreenModel();

        vm.$onInit = function () {
            events = vm.model.getEvents();
            scrollScreen.setEvents(events);
            vm.scrollScreenModel = scrollScreen;
            vm.winWatch = winSize.subscribe(vm.reset);
        };

        vm.activateTab = function (tab) {
            vm.model.activate(tab);
        };

        vm.scrollEnabled = function () {
            return scrollScreen.scrollEnabled();
        };

        vm.canScrollLeft = function () {
            return scrollScreen.canScrollLeft();
        };

        vm.canScrollRight = function () {
            return scrollScreen.canScrollRight();
        };

        vm.reset = function () {
            scrollScreen.flushStops().resetSliderWidth();
        };

        vm.$onDestroy = function () {
            vm.winWatch();
            scrollScreen = undefined;
        };
    }

    var component = {
        bindings: {
            model: "="
        },
        controller: [
            "windowSize",
            "rpScrollScreenModel",
            Controller
        ],
        templateUrl: "realpage/scrolling-tabs-menu/templates/scrolling-tabs-menu.html"
    };

    angular
        .module("rpScrollingTabsMenu")
        .component("rpScrollingTabsMenu", component);
})(angular);


//  Source: _lib\realpage\scrolling-tabs-menu\js\models\scrolling-tabs-menu.js
//  Scrolling Tabs Menu Model

(function (angular) {
    "use strict";

    function factory(eventsManager) {
        return function () {
            var model = {},
                events = eventsManager(),
                eventNames = ["change", "beforeScroll", "afterScroll"];

            model.events = events.setEvents(eventNames);

            model.getEvents = function () {
                return model.events;
            };

            model.subscribe = function () {
                return events.subscribe.apply(events, arguments);
            };

            model.setData = function (data) {
                model.data = data;
                return model;
            };

            model.activate = function (tab) {
                if (!tab.isActive) {
                    model.data.forEach(function (item) {
                        item.isActive = item.id == tab.id;
                    });
                    model.events.publish("change", tab);
                }
                return model;
            };

            model.destroy = function () {
                events.destroy();
                model = undefined;
                events = undefined;
                eventNames = undefined;
            };

            return model;
        };
    }

    angular
        .module("rpScrollingTabsMenu")
        .factory("rpScrollingTabsMenuModel", ["eventsManager", factory]);
})(angular);

//  Source: _lib\realpage\scrolling-tabs-menu\js\models\scroll-screen.js
//  Scroll Screen Model

(function (angular) {
    "use strict";

    function factory() {
        return function () {
            var model = {
                stops: [0],
                stopIndex: 0,
                screenWidth: 0,
                sliderWidth: 0,
                allowScrollLeft: true,
                allowScrollRight: false
            };

            model.setEvents = function (events) {
                model.events = events;
                return model;
            };

            model.publish = function (eventName, eventData) {
                model.events.publish(eventName, eventData);
                return model;
            };

            model.subscribe = function (eventName, callback) {
                return model.events.subscribe(eventName, callback);
            };

            model.setScreenWidth = function (screenWidth) {
                model.stops.push(-screenWidth);
                model.screenWidth = screenWidth;
                return model;
            };

            model.setScrollWidth = function (scrollWidth) {
                model.scrollWidth = scrollWidth;
                return model;
            };

            model.getSliderWidth = function () {
                return model.sliderWidth;
            };

            model.canScrollLeft = function () {
                return model.allowScrollLeft;
            };

            model.canScrollRight = function () {
                return model.allowScrollRight;
            };

            model.addStop = function (stop) {
                var prevStop = model.stops[model.stops.length - 1];
                model.sliderWidth += stop;
                if (model.stops[1] < 60) {
                    model.stops[1] += stop;
                }
                else {
                    model.stops.push(prevStop + stop);
                }
            };

            model.flushStops = function () {
                model.stops = [0];
                return model;
            };

            model.resetSliderWidth = function () {
                model.sliderWidth = 0;
                return model;
            };

            model.resetScroll = function () {
                model.stopIndex = 0;
                model.allowScrollLeft = true;
                model.allowScrollRight = false;
                return model;
            };

            model.scrollEnabled = function () {
                return model.sliderWidth > model.screenWidth;
            };

            model.scrollLeft = function () {
                model.stopIndex++;
                model.updateScrollCtrls();
                return model.stops[model.stopIndex];
            };

            model.scrollRight = function () {
                model.stopIndex--;
                model.updateScrollCtrls();
                return model.stops[model.stopIndex];
            };

            model.updateScrollCtrls = function () {
                var stop = model.stops[model.stopIndex],
                    lastStop = model.stops[model.stops.length - 1];
                model.allowScrollRight = stop !== 0;
                model.allowScrollLeft = stop != lastStop;
            };

            model.updateStopIndex = function (scrollPos) {
                model.stops.forEach(function (stop, index) {
                    if (scrollPos >= stop) {
                        model.stopIndex = index;
                    }
                });
                model.updateScrollCtrls();
            };

            return model;
        };
    }

    angular
        .module("rpScrollingTabsMenu")
        .factory("rpScrollScreenModel", [factory]);
})(angular);


//  Source: _lib\realpage\scrolling-tabs-menu\js\directives\scrolling-tab.js
//  Scrolling Tab Directive

(function (angular) {
    "use strict";

    function rpScrollingTab($timeout, winSize, computedStyle) {
        function link(scope, elem, attr) {
            var dir = {},
                model = scope.$eval(attr.rpScrollingTab);

            dir.init = function () {
                dir.recordStop();
                dir.winWatch = winSize.subscribe(dir.recordStop);
                dir.destWatch = scope.$on("$destroy", dir.destroy);
            };

            dir.recordStop = function () {
                $timeout.cancel(dir.timer);
                dir.timer = $timeout(dir.addStop, 100);
            };

            dir.addStop = function () {
                model.addStop(computedStyle(elem).outerWidth(true));
            };

            dir.destroy = function () {
                dir.winWatch();
                dir.destWatch();
                model = undefined;
            };

            dir.init();
        }

        return {
            link: link,
            restrict: "A"
        };
    }

    angular
        .module("rpScrollingTabsMenu")
        .directive("rpScrollingTab", [
            "$timeout",
            "windowSize",
            "rpComputedStyle",
            rpScrollingTab
        ]);
})(angular);

//  Source: _lib\realpage\scrolling-tabs-menu\js\directives\scrolling-tabs-screen.js
//  Scrolling Tabs Screen Directive

(function (angular) {
    "use strict";

    function rpScrollingTabsScreen($timeout, winSize) {
        function link(scope, elem, attr) {
            var dir = {},
                model = scope.$eval(attr.rpScrollingTabsScreen);

            dir.init = function () {
                dir.recordWidth();
                scope.scrollScreen = dir;
                dir.winWatch = winSize.subscribe(dir.recordWidth);
                dir.destWatch = scope.$on("$destroy", dir.destroy);
            };

            dir.recordWidth = function () {
                $timeout.cancel(dir.timer);
                dir.timer = $timeout(dir.setWidth, 100);
            };

            dir.setWidth = function () {
                dir.scrollTo(0, 0);
                model.resetScroll().setScreenWidth(elem.width());
            };

            dir.scrollLeft = function () {
                model.publish("beforeScroll");
                dir.scrollTo(model.scrollLeft());
                model.publish("afterScroll");
            };

            dir.scrollRight = function () {
                model.publish("beforeScroll");
                dir.scrollTo(model.scrollRight());
                model.publish("afterScroll");
            };

            dir.scrollTo = function (newStop, duration) {
                dir.unbindScroll();
                duration = duration === undefined ? 200 : duration;

                if (duration === 0) {
                    elem.prop("scrollLeft", newStop);
                }
                else {
                    elem.animate({
                        scrollLeft: newStop
                    }, duration);
                }

                $timeout(dir.bindScroll, duration + 100);
            };

            dir.bindScroll = function () {
                elem.on("scroll.scrollingTabs", dir.onScroll);
            };

            dir.unbindScroll = function () {
                elem.off("scroll.scrollingTabs");
            };

            dir.onScroll = function (e) {
                $timeout.cancel(dir.scrollTimer);
                dir.scrollTimer = $timeout(dir.updateStopIndex, 50);
            };

            dir.updateStopIndex = function () {
                model.publish("beforeScroll");
                var scrollPos = elem.get(0).scrollLeft;
                model.updateStopIndex(scrollPos);
                model.publish("afterScroll");
            };

            dir.destroy = function () {
                dir.winWatch();
                dir.destWatch();
                dir = undefined;
                model = undefined;
            };

            dir.init();
        }

        return {
            link: link,
            restrict: "A"
        };
    }

    angular
        .module("rpScrollingTabsMenu")
        .directive("rpScrollingTabsScreen", [
            "$timeout",
            "windowSize",
            rpScrollingTabsScreen
        ]);
})(angular);

//  Source: _lib\realpage\scrolling-tabs-menu\js\directives\scrolling-tabs-slider.js
//  Scrolling Tabs Slider Directive

(function (angular) {
    "use strict";

    function rpScrollingTabsSlider($timeout, winSize) {
        function link(scope, elem, attr) {
            var dir = {},
                model = scope.$eval(attr.rpScrollingTabsSlider);

            dir.init = function () {
                dir.recordWidth();
                dir.winWatch = winSize.subscribe(dir.recordWidth);
                dir.destWatch = scope.$on("$destroy", dir.destroy);
            };

            dir.recordWidth = function () {
                $timeout.cancel(dir.timer);
                dir.timer = $timeout(dir.setWidth, 500);
            };

            dir.setWidth = function () {
                elem.width(model.getSliderWidth());
            };

            dir.destroy = function () {
                dir.winWatch();
                dir.destWatch();
                dir = undefined;
                model = undefined;
            };

            dir.init();
        }

        return {
            link: link,
            restrict: "A"
        };
    }

    angular
        .module("rpScrollingTabsMenu")
        .directive("rpScrollingTabsSlider", [
            "$timeout",
            "windowSize",
            rpScrollingTabsSlider
        ]);
})(angular);
