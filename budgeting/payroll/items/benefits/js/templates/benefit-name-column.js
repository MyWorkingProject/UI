(function () {
    'use strict';

    var templateHtml, templateUrl;

    templateUrl = "payroll/items/benefits/templates/benefit-name.html";

    templateHtml = '' +
        '<div class="rp-cg-editable" ng-if="model.state.edit">' +
        '        <div class="rp-select-menu">' +
        '        <select class="rp-form-select-field benefits-select-width" ng-model="column.row.data[column.config.key]"' +
        '                ng-options="option.value as option.text  for option in column.config.getBenefitsOption()"' +
        '                ng-change="column.config.action.onBenefitChange(column, row)"></select>' +
        '        <div class="rp-select-menu-inner benefits-select-width">' +
        '            <span title=" {{column.row.data[column.config.key] }}" class="rp-select-menu-value">{{column.row.data[column.config.key] }}</span>' +
        '        </div>' +
        '            <span class=" rp-cg-text pointer delete-icon"' +
        '                  ng-click="column.config.action.deleteBenefitsItem(column, row)">' +
        '                <i class="rp-icon-trash"></i>' +
        '            </span>' +
        '            <span class="rp-cg-text pointer add-icon" ng-if="model.isLastRowInGroup(column, row)"' +
        '                  ng-click="column.config.action.addBenefitsItem(column, row)">' +
        '                <i class="rp-icon-add"></i>' +
        '            </span>' +
        '    </div>' +
        '</div>' +
        '<div class="rp-cg-text rp-cg-body-text" ng-if="!model.state.edit">' +
        '    {{column.row.data[column.config.key] }}' +
        '</div>';

    function installTemplate($templateCache) {
        $templateCache.put(templateUrl, templateHtml);
    }

    angular
        .module('budgeting')
        .run(['$templateCache', installTemplate]);
})();
