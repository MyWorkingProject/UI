//  Task Directive

(function (angular) {
    "use strict";

    function directive(deviceInfoSvc, task, taskTouch) {
        function link(scope, elem, attr) {
            if (scope.model.id == 'placeholder') {
                return;
            }

            var model = scope.model,
                hasTouch = deviceInfoSvc.hasTouch();

            scope.task = hasTouch ? taskTouch(elem, model) : task(elem, model);

            scope.$on('$destroy', function () {
                scope.task.destroy();
            });
        }

        return {
            scope: {
                model: '='
            },
            link: link,
            restrict: 'E',
            replace: true,
            templateUrl: "templates/budgeting/tasks-module/task.html"
        };
    }

    angular
        .module("budgeting")
        .directive('task', ['deviceInfoSvc', 'task', 'taskTouch', directive]);
})(angular);
