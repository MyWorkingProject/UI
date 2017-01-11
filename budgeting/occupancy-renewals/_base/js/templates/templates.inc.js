angular.module('budgeting').run(['$templateCache', function($templateCache) {
$templateCache.put("occupancy-renewals/base/templates/occupancy-renewals-editable.html",
"<div class=\"rp-cg-editable\"><span class=\"rp-cg-text rp-cg-body-text\">{{column.getVal().toLocaleString()}}</span><div class=\"rp-input-text small\"><input ng-class=\"column.row.data[column.config.key] === '' ? 'cg-editable-dirty rp-cg-input-text rp-form-input' : 'rp-cg-input-text rp-form-input'\" ng-model-options=\"{updateOn: 'blur' }\" ng-model=\"column.row.data[column.config.key]\" ng-change=\"column.config.action.change(column, row)\" ng-blur=\"column.config.action.blur(column, row)\" onkeypress=\"return (event.charCode != 46 && event.charCode != 45 && event.charCode > 31\n" +
"    && (event.charCode < 48 || event.charCode > 57)) ? false : true\"></div></div>");
$templateCache.put("occupancy-renewals/base/templates/reference-data-headers.html",
"<div class=\"rp-cg-text rp-cg-body-text\"><span class=\"ft-s-14 _600\">{{column.row.data[column.config.key] }}</span><div class=\"ft-s-10 text-neutral-03\">{{column.row.data.yearType }}</div></div><div class=\"m-t-1 ft-s-10 refText\"><i class=\"m-r-xs rp-icon-info-circle ft-s-10\"></i> {{column.row.data.helpDesc}}</div>");
}]);
