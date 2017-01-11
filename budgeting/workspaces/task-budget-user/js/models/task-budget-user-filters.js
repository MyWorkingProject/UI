(function (angular) {
    "use strict";

    function factory(gridFiltersModel, appLangTranslate) {
        var model, filters, translate, updateFilters;
        translate = appLangTranslate('taskBudgetUser').translate;

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
                key: 'name',
                placeholder: translate('bdgt_taskBudgetUser_filterUserNameText')
        }, {
                key: 'role',
                placeholder: translate('bdgt_taskBudgetUser_filterUserRoleText')
        }];
        model = gridFiltersModel(filters);

        model.className = 'rp-grid-filter-1';

        return model;

    }
    angular.module("budgeting")
        .factory('taskBudgetUserFilters', ['rpGridFiltersModel', 'appLangTranslate', factory]);

})();
