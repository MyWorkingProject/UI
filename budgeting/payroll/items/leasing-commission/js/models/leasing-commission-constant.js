//  Payroll Leasing Commissions Grid Constants Model

(function (angular) {
    "use strict";

    function factory(
        bmGridConstant,
        leasingComContent) {
        var model = angular.merge({}, bmGridConstant);

        model.methodConfig.onMonthlyChange = "onMonthlyChange";
        model.methodConfig.onMonthlyBlur = "onMonthlyBlur";
        model.methodConfig.getCommissionTotal = "getCommissionTotal";

        model.rowTypeConfig.commissionTotal = "commissionTotal";
        model.rowTypeConfig.additionalEditable = "additionalEditable";
        model.rowTypeConfig.percentEditable = "percentEditable";

        model.filterConfig.roundDecimalsTo10 = "roundDecimalsToTenths";
        model.filterConfig.formatPercent = "formatPercent";

        model.rowConfig = {
            moveIns: {
                itemDescription: leasingComContent.colMoveIns,
                rowType: model.rowTypeConfig.readonly,
                rowID: "moveIns",
                groupID: 1,
                level: 1
            },
            percentMoveIns: {
                itemDescription: leasingComContent.colMoveInsPercent,
                rowType: model.rowTypeConfig.percentEditable,
                rowID: "percentMoveIns",
                groupID: 1,
                level: 1,
                total: ""
            },
            commissionAmount: {
                itemDescription: leasingComContent.colCommissionAmt,
                rowType: model.rowTypeConfig.editable,
                rowID: "commissionAmount",
                groupID: 1,
                level: 1,
                total: ""
            },
            commissionTotal: {
                itemDescription: leasingComContent.colCommissionTotal,
                rowType: model.rowTypeConfig.commissionTotal,
                rowID: "commissionTotal",
                groupID: 2,
                level: 1,
                rowClass: "total"
            },
            additionalAmount: {
                itemDescription: leasingComContent.colAdditionalAmt,
                rowType: model.rowTypeConfig.additionalEditable,
                rowID: "additionalAmount",
                groupID: 2,
                level: 2
            },
            leasingCommissionTotal: {
                itemDescription: leasingComContent.colTotal,
                rowType: model.rowTypeConfig.total,
                rowID: "leasingCommissionTotal",
                groupID: 3,
                level: 3,
            }
        };

        model.getRowConfigs = function () {
            return model.rowConfig;
        };

        model.getMethodConfigs = function () {
            return model.methodConfig;
        };

        model.getRowTypeConfigs = function () {
            return model.rowTypeConfig;
        };

        model.getFilterConfigs = function () {
            return model.filterConfig;
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory("leasingCommConstantModel", [
            "bmGridConstantModel",
            "leasingComContentModel",
             factory]);
})(angular);
