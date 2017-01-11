//  GL Accounts Grid Model

(function (angular) {
    "use strict";

    function factory(gridConfig, appTranslate, $stateParams) {
        var headers = [], defHeaders, translate;
        var config, model = gridConfig();
        translate = appTranslate('manageGlAccount').translate;

        var updateGridModel = function (data) {

            model.get = function () {
                var columnsModel = [
                    {
                        key: 'isSelected',
                        idKey: 'glAccountID',
                        type: 'select'
                    }, {
                        key: 'glAccountNumber',
                        type: 'link',
                       // getLink: model.getMethod('editGLAccount')
                    }, {
                        key: 'glAccountDescription'
                    }, {
                        key: 'accountTypeCode'
                    }, {
                        key: 'accountCategoryName'
                    }, {
                        key: 'budgetUseOnly',
                        type: 'custom',
                        templateUrl: 'templates/manage-gl-account/manage-gl-budgetuse.html'
                    }, {
                        key: 'normalBalance'
                    }, {
                        key: 'restrictPayroll',
                        type: 'custom',
                        templateUrl: 'templates/manage-gl-account/manage-gl-restrict-payroll.html'
                    }
                ];
                var chartType = $stateParams.type; //0 - mastercharts, otherthan 0- Property Charts propertyid
                if (chartType === undefined) {
                    chartType = "0";
                }
                if (chartType !== "0") {
                    var statusCol = {
                        key: "status"
                    };
                    columnsModel.push(statusCol);
                }
                return columnsModel;
                // return columnsModel;
            };

            model.getHeaders = function () {
                var headerModel = [
                    [
                       {
                           value: false,
                           key: 'isSelected',
                           type: 'select',
                           text: ''
                       }, {
                           text: translate('bdgt_manageglaccount_glAccountNumber'),
                           key: 'glAccountNumber',
                           isSortable: false,
                           className: 'gl-account-number'
                       }, {
                           text: translate('bdgt_manageglaccount_glAccountDescription'),
                           key: 'glAccountDescription',
                           isSortable: false,
                           className: 'glaccount-description',
                       }, {
                           text: translate('bdgt_manageglaccount_accountTypeCode'),
                           key: 'accountTypeCode',
                           isSortable: false,
                           className: 'account-type-code'
                       }, {
                           text: translate('bdgt_manageglaccount_accountCategoryName'),
                           key: 'accountCategoryName',
                           isSortable: false,
                           className: 'account-category-name'
                       }, {
                           text: translate('bdgt_manageglaccount_budgetUseOnly'),
                           key: 'budgetUseOnly',
                           isSortable: false,
                           className: 'budget-use-only'
                       }, {
                           text: translate('bdgt_manageglaccount_normalBalance'),
                           key: 'normalBalance',
                           isSortable: false,
                           className: 'normal-balance'
                       }, {
                           text: translate('bdgt_manageglaccount_restrictPayroll'),
                           key: 'restrictPayroll',
                           isSortable: false,
                           className: 'restrict-payroll'
                       }
                    ]
                ];

                var chartType = $stateParams.type; //0 - mastercharts, otherthan 0- Property Charts propertyid
                if (chartType === undefined) {
                    chartType = "0";
                }
                if (chartType !== "0") {
                    var statusCol = {
                        text: "Status",
                        key: "status",
                        isSortable: false,
                        className: "status"
                    };
                    headerModel[0].push(statusCol);
                }

                return headerModel;
            };

            model.getFilters = function () {
                var filterModel = [
                    {
                        key: 'isSelected',
                        type: ''
                    },
                {
                    key: 'glAccountNumber',
                    placeholder: translate('bdgt_manageglaccount_filter_glAccountNumber'),
                    type: 'text',
                    className: 'gl-account-number'
                }, {
                    key: 'glAccountDescription',
                    placeholder: translate('bdgt_manageglaccount_filter_glAccountDescription'),
                    type: 'text',
                    className: 'gl-account-description',
                }, {
                    key: 'accountTypeCode',
                    type: 'menu',
                    options: data,
                    className: 'account-type-code'
                }, {
                    key: 'accountCategoryName',
                    placeholder: translate('bdgt_manageglaccount_filter_accountCategoryName'),
                    type: 'text',
                    className: 'account-category-name'
                }, {
                    key: 'budgetUseOnly',
                    type: 'menu',
                    className: 'budget-use-only',
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
                    key: 'normalBalance',
                    type: 'menu',
                    className: 'normal-balance',
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
                    key: 'restrictPayroll',
                    type: 'menu',
                    className: 'restrict-payroll',
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
                }
                ];

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
                    filterModel.push(statusCol);
                }

                return filterModel;
            };


            return model;
        };

        return { updateGridModel: updateGridModel };

    }

    angular
        .module("budgeting")
        .factory('manageGlAccountConfig', [
            'rpGridConfig',
            'appLangTranslate',
            '$stateParams',
            factory
        ]);
})(angular);
