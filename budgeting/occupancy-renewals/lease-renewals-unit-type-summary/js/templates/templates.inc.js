angular.module('budgeting').run(['$templateCache', function($templateCache) {
$templateCache.put("occupancy-renewals/lease-renewals-unit-type-summary/templates/reference-data-header.html",
"<div class=\"rp-cg-text rp-cg-body-text\"><span class=\"ft-s-14 _600\">{{column.row.data[column.config.key] }}</span><div class=\"ft-s-10 text-neutral-03\">{{column.config.data.refBudgetYear }} Actuals</div></div><div class=\"m-t-1 ft-s-10 refText\"><i class=\"m-r-xs rp-icon-info-circle ft-s-10\"></i> 2016 Budget data will be loaded into the open period starting from JAN-2016</div>");
}]);
