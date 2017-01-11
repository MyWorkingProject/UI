//  hourly mapper Model

(function (angular) {
    "use strict";

    function factory(salaryConstant) {
        var model = {},
            columns = salaryConstant.getColumns(),
            rowConfig = salaryConstant.getRowConfigs();

        /**
         * Create's payload data by modify the response data, that can post back to server
         * @param  {Array} payload Data
         * @param  {Array} grid Data
         * @return {Array} modified Array
         */
        model.toJsonFromGrid = function (payrollID, dataRows, gridColumns, grid) {
            var listOfMonthlySalary = [],
                monthlySalaryRow = grid.getRowsBy({
                    groupID: rowConfig.monthlySalary.groupID,
                    level: rowConfig.monthlySalary.level
                }).first(),
                noOfPayRunsRow = grid.getRowsBy({
                    groupID: rowConfig.noOfPayRuns.groupID,
                    level: rowConfig.noOfPayRuns.level
                }).first();

            gridColumns.forEach(function (column) {
                if (column.isDataColumn) {
                    listOfMonthlySalary.push({
                        "payrollID": payrollID,
                        "monthlySalary": monthlySalaryRow.getData()[column.key],
                        "noOfPayRuns": noOfPayRunsRow.getData()[column.key],
                        "startDate": column.dateStr,
                    });
                }
            });

            dataRows.forEach(function (item) {
                item.monthlySalary = monthlySalaryRow.getData()[columns.period.key + item.periodNo];
            });
            return listOfMonthlySalary;
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
                    'monthlySalary',
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
                    'monthlySalary'
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
        .factory("salaryMapperModel", ['salaryConstantModel', factory]);
})(angular);
