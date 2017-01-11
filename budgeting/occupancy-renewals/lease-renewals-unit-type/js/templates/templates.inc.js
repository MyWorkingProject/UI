angular.module('budgeting').run(['$templateCache', function($templateCache) {
$templateCache.put("occupancy-renewals/lease-renewals-unit-type/templates/bdgtd-moveins-exp-navigation.html",
"<div class=\"rp-cg-text rp-cg-body-text text-left\"><span class=\"text-right text-primary rp-grid-link\" ng-click=\"column.config.action.click(column, row)\">{{column.row.data[column.config.key] }}</span></div>");
}]);
