(function () {
    'use strict';

    var templateHtml, templateUrl;

    templateUrl = "app/templates/gl-account-worksheet-column.html";

    templateHtml = "" +
            '<span ' +
                'class="rp-cg-text rp-cg-body-text text-link">' +
                    '<span ng-click="column.config.action.navigateTo(column, row)">' +
                        '{{column.row.data[column.config.key]}}' +
                    '</span>' +
            '</span>';

    function installTemplate($templateCache) {
        $templateCache.put(templateUrl, templateHtml);
    }

    angular
        .module('budgeting')
        .run(['$templateCache', installTemplate]);
})();