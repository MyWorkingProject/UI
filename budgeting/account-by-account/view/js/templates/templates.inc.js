angular.module('budgeting').run(['$templateCache', function($templateCache) {
$templateCache.put("account-by-account/view/templates/account-by-account-chart.html",
"<span class=\"rp-cg-text rp-cg-body-text pointer\" ng-class=\"{'text-primary': row.data.commentCount > 0, 'text-warning': row.data.reviewerCommentCount > 0}\" ng-click=\"column.config.loadComments(column, row)\"><i class=\"rp-icon-chat-bubble\"></i> {{ row.data.reviewerCommentCount + row.data.commentCount }}</span>");
$templateCache.put("account-by-account/view/templates/account-by-account-description.html",
"<div class=\"text-primary rp-cg-text rp-cg-body-text\" title=\"{{ column.getVal()}}\" style=\"width: 250px;\n" +
"    white-space: nowrap;\n" +
"    overflow: hidden;\n" +
"    text-overflow: ellipsis\">{{ column.getVal()}}</div>");
$templateCache.put("account-by-account/view/templates/column-title.html",
"<div ng-if=\"column.row.data.hasReferenceData!==true\" class=\"rp-cg-text rp-cg-body-text gross-rent-title p-l-1\" title=\"{{ column.getVal()}}\" ng-click=\"column.config.navigateToDetailView(column.row.data.glAccountNumber,column.row.data.isCatRestricted,column.row.data.description)\">{{column.getVal()}}</div><div ng-if=\"column.row.data.hasReferenceData===true\" class=\"rp-cg-text rp-cg-body-text gross-rent-title p-l-1 active-bar\" title=\"{{ column.getVal()}}\" ng-click=\"column.config.navigateToDetailView(column.row.data.glAccountNumber,column.row.data.isCatRestricted,column.row.data.description)\">{{column.getVal()}}</div>");
}]);
