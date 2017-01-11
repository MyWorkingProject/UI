//  Source: _lib\realpage\float-scroll\js\_bundle.inc
angular.module("rpFloatScroll", []);

//  Source: _lib\realpage\float-scroll\js\directives\float-scroll.js
//  Floating Scrollbar Directive

(function (angular) {
    "use strict";

    function rpFloatScroll(winScroll, winSize) {
        function link(scope, elem, attr) {
            var dir = {};

            dir.init = function () {
                scope.floatScroll = dir;
                winSize.subscribe(dir.setSize);
                dir.append().setupBar().setVis();
                scope.$on('$destroy', dir.destroy);
                dir.scrollWatch = winScroll.subscribe(dir.setVis);
            };

            dir.append = function () {
                var html = "<div class='rp-float-scrollbar'><div /></div>";

                dir.bar = angular.element(html);
                dir.barCon = dir.bar.children();

                elem.append(dir.bar);
                return dir;
            };

            dir.setupBar = function () {
                elem.css('position', 'relative');
                dir.bar.on('scroll', dir.onScroll);
                dir.setSize();
                return dir;
            };

            dir.show = function () {
                dir.bar.show();
                return dir;
            };

            dir.hide = function () {
                dir.bar.hide();
                return dir;
            };

            dir.onScroll = function () {
                var sl = dir.bar.scrollLeft();
                elem.scrollLeft(sl);
            };

            dir.setVis = function () {
                var sl = elem.scrollLeft(),
                    top = elem.offset().top,
                    elemHt = elem.outerHeight(),
                    winHt = winSize.getSize().height,
                    winTop = winScroll.getScrollTop(),
                    show = (winTop + winHt) < (top + elemHt);

                dir[show ? 'show' : 'hide']().bar.scrollLeft(show ? sl : 0);

                return dir;
            };

            dir.setSize = function () {
                var barStyle = {
                    left: elem.offset().left,
                    width: elem.outerWidth()
                };

                dir.bar.css(barStyle);
                dir.barCon.width(elem.get(0).scrollWidth);

                dir.setVis();
            };

            dir.destroy = function () {
                dir.scrollWatch();
            };

            dir.init();
        }

        return {
            link: link,
            restrict: 'C'
        };
    }

    angular
        .module("rpFloatScroll")
        .directive('rpFloatScroll', [
            'windowScroll',
            'windowSize',
            rpFloatScroll
        ]);
})(angular);

