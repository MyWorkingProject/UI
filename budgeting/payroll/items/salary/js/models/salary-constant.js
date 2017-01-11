//  Salary Grid Constants Model

(function (angular) {
    "use strict";

    function factory(
        bmGridConstant,
        salaryContent) {
        var model = angular.merge({}, bmGridConstant);

        model.methodConfig.onMonthlyChange = "onMonthlyChange";
        model.methodConfig.onMonthlyBlur = "onMonthlyBlur";
        model.methodConfig.getTotalMonthlySalary = "getTotalMonthlySalary";

        model.rowConfig = {
            noOfPayRuns: {
                itemDescription: salaryContent.noOfPayrollRunText,
                rowType: model.rowTypeConfig.readonly,
                groupID: 1,
                level: 1
            },
            monthlySalary: {
                itemDescription: salaryContent.monthlySalaryText,
                rowType: model.rowTypeConfig.editable,
                groupID: 2,
                level: 1
            },
            total: {
                itemDescription: salaryContent.totalMonthlySalaryText,
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
        .factory("salaryConstantModel", [
            'bmGridConstantModel',
            'salaryContentModel',
             factory]);
})(angular);
