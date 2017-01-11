//  Workspace Table Directive

(function (angular) {
    "use strict";

    function workspaceTable(view, windowSize) {
        function link(scope, elem, attr) {
            function updateView() {
                view.width = elem.width();
            }

            updateView();

            windowSize.subscribe(updateView);
        }

        return {
            scope: {
                model: '='
            },
            link: link,
            restrict: 'E',
            replace: true,
            templateUrl: "templates/budgeting/workspaces/workspace-table.html"
        };
    }

    angular
        .module("budgeting")
        .directive('workspaceTable', ['workspaceView', 'windowSize', workspaceTable]);
})(angular);
