//  Source: _lib\realpage\dotter\js\_bundle.inc
angular.module("rpDotter", []);

//  Source: _lib\realpage\dotter\js\templates\dotter.js
//  Dotter Template

(function (angular) {
    "use strict";

    var templateHtml, templateUrl;

    templateUrl = "templates/realpage/shared/dotter.html";

    templateHtml = "" +

        "<span class='dotter'>" +
            "<span>.</span>" +
            "<span>.</span>" +
            "<span>.</span>" +
        "</span>";

    function installTemplate($templateCache) {
        $templateCache.put(templateUrl, templateHtml);
    }

    angular
        .module("rpDotter")
        .run(['$templateCache', installTemplate]);
})(angular);

//  Source: _lib\realpage\dotter\js\directives\dotter.js
//  Dotter Directive

(function (angular) {
    "use strict";

    function dotter() {
        function link(scope, elem, attr) {
            var timeout,
                interval,
                dir = {},
                children,
                dots = [],
                index = 0,
                modelWatch;

            dir.init = function () {
                dir.collectDots();
                modelWatch = scope.$watch('model', dir.initModel);
            };

            dir.initModel = function (model) {
                if (model) {
                    modelWatch();
                    model.events.subscribe(dir.control);
                }
            };

            dir.collectDots = function () {
                children = elem.children().hide();
                children.each(function (index, dot) {
                    dots.push(angular.element(dot));
                });
            };

            dir.control = function (action) {
                dir[action]();
            };

            dir.start = function () {
                dir.animate();

                interval = setInterval(function () {
                    dir.animate();
                }, 600);
            };

            dir.animate = function () {
                dots[index].fadeIn(100);

                timeout = setTimeout(function () {
                    index++;

                    if (index == 3) {
                        index = 0;
                        children.hide();
                    }
                }, 400);
            };

            dir.stop = function () {
                index = 0;
                clearTimeout(timeout);
                clearInterval(interval);
            };

            dir.init();
        }

        return {
            scope: {
                model: '='
            },
            link: link,
            restrict: 'E',
            replace: true,
            templateUrl: "templates/realpage/shared/dotter.html"
        };
    }

    angular
        .module("rpDotter")
        .directive('dotter', [dotter]);
})(angular);

