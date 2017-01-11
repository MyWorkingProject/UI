//  Salary Grid Constants Model

(function (angular) {
    "use strict";

    function factory(
        bmGridConstant) {
        var model = angular.merge({}, bmGridConstant);

        model.methodConfig.onMonthlyChange = "onMonthlyChange";
        model.methodConfig.onMonthlyBlur = "onMonthlyBlur";

        model.rowConfig = {
            amount: {
                itemDescription: "Monthly Amounts",
                rowType: model.rowTypeConfig.editable,
                groupID: 1,
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
        .factory("amountConstantModel", [
            'bmGridConstantModel',
             factory]);
})(angular);
