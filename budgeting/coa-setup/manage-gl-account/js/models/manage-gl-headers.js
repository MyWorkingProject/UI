//  Users List Header Model

(function (angular) {
    "use strict";

    function factory(gridHeadersModel, langTranslate, $stateParams) {
        var headers = [];
        var defHeaders;
        var model = {};
        var translate;
        translate = langTranslate('manageGlAccount').translate;

        defHeaders = [[{
                value: false,
                key: 'isSelected',
                type: 'selectAll',
                text: 'select all'
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
        ]];

        angular.copy(defHeaders, headers);

        model.updateHeaders = function () {
            var gridHeaders;
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
                headers[0].push(statusCol);
            }

            gridHeaders = gridHeadersModel(headers);
            gridHeaders.className = 'rp-grid-header-1';
            return gridHeaders;
        };

        model.reset = function () {
            angular.copy(defHeaders, headers);
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory('manageGlAccountHeaders', ['rpGridHeadersModel', 'appLangTranslate', '$stateParams', factory]);
})(angular);
