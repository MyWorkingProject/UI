// Contract > Properties "Constants" Model

(function (angular) {
    "use strict";

    function factory(i18n) {
        var model = {};

        //keys related with GL Selector
        model.glSearch = {
            acctNum: "glAccountNumber",
            acctDesc: "glAccountDescription",
            isEdit: "editGLAccount"
        };

        //keys related with server data format
        model.serverDataKey = {
            isSelected: "isChecked",
            propertyID: "propertyID",
            property: "propertyName",
            masterChartID: "masterChartID",
            masterChart: "masterChartName",
            glAcctNum: "glAccountNumber",
            glAcctDesc: "glDescription",
            vendorContractPropID: "vendorContrctPropertyID",
            vendorContractID: "vendorContractID",
        };

        //keys related with column configuration
        model.colKey = {
            property: "propertyName",
        	masterChart: "masterChartName",
    		glAccount: "glAccount",
            allocation: "percentage", 
            deleteRow: "deleteRow"
        };

        model.templateConfig = {
            glAccountSelector: "contract/properties/templates/grid.gl-account.html",
            allocation: "contract/properties/templates/grid.percentage.html",
            deleteRow: "contract/properties/templates/grid.delete-row.html"
        };

        model.gridFilterConfig = {
            defaultText: i18n.translate("bdgt_contract_filter"),
            activeIconClass: "rp-icon-filter",
            defaultIconClass: "rp-icon-filter active"
        };


        return model;
    }

    angular
        .module("budgeting")
        .factory("contractPropsConstantModel", [
            "contractTranslatorSvc",
            factory
        ]);
})(angular);
