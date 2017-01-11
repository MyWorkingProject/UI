
(function (angular) {
    "use strict";

    // Define the list of headers
    function defineHeaders(i18n) {
        var hdConfig = [[{
            text: i18n.translate("gl_grid_description"),
            key: "itemDescription",
            isSortable: true
        }, {
            text: i18n.translate("gl_grid_balance"),
            key: "balance",
            isSortable: true
        }]];

        var hdSetup = function () {
            return hdConfig;
        };

        return hdSetup;
    }

    // Define the list of columns
    function defineColumns() {
        var columnConfig = [{
            key: "itemDescription",
            type: "text"
        }, {
            key: "balance",
            type: "currency"
        }];

        var columnSetup = function() {
            return columnConfig;
        };

        return columnSetup;
    }

    function gridFactory(rpGridConfig, i18n) {
        var gridConfig = rpGridConfig();

        gridConfig.get = defineColumns();
        gridConfig.getHeaders = defineHeaders(i18n);

        return gridConfig;
    }

    angular
        .module("budgeting")
        .factory("glHistoryModelGridConfig", [
                "rpGridConfig",
                "glAcctTranslatorSvc",
                gridFactory
        ]);

})(angular);