//  RenewalCommn Grid Constants Model

(function (angular) {
    "use strict";

    function factory(
        bmGridConstant,
        renewalCommnContent) {
        var model = angular.merge({}, bmGridConstant);

        model.methodConfig.onMonthlyChange = "onMonthlyChange";
        model.methodConfig.onMonthlyBlur = "onMonthlyBlur";
        model.methodConfig.getRenewalTotal = "getRenewalTotal";

        model.rowTypeConfig.renewalTotal = 'renewalTotal';
        model.rowTypeConfig.additinaleditable = 'additinaleditable';

        model.rowConfig = {
            leaseRenewals: {
                itemDescription: renewalCommnContent.leaseRenewalText,
                rowType: model.rowTypeConfig.readonly,
                rowID: 1,
                groupID: 1,
                level: 1
            },
            percentOfRenewals: {
                itemDescription: renewalCommnContent.renewalText,
                rowType: model.rowTypeConfig.editable,
                rowID: 2,
                groupID: 1,
                level: 1,
                total: ''
            },
            commissionAmount: {
                itemDescription: renewalCommnContent.commissionAmountText,
                rowType: model.rowTypeConfig.editable,
                rowID: 3,
                groupID: 1,
                level: 1,
                total: ''
            },
            leaseRenewalTotal: {
                itemDescription: renewalCommnContent.leaseRenewalTotalText,
                rowType: model.rowTypeConfig.renewalTotal,
                rowID: 4,
                groupID: 2,
                level: 1,
                rowClass: "total"
            },
            leaseRenewalsMTM: {
                itemDescription: renewalCommnContent.mtmRenewalsText,
                rowType: model.rowTypeConfig.readonly,
                rowID: 1,
                groupID: 1,
                level: 2
            },
            mtmPercentOfRenewals: {
                itemDescription: renewalCommnContent.renewalText,
                rowType: model.rowTypeConfig.editable,
                rowID: 2,
                groupID: 1,
                level: 2,
                total: ''
            },
            mtmCommissionAmount: {
                itemDescription: renewalCommnContent.commissionAmountText,
                rowType: model.rowTypeConfig.editable,
                rowID: 3,
                groupID: 1,
                level: 2,
                total: ''
            },
            mtmRenewalTotal: {
                itemDescription: renewalCommnContent.mtmRenewalTotalText,
                rowType: model.rowTypeConfig.renewalTotal,
                rowID: 4,
                groupID: 2,
                level: 2,
                rowClass: "total"
            },
            additionalAmount: {
                itemDescription: renewalCommnContent.additinalText,
                rowType: model.rowTypeConfig.additinaleditable,
                rowID: 1,
                groupID: 2,
                level: 3
            },
            renewalCommissionTotal: {
                itemDescription: renewalCommnContent.totalLeasingCommissionText,
                rowType: model.rowTypeConfig.total,
                rowID: 1,
                groupID: 3,
                level: 4
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

        return model;
    }

    angular
        .module("budgeting")
        .factory("renewalCommnConstantModel", [
            'bmGridConstantModel',
            'renewalCommnContentModel',
             factory]);
})(angular);
