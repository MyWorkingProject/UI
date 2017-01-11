//  Draggable Directive

(function (angular) {
    "use strict";

    function draggable(draggableSvc) {
        function link(scope, elem, attr) {
            scope.draggable = draggableSvc(elem);
        }

        return {
            link: link,
            restrict: 'C'
        };
    }

    angular
        .module("budgeting")
        .directive('draggable', ['Draggable', draggable]);
})(angular);
