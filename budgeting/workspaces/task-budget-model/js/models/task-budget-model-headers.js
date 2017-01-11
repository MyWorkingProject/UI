(function (angular) {
    "use strict";

    function factory(gridHeadersModel, appLangTranslate) {
        var headers, model, translate;

        translate = appLangTranslate('taskBudgetModel').translate;

        headers = [[{
            value: false,
            key: 'isSelected',
            type: 'selectAll',
            text: 'select all',
            className: 'select-all'
        }, {
            text: translate('bdgt_taskBudgetModel_grdBudgetYearText'),
            key: 'budgetYear',
            isSortable: false,
            className: 'budget-year'
        }, {
            text: translate('bdgt_taskBudgetModel_grdModelTypeText'),
            key: 'modelType',
            isSortable: false,
            className: 'model-type',
        }, {
            text: translate('bdgt_taskBudgetModel_grdAssetTypeText'),
            key: 'assetType',
            isSortable: false,
            className: 'asset-type'
        }, {
            text: translate('bdgt_taskBudgetModel_grdNameText'),
            key: 'name',
            isSortable: false,
            className: 'name'
        }]];
        model = gridHeadersModel(headers);
        model.className = 'rp-grid-header-1';
        logc(model);
        return model;
    }

    angular
        .module("budgeting")
        .factory('taskBudgetModelHeaders', ['rpGridHeadersModel', 'appLangTranslate', factory]);
})(angular);
