//  hourly mapper Model

(function (angular) {
    "use strict";

    function factory(hourlyConstant) {
        var model = {},
            columns = hourlyConstant.getColumns(),
            rowConfig = hourlyConstant.getRowConfigs();

        /**
         * Create's payload data by modify the response data, that can post back to server
         * @param  {Array} payload Data
         * @param  {Array} grid Data
         * @return {Array} modified Array
         */
        model.toJsonFromGrid = function (payrollID, dataRows, gridColumns, grid) {
            var listOfMonthlyHourlyPay = [],
                hourlyRateRow = grid.getRowsBy({
                    groupID: rowConfig.hourlyRate.groupID,
                    level: rowConfig.hourlyRate.level
                }).first(),
                weeklyHoursWorkedRow = grid.getRowsBy({
                    groupID: rowConfig.weeklyHoursWorked.groupID,
                    level: rowConfig.weeklyHoursWorked.level
                }).first(),
                monthlyHoursWorkedRow = grid.getRowsBy({
                    groupID: rowConfig.monthlyHoursWorked.groupID,
                    level: rowConfig.monthlyHoursWorked.level
                }).first(),
                regularMonthlyPayRow = grid.getRowsBy({
                    groupID: rowConfig.regularMonthlyPay.groupID,
                    level: rowConfig.regularMonthlyPay.level
                }).first(),
                weeklyOvertimeHoursWorkedRow = grid.getRowsBy({
                    groupID: rowConfig.weeklyOvertimeHoursWorked.groupID,
                    level: rowConfig.weeklyOvertimeHoursWorked.level
                }).first(),
                monthlyOvertimeHoursWorkedRow = grid.getRowsBy({
                    groupID: rowConfig.monthlyOvertimeHoursWorked.groupID,
                    level: rowConfig.monthlyOvertimeHoursWorked.level
                }).first(),
                overtimeMonthlyPayRow = grid.getRowsBy({
                    groupID: rowConfig.overtimeMonthlyPay.groupID,
                    level: rowConfig.overtimeMonthlyPay.level
                }).first(),
                noOfPayRunsRow = grid.getRowsBy({
                    groupID: rowConfig.noOfPayRuns.groupID,
                    level: rowConfig.noOfPayRuns.level
                }).first();

            gridColumns.forEach(function (column) {
                if (column.isDataColumn) {
                    listOfMonthlyHourlyPay.push({
                        "payrollID": payrollID,
                        "hourlyRate": hourlyRateRow.getData()[column.key],
                        "weeklyHoursWorked": weeklyHoursWorkedRow.getData()[column.key],
                        "monthlyHoursWorked": monthlyHoursWorkedRow.getData()[column.key],
                        "regularMonthlyPay": regularMonthlyPayRow.getData()[column.key],
                        "weeklyOvertimeHoursWorked": weeklyOvertimeHoursWorkedRow.getData()[column.key],
                        "monthlyOvertimeHoursWorked": monthlyOvertimeHoursWorkedRow.getData()[column.key],
                        "overtimeMonthlyPay": overtimeMonthlyPayRow.getData()[column.key],
                        "noOfPayRuns": noOfPayRunsRow.getData()[column.key],
                        "startDate": column.dateStr,
                    });
                }
            });

            dataRows.forEach(function (item, index) {
                for (var key in item) {
                    if (listOfMonthlyHourlyPay[index].hasOwnProperty(key)) {
                        item[key] = listOfMonthlyHourlyPay[index][key];
                    }
                }
            });
            return listOfMonthlyHourlyPay;
        };

        /**
         * Create's Complex grid rows for the response data & apply row Config
         * @param  {object} default row that will extended
         * @param  {array} response data from service
         * @return {object} this
         */
        model.buildGridData = function (defaultRow, data) {
            var dataRows = [];
            var mappers = [
                    'noOfPayRuns',
                    'regaularHours',
                    'hourlyRate',
                    'weeklyHoursWorked',
                    'monthlyHoursWorked',
                    'regularMonthlyPay',
                    'overtimeHours',
                    'weeklyOvertimeHoursWorked',
                    'monthlyOvertimeHoursWorked',
                    'overtimeMonthlyPay',
                    'total'
                ];

            mappers.forEach(function (key) {
                var dataRow = angular.extend({}, defaultRow, rowConfig[key]);
                data.forEach(function (item) {
                    dataRow[columns.period.key + item.periodNo] = item[key] || 0;
                });
                dataRows.push(dataRow);
            });

            return dataRows;
        };

        /**
         * Sets response data to zero if column is not editable(i.e if the user has join in between model)
         * @param  {rows}
         * @param  {columnModel}
         * @param  {number}
         * @return {object} this
         */
        model.resetData = function (dataRows, column, index) {
            if (column.isDataColumn && !column.isEditable) {
                var mappers = [
                    'regaularHours',
                    'hourlyRate',
                    'weeklyHoursWorked',
                    'monthlyHoursWorked',
                    'regularMonthlyPay',
                    'overtimeHours',
                    'weeklyOvertimeHoursWorked',
                    'monthlyOvertimeHoursWorked',
                    'overtimeMonthlyPay',
                    'total'
                ];
                mappers.forEach(function (key) {
                    dataRows.forEach(function (dataRow) {
                        if (dataRow.periodNo === column.period) {
                            dataRow[key] = 0;
                        }
                    });
                });
            }
        };

        return model;
    }

    angular
        .module("budgeting")
        .factory("hourlyMapperModel", ['hourlyConstantModel', factory]);
})(angular);
