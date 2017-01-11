//  Tasks Carousel Screen Directive

angular.module("budgeting").directive('tasksCarouselScreen', ['dataShare', 'windowSize',
    function (dataShare, windowSize) {
        var screenWidth = dataShare('tasksCarouselScreenWidth');

        function link(scope, element, attributes) {
            function recordWidth() {
                screenWidth.set(element.width());
            }

            recordWidth();
            windowSize.subscribe(recordWidth);
        }

        return {
            link: link,
            restrict: 'C'
        };
    }
]);
