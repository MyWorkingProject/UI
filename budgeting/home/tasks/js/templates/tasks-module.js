//  Tasks Module Template

angular.module("budgeting").run(["$templateCache",
    function($templateCache) {
        $templateCache.put("templates/tasks-module/tasks-module.html",

            "<div class='tasks-module rounded-box' busy='tasksModule'>" +
                "<busy-indicator model='busyIndicatorModel'>" +
                "</busy-indicator>" +
                "<div class='tasks-header'>" +
                    "<task-selection-list model='tasks'>" +
                    "</task-selection-list>" +
                    "<rp-date-range model='dateRange' ng-show='false'>" +
                    "</rp-date-range>" +
                "</div>" +
                "<tasks-carousel model='tasks'>" +
                "</tasks-carousel>" +
            "</div>"

        );
    }
]);
