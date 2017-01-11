//templates/budgeting/workflow/status-percentage.html

//  Status Percentage Template

(function (angular) {
    'use strict';

    var templateHtml, templateUrl;

    templateUrl = "templates/budgeting/workflow/status-percentage.html";

    templateHtml = "<div>" +
        "<a class='link' href='#/budgetmodel/{{details.distributedID}}/workflow'>" +
            "{{details.status}}" +
        "</a>" +
        "<div class='progress-bar-div-wrap' ng-class='dir.popover' ng-click='dir.statusClick(details)'>" +
            "<div class='progress-bar-div' style='width: {{details.statusPer}}%;'>" +
            "</div>" +
            "<div class='workflow-pop-over-wrap'>" +
            "<ul class='workflow-pop-over'>" +
            "<li ng-repeat='record in dir.statusData.records'>"+
            "<div><span ng-class='{completed : record.status='Submitted', in-progress : record.status='Pending'}'></span>"+
                "<div class='workflow-pop-over-role'>record.roleName<p class='stacked-text'>{{record.status}}</p></div>"+
            "</div>"+
            "</li>"+
             /*   "<li><div><span class='completed'></span><div class='workflow-pop-over-role'>Budget Preparer<p class='stacked-text'>Submitted</p></div></div></li>" +
                "<li><div><span class='in-progress'></span><div class='workflow-pop-over-role'>Property Manager<p class='stacked-text'>Pending</p></div></div></li>" +
                "<li><div><span class='in-progress'></span><div class='workflow-pop-over-role'>Budget Administrator<p class='stacked-text'>Pending</p></div></div></li>" +
                "<li><div><span class='overdue'></span><div class='workflow-pop-over-role'>Budget Administrator<p class='stacked-text'>Pending</p></div></div></li>" +*/
            "</ul>" +
            "</div>" +
        "</div>";

    function installTemplate($templateCache) {
        $templateCache.put(templateUrl, templateHtml);
    }

    angular
        .module('budgeting')
        .run(['$templateCache', installTemplate]);
})(angular);

