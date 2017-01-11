(function (angular) {
    "use strict";

    function factory(gridFiltersModel, appLangTranslate) {
        var model, filters, translate, updateFilters;
        translate = appLangTranslate('taskBudgetModel').translate;

        filters = [{
                key: 'isSelected',
                type: 'menu',
                options: [
                    {
                        name: 'All',
                        value: ''
                }, {
                        name: 'Selected',
                        value: '1'
                }, {
                        name: 'Not Selected',
                        value: '0'
                }]
             },
            {
                key: 'budgetYear',
                placeholder: translate('bdgt_taskBudgetModel_filterBudgetYearText')
        }, {
                key: 'modelType',
                placeholder: translate('bdgt_taskBudgetModel_filterModelTypeText')
        }, {
                key: 'assetType',
                placeholder: translate('bdgt_taskBudgetModel_filterAssetTypeText')
        }, {
                key: 'name',
                placeholder: translate('bdgt_taskBudgetModel_filternameText')
        }];
        model = gridFiltersModel(filters);

        model.className = 'rp-grid-filter-1';

        return model;

    }
    angular.module("budgeting")
        .factory('taskBudgetModelFilters', ['rpGridFiltersModel', 'appLangTranslate', factory]);

})();
