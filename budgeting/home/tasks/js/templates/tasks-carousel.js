//  Tasks Carousel Template

angular.module("budgeting").run(["$templateCache",
    function($templateCache) {
        $templateCache.put("templates/tasks-module/tasks-carousel.html",

            "<div class='tasks-carousel'>" +
                "<span class='cover left' ng-class='{touch: slider.hasTouch}'>" +
                "</span>" +
                "<span class='cover right' ng-class='{touch: slider.hasTouch}'>" +
                "</span>" +
                "<div class='tasks-carousel-screen'>" +
                    "<span class='scroll-left' " +
                        "ng-show='slider.showSlideLeft' " +
                        "ng-click='slider.slideLeft()'>" +
                    "</span>" +
                    "<span class='scroll-right' " +
                        "ng-show='slider.showSlideRight' " +
                        "ng-click='slider.slideRight()'>" +
                    "</span>" +
                    "<div class='tasks-carousel-slider' " +
                        "ng-class='{hideov: slider.hideOverflow}' >" +
                        "<task ng-repeat='task in model' model='task' />" +
                    "</div>" +
                "</div>" +
            "</div>"

        );
    }
]);
