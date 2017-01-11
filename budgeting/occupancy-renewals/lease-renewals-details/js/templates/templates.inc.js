angular.module('budgeting').run(['$templateCache', function($templateCache) {
$templateCache.put("occupancy-renewals/lease-renewals-details/templates/comment-count.html",
"<a ng-click=\"column.config.action.makeLeaseComment(column, row)\"><span class=\"rp-cg-text rp-cg-body-text pointer text-primary\"><i class=\"rp-icon-chat-bubble\"></i> {{ column.row.data[column.config.key] }}</span></a>");
$templateCache.put("occupancy-renewals/lease-renewals-details/templates/service-group-name.html",
"<div class=\"rp-cg-text rp-cg-body-text text-primary text-left service-group p-l-1\">{{column.row.data[column.config.key] }}</div>");
}]);
