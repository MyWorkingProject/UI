angular.module('budgeting').run(['$templateCache', function($templateCache) {
$templateCache.put("occupancy-renewals/occupancy-vacancy-summary/templates/comment-count.html",
"<span class=\"rp-cg-text rp-cg-body-text pointer text-primary\"><a ng-click=\"column.config.action.click(column, row)\"><i class=\"rp-icon-chat-bubble\"></i> {{ column.row.data[column.config.key] }}</a></span>");
$templateCache.put("occupancy-renewals/occupancy-vacancy-summary/templates/service-group-name.html",
"<div class=\"rp-cg-text rp-cg-body-text text-primary text-left service-group p-l-1\"><a ng-click=\"column.config.action.click(column, row)\">{{column.row.data[column.config.key] }}</a></div>");
}]);
