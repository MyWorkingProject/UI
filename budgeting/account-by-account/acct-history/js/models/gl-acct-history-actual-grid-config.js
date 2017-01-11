
(function (angular) {
    "use strict";

    // Define the list of headers
    function defineHeaders(i18n) {
        var hdConfig = [[{
            text: "",
            key: "expand",
            isSortable: false
        }, {
            text: i18n.translate("gl_grid_posted"),
            key: "posted",
            isSortable: true
        }, {
            text: i18n.translate("gl_grid_memo"),
            key: "memo",
            isSortable: true
        }, {
            text: i18n.translate("gl_grid_dept_id"),
            key: "departmentId",
            isSortable: true
        }, {
            text: i18n.translate("gl_grid_loc_id"),
            key: "locationId",
            isSortable: true
        }, {
            text: i18n.translate("gl_grid_debit"),
            key: "debit",
            isSortable: true
        }, {
            text: i18n.translate("gl_grid_credit"),
            key: "credit",
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
            key: "expand",
            type: "custom",
            templateUrl: "app/templates/gl-acct-history.expand.html"
        },{
            key: "posted",
            type: "text"
        }, {
            key: "memo",
            type: "custom",
            templateUrl: "app/templates/gl-acct-history.memo.html"
        }, {
            key: "departmentId",
            type: "text"
        }, {
            key: "locationId",
            type: "text"
        }, {
            key: "debit",
            type: "currency"
        }, {
            key: "credit",
            type: "currency"
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
        .factory("glHistoryActualGridConfig", [
                "rpGridConfig",
                "glAcctTranslatorSvc",
                gridFactory
        ]);

})(angular);