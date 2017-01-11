angular.module('budgeting').run(['$templateCache', function($templateCache) {
$templateCache.put("occupancy-renewals/occupancy-vacancy-service-group/templates/occupancy-goal-percentage.html",
"<div class=\"rp-cg-text rp-cg-body-text text-left rp-cg-editable\">{{column.row.data[column.config.key] }} <span ng-if=\"model.isEditable\" class=\"text-right p-l-1 display-occupancy-goal\"><input class=\"rp-cg-input-text rp-form-input\" ng-model-options=\"{updateOn: 'blur' }\" ng-change=\"column.config.action.change(column, row)\" ng-blur=\"column.config.action.blur(column, row)\" ng-model=\"column.row.data.goalPercentage\"></span></div>");
$templateCache.put("occupancy-renewals/occupancy-vacancy-service-group/templates/occupancy-update-column.html",
"<div class=\"rp-cg-text rp-cg-body-text text-left\">{{column.row.data[column.config.key] }} <span class=\"text-right text-primary pull-right\"><a ng-click=\"column.config.action.click(column, row)\">Update</a> <span class=\"rp-icon-question-circle p-l-sm\" ng-click=\"column.config.action.onIconClick(column, row)\"></span></span><div class=\"col-sm-3 fdn-arrow box-color text-color begining-help-text tool-tip-product\" ng-show=\"column.row.data.updateBOUToolTip\"><span class=\"arrow top pull-left white\"></span><div class=\"box-body\">{{column.row.data.helpText}}</div></div></div>");
$templateCache.put("occupancy-renewals/occupancy-vacancy-service-group/templates/reference-data-header.html",
"<div class=\"rp-cg-text rp-cg-body-text\">{{column.row.data[column.config.key] }}<!--<span class=\"text-right text-primary pull-right\">\n" +
"        Actual 2016 \n" +
"        <span class=\"rp-icon-question-circle p-l-sm\" ng-click=\"column.config.action.onIconClick(column, row)\"></span>\n" +
"    </span>\n" +
"    <div class=\"col-sm-3 fdn-arrow box-color text-color begining-help-text tool-tip-product\" ng-show=\"column.row.data.updateBOUToolTip\">\n" +
"        <span class=\"arrow top pull-left white\"></span>\n" +
"        <div class=\"box-body\">\n" +
"            {{column.row.data.helpText}}\n" +
"        </div>\n" +
"    </div>-->Actual 2016</div>");
}]);
