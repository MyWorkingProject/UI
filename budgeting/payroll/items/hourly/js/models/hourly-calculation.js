//  Hourly Calculation Model

(function (angular) {
    "use strict";

    function factory($filter, bmGridCalculation, hourlyConstant) {
        var model = angular.extend({}, bmGridCalculation),
            noOfWeeksInYear = 52,
            rowConfig = hourlyConstant.getRowConfigs();

        model.getTotal = function (column, row, rows) {
            if (!column.isEditable) {
                return 0;
            }
            var total = 0;
            var refGroupID = row.getGroupID() - 1;
            rows.forEach(function (row, index) {
                if (row.groupID === refGroupID) {
                    total += parseFloat(row[column.key], 10) || 0;
                }
            });
            return model.getRoundedValueByGroupID(row.getGroupID(), total);
        };

        model.getMontlyWorkedHoursTotal = function (column, row, rows) {
            var total = 0;
            if (!column.isEditable) {
                return total;
            }
            var refGroupID = row.getGroupID() - 1,
                level = row.getLevel(),
                payrollRunRow = $filter('filter')(rows, {
                    groupID: rowConfig.noOfPayRuns.groupID
                }, true).first(),
                weeklyHoursWorkedRow = $filter('filter')(rows, {
                    groupID: refGroupID,
                    level: level
                }, true).first(),
                payrollRun = parseFloat(payrollRunRow[column.key], 10) || 0,
                totalPayrollRun = parseFloat(payrollRunRow[hourlyConstant.getColumns().total.key], 10) || 0,
                weeklyHoursWorked = parseFloat(weeklyHoursWorkedRow[column.key], 10) || 0;

            total = noOfWeeksInYear * weeklyHoursWorked * payrollRun / totalPayrollRun;

            return model.getRoundedValueByGroupID(row.getGroupID(), total);
        };

        model.getMontlyPayTotal = function (column, row, rows) {
            if (!column.isEditable) {
                return 0;
            }
            var total = 0,
                refGroupID = row.getGroupID() - 1,
                hourlyRateGroupID = hourlyConstant.getRowConfigs().hourlyRate.groupID,
                level = row.getLevel(),
                extraHours = rowConfig.regaularHours.level === level ? 1 : 1.5,
                hourlyRateRow = $filter('filter')(rows, {
                    groupID: hourlyRateGroupID
                }, true).first(),
                monthlyHoursWorkedRow = $filter('filter')(rows, {
                    groupID: refGroupID,
                    level: level
                }, true).first();

            if (hourlyRateRow && monthlyHoursWorkedRow) {
                total = parseFloat(hourlyRateRow[column.key], 10) *
                    parseFloat(monthlyHoursWorkedRow[column.key], 10) * 
                    extraHours;
            }

            return model.getRoundedValueByGroupID(row.getGroupID(), total);
        };

        /**
         * @param  {date} to consider to apply rates
         * @param  {number} begining hourly rate
         * @param  {number} ending hourly rate
         * @return {number} hourly rate for the month
         */
        model.getMonthlyHourlyRate = function (date, beginingRate, endingRate) {
            return date.getDate() === 1 ? endingRate : beginingRate;
        };

        /**
         * @param  {date} to consider to apply rates
         * @param  {number} begining hourly rate
         * @param  {number} ending hourly rate
         * @return {number} hourly rate for semi month
         */
        model.getSemiMonthlyHourlyRate = function (date, beginingRate, endingRate) {
            var hourlyRate = model.endingHourlyRate;
            if (date.getDate() > 15) {
                hourlyRate = model.sum(beginingRate, hourlyRate);
                hourlyRate = model.divide(hourlyRate, 2);
                hourlyRate = model.round(hourlyRate, 4);
            }
            return hourlyRate;
        };

        model.getWeeklyHourlyRate = function (beginingRate, endingRate, beginingWeek, endingWeek, noOfPayRuns) {
            var hourlyRate = model.sum(
                model.multiply(endingRate, 2),
                model.multiply(beginingRate, 1));
            hourlyRate = model.divide(hourlyRate, noOfPayRuns);
            hourlyRate = model.round(hourlyRate, 4);
            return hourlyRate;
        };

        /**
         * @param  {number}
         * @param  {number}
         * @return {number} by applying group based rounding
         */
        model.getRoundedValueByGroupID = function (groupID, value) {
            value = parseFloat(value) || 0;
            switch (groupID) {
            case rowConfig.hourlyRate.groupID:
                value = model.round(value, 4);
                break;
            case rowConfig.weeklyHoursWorked.groupID:
                value = value | 0;
                break;
            case rowConfig.regularMonthlyPay.groupID:
                value = Math.round(value);
                break;
            }
            return parseFloat(value);
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory("hourlyCalculationModel", [
            "$filter",
            "bmGridCalculationModel",
            "hourlyConstantModel",
            factory]);
})(angular);
