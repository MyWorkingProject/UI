//  Task Template

(function (angular) {
    "use strict";

    var templateHtml, templateUrl;

    templateUrl = "templates/budgeting/tasks-module/task.html";

    templateHtml = "" +
        "<div class='task' " +
            "ng-class='model.className' " +
            "ng-show='model.isActive.get()' " +
            "ng-mouseleave='task.onMouseLeave()' " +
            "ng-mouseup='task.onMouseUp($event)' " +
            "ng-mousemove='task.onMouseMove($event)' " +
            "ng-mousedown='task.onMouseDown($event)' >" +

            "<h3 ng-if='model.title'>{{model.title}}</h3>" +
            "<ul ng-if='model.details' class='task-details " +
                "details-{{model.details.length}}'>" +
                "<li ng-repeat='detail in model.details' " +
                    "ng-class='detail.status'>" +
                    "<span class='metric'>{{detail.metric}}</span>" +
                    "<span class='description'>{{detail.description}}</span>" +
                "</li>" +
            "</ul>" +
        "</div>";

    function installTemplate($templateCache) {
        $templateCache.put(templateUrl, templateHtml);
    }

    angular
        .module("budgeting")
        .run(['$templateCache', installTemplate]);
})(angular);
