//  Tasks Module Directive

angular.module("budgeting").directive('tasksModule', [
    function () {
        function link(scope, element, attributes) {}

        return {
            link: link,

            restrict: 'E',

            scope: {
                model: '='
            },

            replace: true,

            controller: 'TasksModuleCtrl',

            templateUrl: "templates/tasks-module/tasks-module.html"
        };
    }
]);
