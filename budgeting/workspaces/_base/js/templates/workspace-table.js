//  Workspace Table Template

(function (angular) {
    "use strict";

    var templateHtml, templateUrl;

    templateUrl = "templates/budgeting/workspaces/workspace-table.html";

    templateHtml = "" +

    "<div class='workspace'>" +
        "<rp-grouped-table ng-if='model.grouped' table-model='model'>" +
        "</rp-grouped-table>" +

        "<rp-data-table ng-if='!model.grouped' table-model='model'>" +
        "</rp-data-table>" +
    "</div>";

    function installTemplate($templateCache) {
        $templateCache.put(templateUrl, templateHtml);
    }

    angular
        .module("budgeting")
        .run(['$templateCache', installTemplate]);
})(angular);
