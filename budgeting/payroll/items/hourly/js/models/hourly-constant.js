//  Hourly Grid Constants Model

(function (angular) {
    "use strict";

    function factory(
        bmGridConstant,
        hourlyContent) {
        var model = angular.merge({}, bmGridConstant);

        model.methodConfig.onHourlyChange = "onHourlyChange";
        model.methodConfig.onHourlyBlur = "onHourlyBlur";
        model.methodConfig.getTotal = "getTotal";
        model.methodConfig.getMontlyWorkedHoursTotal = "getMontlyWorkedHoursTotal";
        model.methodConfig.getMontlyPayTotal = "getMontlyPayTotal";

        model.rowTypeConfig.monthlyHoursWorked = "monthlyHoursWorked";
        model.rowTypeConfig.monthlyPayTotal = "monthlyPayTotal";

        model.rowConfig = {
            noOfPayRuns: {
                itemDescription: hourlyContent.noOfPayrollRunText,
                rowType: model.rowTypeConfig.readonly,
                groupID: 1,
                level: 1
            },
            regaularHours: {
                itemDescription: hourlyContent.regularHour,
                rowType: model.rowTypeConfig.groupHeader,
                groupID: 2,
                level: 1
            },
            hourlyRate: {
                itemDescription: hourlyContent.hourlyRate,
                rowType: model.rowTypeConfig.editable,
                groupID: 3,
                level: 1,
                total: ''
            },
            weeklyHoursWorked: {
                itemDescription: hourlyContent.weeklyHoursWorked,
                rowType: model.rowTypeConfig.editable,
                groupID: 4,
                level: 1,
                total: ''
            },
            monthlyHoursWorked: {
                itemDescription: hourlyContent.monthlyHoursWorked,
                rowType: model.rowTypeConfig.monthlyHoursWorked,
                groupID: 5,
                level: 1,
                refGroupID: 4
            },
            regularMonthlyPay: {
                itemDescription: hourlyContent.regularMonthlyPay,
                rowType: model.rowTypeConfig.monthlyPayTotal,
                groupID: 6,
                level: 1,
                refGroupID: 5,
                rowClass: "total"
            },
            overtimeHours: {
                itemDescription: hourlyContent.overtimeHours,
                rowType: model.rowTypeConfig.groupHeader,
                groupID: 2,
                level: 2
            },
            weeklyOvertimeHoursWorked: {
                itemDescription: hourlyContent.weeklyOvertimeHoursWorked,
                rowType: model.rowTypeConfig.editable,
                groupID: 4,
                level: 2,
                total: ''
            },
            monthlyOvertimeHoursWorked: {
                itemDescription: hourlyContent.monthlyOvertimeHoursWorked,
                rowType: model.rowTypeConfig.monthlyHoursWorked,
                groupID: 5,
                level: 2,
                refGroupID: 4
            },
            overtimeMonthlyPay: {
                itemDescription: hourlyContent.overtimeMonthlyPay,
                rowType: model.rowTypeConfig.monthlyPayTotal,
                groupID: 6,
                level: 2,
                refGroupID: 5,
                rowClass: "total"
            },
            total: {
                itemDescription: hourlyContent.totalMonthlySalary,
                rowType: model.rowTypeConfig.total,
                groupID: 7,
                level: 1,
                refGroupID: 6
            }
        };

        model.getRowConfigs = function () {
            return model.rowConfig;
        };

        model.getRowTypeConfigs = function () {
            return model.rowTypeConfig;
        };

        model.getMethodConfigs = function () {
            return model.methodConfig;
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory("hourlyConstantModel", [
            'bmGridConstantModel',
            'hourlyContentModel',
             factory]);
})(angular);
