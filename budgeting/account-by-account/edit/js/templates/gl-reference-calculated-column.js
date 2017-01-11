(function () {
    'use strict';

    var templateHtml, templateUrl;

    templateUrl = "app/templates/gl-reference-calculated-column.html";

    templateHtml = "" +
            "<span class=\"rp-cg-text rp-cg-body-text\" ng-class=\"{'text-danger': column.row.validation[column.config.key] == false }\">" +
                "{{ model.format(column, column.config.filter)}}" +
            "</span>";

    function installTemplate($templateCache) {
        $templateCache.put(templateUrl, templateHtml);
    }

    angular
        .module('budgeting')
        .run(['$templateCache', installTemplate]);
})();