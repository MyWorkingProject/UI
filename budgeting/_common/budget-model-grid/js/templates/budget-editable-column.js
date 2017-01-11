(function () {
    'use strict';

    var templateHtml, templateUrl;

    templateUrl = "app/templates/budget-editable-column.html";

    templateHtml = "" +
             "<div class=\"rp-cg-text rp-cg-body-text\" ng-if=\"!model.state.edit\">" +
                "{{ model.format(column, column.config.filter) }}" +
            "</div>" +
            "<div class=\"rp-cg-editable rp-input-text\" ng-if=\"model.state.edit\">" +
                "<input class=\"rp-cg-input-text rp-form-input\" " +
                        "ng-model-options=\"{updateOn: 'blur'}\" " +
                        "ng-change=\"column.config.action.change(column, row)\" " + 
                        "ng-blur=\"column.config.action.blur(column, row)\" " +
                        "ng-model=\"column.row.data[column.config.key]\">" +
            "</div>";

    function installTemplate($templateCache) {
        $templateCache.put(templateUrl, templateHtml);
    }

    angular
        .module('budgeting')
        .run(['$templateCache', installTemplate]);
})();