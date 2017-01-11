angular.module('budgeting').run(['$templateCache', function($templateCache) {
$templateCache.put("contract/properties/templates/grid.delete-row.html",
"<div ng-click=\"config.deleteRow(record)\"><i class=\"rp-icon-delete\"></i></div>");
$templateCache.put("contract/properties/templates/grid.gl-account.html",
"<span ng-if=\"model.contractState.page === 'view'\">{{record.glAccountNumber}} - {{record.glDescription}}</span><div ng-if=\"model.contractState.page !== 'view'\"><div class=\"text-primary toggle-allocation-state\" ng-click=\"config.selectGLAccount(record)\" ng-if=\"record.editGLAccount == false\"><span ng-if=\"record.glAccount.glAccountNumber\">{{record.glAccount.glAccountNumber}} - {{record.glAccount.glAccountDescription}}</span> <span ng-if=\"!record.glAccount.glAccountNumber\">Search and select for a GL Account</span></div><gl-accnt-search data=\"record.glAccount\" ng-if=\"record.editGLAccount === true\"></gl-accnt-search></div>");
$templateCache.put("contract/properties/templates/grid.percentage.html",
"<span ng-if=\"model.contractState.page === 'view'\" class=\"allocation-edit field-block grid-input-text\">{{record[config.key] | number:2}}</span> <span ng-if=\"model.contractState.page !== 'view'\" class=\"allocation-edit field-block grid-input-text\"><input type=\"text\" ng-model-options=\"{updateOn: 'blur'}\" ng-model=\"record[config.key]\" ng-pattern=\"/^[0-9]*(\\.[0-9]{1,2})?$/\" class=\"form-control form-control-sm rp-currency-editable\"></span>");
}]);
