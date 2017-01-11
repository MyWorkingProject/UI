//  HA Grid Constants Model

(function (angular) {
    "use strict";

    function factory(
        bmGridConstant,
        haContent) {
        var model = angular.merge({}, bmGridConstant);

        model.methodConfig.onMonthlyChange = "onMonthlyChange";
        model.methodConfig.onMonthlyBlur = "onMonthlyBlur";
        model.methodConfig.getTotalMonthlyHA = "getTotalMonthlyHA";

        model.rowConfig = {
            unitTypeRent: {
                itemDescription: haContent.marketRentByText,
                rowType: model.rowTypeConfig.readonly,
                groupID: 1,
                level: 1
            },
            rate: {
                itemDescription: haContent.flatRateText,
                rowType: model.rowTypeConfig.editable,
                groupID: 2,
                level: 1
            },
            total: {
                itemDescription: haContent.housingAllowanceTotalText,
                rowType: model.rowTypeConfig.total,
                groupID: 3,
                level: 1
            }
        };

        model.getRowConfigs = function () {
            return model.rowConfig;
        };

        model.getMethodConfigs = function () {
            return model.methodConfig;
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory("haConstantModel", [
            'bmGridConstantModel',
            'haContentModel',
             factory]);
})(angular);
