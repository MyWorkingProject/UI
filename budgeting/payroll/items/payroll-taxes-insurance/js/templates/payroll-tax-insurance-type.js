(function () {
    'use strict';

    var templateHtml, templateUrl;

    templateUrl = "payroll/items/templates/payroll-tax-insurance-type.html";

    templateHtml = "" +
             "<div class=\"rp-cg-text rp-cg-body-text\">" +
             "<div title=\"{{ column.row.data[column.config.key] }}\" class=\"taxes-col-1-width pull-left\">" +
                "{{ column.row.data[column.config.key] }}" +
               "</div>"+
                "<div class=\"pull-left\" ng-if=\"model.state.edit\">" +
                    "<div class=\"rp-cg-text pointer pull-left delete-icon\" " +
                        "ng-click=\"column.config.action.delete(column, row)\"><i class=\"rp-icon-trash\"></i></div>" +
                        "<div class=\"rp-cg-text pointer pull-left add-icon\" ng-if=\"model.isLastRowInGroup(column, row) && column.config.getNonExemptedItems().length > 0\">" +
                        "<div class=\"btn-group dropdown open\">" +
                          "<a data-toggle=\"dropdown\" aria-expanded=\"true\" class=\"text-success\"><i class=\"rp-icon-add\"></i></a>" +
                            "<div class=\"dropdown-menu text-left text-sm\"  >" +
                            "<a class=\"dropdown-item\"ng-repeat=\"item in column.config.getNonExemptedItems()\" ng-click=\"column.config.action.add(column, row, item)\">{{item.dataTypeDisplay}}</a>" +
                        "</div> " +
                    "</div>" +
                "</div>" +
            "</div>";

    function installTemplate($templateCache) {
        $templateCache.put(templateUrl, templateHtml);
    }

    angular
        .module('budgeting')
        .run(['$templateCache', installTemplate]);
    })();