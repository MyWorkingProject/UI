// Assign GL Accounts Grid Configuration

(function (angular) {
    "use strict";

    function gridFactory(rpGridConfig, agaConstants, i18n) {
        var headerConfig = [[{
            text: i18n.translate("aga_grid_master_chart"),
            key: agaConstants.columnKey.masterChart,
            isSortable: false
        }, {
            text: i18n.translate("aga_grid_gl_acct"),
            key: agaConstants.columnKey.glAccount,
            isSortable: false
        }]];

        var columnConfig = [{
            type: "text",
            key: agaConstants.columnKey.masterChart,
        }, {
            type: "custom",
            key: agaConstants.columnKey.glAccount,
            templateUrl: agaConstants.templateConfig.glAccountSelector
        }];


        return function() {
            var gridConfig = rpGridConfig();

            gridConfig.get = function() {
                return columnConfig;
            };

            gridConfig.getHeaders = function() {
                return headerConfig;
            };

            return gridConfig;
        };
    }
    
    angular
        .module("budgeting")
        .factory("assignGLsGridConfig", [
                "rpGridConfig",
                "assignGLsConstantModel",
                "assignGLsTranslatorSvc",
                gridFactory
        ]);

})(angular);