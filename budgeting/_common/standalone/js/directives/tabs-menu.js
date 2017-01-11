//  Tabs Menu Directive

(function (angular) {
    "use strict";

    function rpTabsMenu() {
        function link(scope, elem, attr) {
            if (!scope.model) {
                elem.remove();
                logc('rpTabsMenu: model is undefined!');
            }
        }

        return {
            scope: {
                model: '='
            },
            link: link,
            restrict: 'E',
            replace: true,
            templateUrl: "templates/budgeting/tabs-menu/tabs-menu.html"
        };
    }

    angular
        .module("budgeting")
        .directive('btTabsMenu', [rpTabsMenu]);
})(angular);
