//  Custom worksheets template
(function () {
    'use strict';

    var templateHtml, templateUrl;

    templateUrl = "custom-worksheets/templates/custom-worksheet-name.html";

    templateHtml = "" +
            "<span ng-click=\"column.config.action.click(column, row)\" " +
                "class=\"rp-cg-text rp-cg-body-text text-info text-u-l pointer\">" +
                "{{column.row.data[column.config.key]}}" +
            "</span>";

    function installTemplate($templateCache) {
        $templateCache.put(templateUrl, templateHtml);
    }

    angular
        .module('budgeting')
        .run(['$templateCache', installTemplate]);
})();