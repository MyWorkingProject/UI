//  Tasks Carousel Directive

angular.module("budgeting").directive('tasksCarousel', [
    function () {
        function link(scope, element, attributes) {}

        return {
            link: link,

            restrict: 'E',

            scope: {
                model: '='
            },

            replace: true,

            templateUrl: "templates/tasks-module/tasks-carousel.html"
        };
    }
]);
