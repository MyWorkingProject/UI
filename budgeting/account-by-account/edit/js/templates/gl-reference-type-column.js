(function () {
    'use strict';

    var templateHtml, templateUrl;

    templateUrl = "app/templates/gl-reference-type-column.html";

    templateHtml = "" +
        "<span class=\"rp-cg-text rp-cg-body-text text-link\" " +
            "ng-click=\"column.config.action.showHistoryByPeriod(column, column.row)\">" +
            "{{ model.format(column, column.config.filter) }}" +
        "</span>";
    function installTemplate($templateCache) {
        $templateCache.put(templateUrl, templateHtml);
    }

    angular
        .module('budgeting')
        .run(['$templateCache', installTemplate]);
})();