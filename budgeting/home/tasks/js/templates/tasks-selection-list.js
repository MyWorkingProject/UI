//  Tasks Selection List Template

angular.module("budgeting").run(["$templateCache",
    function($templateCache) {
        $templateCache.put("templates/tasks-module/task-selection-list.html",

            "<div class='task-selection-list' " +
                "ng-class='{active: list.isActive}'>" +
                "<h2 ng-click='list.toggleList()' kill-click>" +
                    "<span></span>" +
                    "Workspaces" +
                "</h2>" +
                "<ul kill-click>" +
                    "<li ng-repeat='task in model' " +
                        "ng-click='list.toggleTask(task)'>" +
                        "<span class='icon' " +
                            "ng-class='{checked: task.isActive.get()}' >" +
                        "</span>" +
                        "{{task.title}}" +
                    "</li>" +
                "</ul>" +
            "</div>"

        );
    }
]);
