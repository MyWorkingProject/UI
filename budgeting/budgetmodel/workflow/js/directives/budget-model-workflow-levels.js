//  Level Sections Directive

(function (angular) {
    "use strict";

    function levelSections() {
        function link(scope, elem, attr) {
            var dir = {};

            dir.init = function () {
                scope.dir = dir;
            };

            dir.scrollLeftElement = function (id, sl, time) {
                dir.scrollEle = angular.element.find('div[id="workflow-level-section-wrap' + id + '"]');
                if (dir.scrollEle) {
                    dir.scrollEle[0].scrollLeft = dir.scrollEle[0].scrollLeft + sl;
                }
            };

            dir.scrollRightElement = function (id, sl, time) {
                dir.scrollEle = angular.element.find('div[id="workflow-level-section-wrap' + id + '"]');
                if (dir.scrollEle) {
                    dir.scrollEle[0].scrollLeft = dir.scrollEle[0].scrollLeft - sl;
                }
            };

            dir.toggleLevel = function (id) {
                scope.levels[id - 1].state.open = !scope.levels[id - 1].state.open;
            };

            dir.reset = function () {
                elem.prop('scrollLeft', 0);
            };

            dir.init();
        }

        return {
            scope: {
                levels: '='
            },
            link: link,
            restrict: 'E',
            replace: false,
            templateUrl: "app/templates/level-sections.html"
        };
    }

    angular
        .module("budgeting")
        .directive('levelSections', [
            levelSections
        ]);
})(angular);
