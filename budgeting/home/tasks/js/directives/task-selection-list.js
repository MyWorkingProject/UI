//  Task Selection List Directive

angular.module("budgeting").directive('taskSelectionList', ['$rootScope',
    function ($rootScope) {
        var body = angular.element('body');

        function List(element, model) {
            var s = this;
            s.model = model;
            s.element = element;
            s.init();
        }

        var p = List.prototype;

        p.init = function () {
            var s = this;
            s.isActive = false;
            return s;
        };

        p.toggleList = function () {
            var s = this;
            s.isActive = !s.isActive;

            body.unbind('click.taskselectionlist');

            if (s.isActive) {
                setTimeout(function () {
                    body.one('click.taskselectionlist', s.onBodyClick.bind(s));
                }, 10);
            }

            return s;
        };

        p.onBodyClick = function () {
            var s = this;
            $rootScope.$apply(s.toggleList.bind(s));
            return s;
        };

        p.toggleTask = function (task) {
            var s = this,
                isActive = !task.isActive.get();
            task.isActive.set(isActive);
            return s;
        };

        function link(scope, element, attributes) {
            scope.list = new List(element, scope.model);
        }

        return {
            link: link,

            restrict: 'E',

            scope: {
                model: '='
            },

            replace: true,

            templateUrl: "templates/tasks-module/task-selection-list.html"
        };
    }
]);
