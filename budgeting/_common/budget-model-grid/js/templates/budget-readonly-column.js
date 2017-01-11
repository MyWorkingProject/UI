(function () {
    'use strict';

    var templateHtml, templateUrl;

    templateUrl = "app/templates/budget-readonly-column.html";

    templateHtml = "" +
           "<div class=\"rp-cg-text rp-cg-body-text\">" +
                "{{ model.format(column, column.config.filter) }}" +
            "</div>";

    function installTemplate($templateCache) {
        $templateCache.put(templateUrl, templateHtml);
    }

    angular
        .module('budgeting')
        .run(['$templateCache', installTemplate]);
})();