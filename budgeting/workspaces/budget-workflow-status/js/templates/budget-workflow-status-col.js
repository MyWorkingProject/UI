//  Property Name Template

(function (angular) {
    'use strict';

    var templateHtml, templateUrl;

    templateUrl = "templates/budget-workflow-status/status.html";

    templateHtml = "" +
        "<status-percentage details='record'></status-percentage>";

    function installTemplate($templateCache) {
        $templateCache.put(templateUrl, templateHtml);
    }

    angular
        .module('budgeting')
        .run(['$templateCache', installTemplate]);
})(angular);

