(function () {
    'use strict';

    var templateHtml, templateUrl;

    templateUrl = "app/templates/gl-account-adjustment-column.html";

    templateHtml = "" +
        "<span class=\"rp-cg-text rp-cg-body-text text-link\" " +
            "ng-click=\"column.config.action.showAdjustment(column)\">{{::column.row.data[column.config.key]}}</span>";

    function installTemplate($templateCache) {
        $templateCache.put(templateUrl, templateHtml);
    }

    angular
        .module('budgeting')
        .run(['$templateCache', installTemplate]);
})();