//  User Properties List Filters Model

(function (angular) {
    "use strict";

    function factory(gridFiltersModel, langTranslate, $stateParams) {
        var model, filters, updateFilters;
        var translate;
        translate = langTranslate('manageGlAccount').translate;

        updateFilters = function (acctypeOptions) {

            filters = [{
                    key: 'isSelected',
                    type: ''
            },
                {
                    key: 'GlAccountNumber',
                    placeholder: translate('bdgt_manageglaccount_filter_glAccountNumber')
            }, {
                    key: 'GlAccountDescription',
                    placeholder: translate('bdgt_manageglaccount_filter_glAccountDescription')
            }, {
                    key: 'AccountTypeCode',
                    type: 'menu',
                    options: acctypeOptions
            }, {
                    key: 'AccountCategoryName',
                    placeholder: translate('bdgt_manageglaccount_filter_accountCategoryName')
            }, {
                    key: 'BudgetUseOnly',
                    type: 'menu',
                    options: [
                        {
                            name: 'All',
                            value: ''
                }, {
                            name: 'Yes',
                            value: 'Yes'
                }, {
                            name: 'No',
                            value: 'No'
                }]
            }, {
                    key: 'NormalBalance',
                    type: 'menu',
                    options: [{
                        name: 'All',
                        value: ''
                }, {
                        name: 'Credit',
                        value: 'Credit'
                }, {
                        name: 'Debit',
                        value: 'Debit'
                }]
            }, {
                    key: 'RestrictPayroll',
                    type: 'menu',
                    options: [{
                        name: 'All',
                        value: ''
                }, {
                        name: 'Restricted',
                        value: 'Restricted'
                }, {
                        name: 'Not Restricted',
                        value: 'Not Restricted'
                }]
            }];
            var chartType = $stateParams.type; //0 - mastercharts, otherthan 0- Property Charts propertyid
            if (chartType === undefined) {
                chartType = "0";
            }
            if (chartType !== "0") {
                var statusCol = {
                    key: "status",
                    type: 'menu',
                    options: [{
                        name: 'All',
                        value: ''
                    }, {
                        name: 'Modified',
                        value: 'modified'
                    }, {
                        name: 'Added',
                        value: 'added'
                    }]
                };
                filters.push(statusCol);
            }

            model = gridFiltersModel(filters);

            model.className = 'rp-grid-filter-1';
            return model;
        };
        return {
            updateFilters: updateFilters
        };
    }

    angular
        .module("budgeting")
        .factory('manageGlAccountFilters', [
            'rpGridFiltersModel', 'appLangTranslate', '$stateParams',
            factory
        ]);
})(angular);
