//  Properties Grid Model Configuration

(function (angular) {
    "use strict";

    function gridFactory(rpGridConfig, cpConstants, i18n) {
        var gridConfig = rpGridConfig();

        var columnConfig = [{
                type: "text",
                key: cpConstants.colKey.property
            }, {
                type: "text",
                key: cpConstants.colKey.masterChart
            }, {
                type: "custom",
                key: cpConstants.colKey.glAccount,
                templateUrl: cpConstants.templateConfig.glAccountSelector,
                selectGLAccount: gridConfig.getMethod('toggleGLSelector')
            }, {
                type: "custom",
                key: cpConstants.colKey.allocation,
                templateUrl: cpConstants.templateConfig.allocation
            }, {
                type: "custom",
                key: cpConstants.colKey.deleteRow,
                templateUrl: cpConstants.templateConfig.deleteRow,
                deleteRow: gridConfig.getMethod('confirmDeleteProperty')
            }];

        var headerConfig = [[{
                text: i18n.translate("bdgt_new_contract_prop_name"),
                key: cpConstants.colKey.property,
                isSortable: true
            }, {
                text: i18n.translate("bdgt_new_contract_chart_name"),
                key: cpConstants.colKey.masterChart,
                isSortable: true
            }, {
                text: i18n.translate("bdgt_new_contract_gl_account"),
                key: cpConstants.colKey.glAccount,
                isSortable: true
            }, {
                text: i18n.translate("bdgt_new_contract_allocation"),
                key: cpConstants.colKey.allocation,
                isSortable: true
            }, {
                text: "",
                key: cpConstants.colKey.deleteRow,
                isSortable: false
            }]];

        var filterConfig = [{
                key: cpConstants.colKey.property,
                type: "text",
                placeholder: i18n.translate("bdgt_new_contract_filter_prop_name")
            }, {
                key: cpConstants.colKey.masterChart,
                type: "text",
                placeholder: i18n.translate("bdgt_new_contract_filter_chart_name")
            }, {
                key: cpConstants.colKey.glAccount,
            }, {
                key: cpConstants.colKey.allocation,
            }, {
                key: cpConstants.colKey.deleteRow,
            }];


        //initialize properties' grid model
        gridConfig.get = function() {
            return columnConfig;
        };
        gridConfig.getHeaders = function() {
            return headerConfig;
        };
        gridConfig.getFilters = function() {
            return filterConfig;
        };

        return gridConfig;
    }

    angular
        .module("budgeting")
        .factory("propertiesGridConfigModel", [
                "rpGridConfig",
                "contractPropsConstantModel",
                "contractTranslatorSvc",
                gridFactory
        ]);

})(angular);