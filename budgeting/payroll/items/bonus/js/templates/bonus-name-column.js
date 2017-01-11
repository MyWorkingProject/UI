(function () {
    'use strict';

    var templateHtml, templateUrl;

    templateUrl = "payroll/items/bonus/templates/bonus-name.html";

    templateHtml = '' +
        '<div class="rp-cg-editable rp-input-text" ng-if="model.state.edit">' +
            '<input class="rp-cg-input-text rp-form-input" ' +
                'ng-class="{\'error\': column.row.validation[column.config.key] === false}" ' +
                'ng-model-options="{updateOn: \'blur\' }" ' +
                'ng-change="column.config.action.change(column, row)" ' +
                'ng-model="column.row.data[column.config.key]" />' +
            '<span class="rp-cg-text pointer delete-icon" ' +
                'ng-click="column.config.action.onRemoveBonus(column, row)"><i class="rp-icon-trash"></i></span>' +
            '<span class="rp-cg-text pointer add-icon" ' +
                'ng-if="model.isLastRowInGroup(column, row)" ng-click="column.config.action.onAddBonus(column, row)"><i class="rp-icon-add"></i></span>' +
        '</div>' +
        '<div class="rp-cg-text rp-cg-body-text" ng-if="!model.state.edit">' +
            '{{column.row.data[column.config.key] }}' +
        '</div>';

    function installTemplate($templateCache) {
        $templateCache.put(templateUrl, templateHtml);
    }

    angular
        .module('budgeting')
        .run(['$templateCache', installTemplate]);
})();
