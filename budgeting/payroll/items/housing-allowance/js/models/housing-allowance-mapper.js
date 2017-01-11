//  hourly mapper Model

(function (angular) {
    "use strict";

    function factory(haConstant) {
        var model = {},
            columns = haConstant.getColumns(),
            rowConfig = haConstant.getRowConfigs();

        /**
         * Create's payload data by modify the response data, that can post back to server
         * @param  {Array} payload Data
         * @param  {Array} grid Data
         * @return {Array} modified Array
         */
        model.toJsonFromGrid = function (payrollID, dataRows, gridColumns, grid) {
            var listPayrollMonthlyHousing = [],
                unitTypeRentRow = grid.getRowsBy({
                    groupID: rowConfig.unitTypeRent.groupID,
                    level: rowConfig.unitTypeRent.level
                }).first(),
                rateRow = grid.getRowsBy({
                    groupID: rowConfig.rate.groupID,
                    level: rowConfig.rate.level
                }).first(),
                totalRow = grid.getRowsBy({
                    groupID: rowConfig.total.groupID,
                    level: rowConfig.total.level
                }).first();

            gridColumns.forEach(function (column) {
                if (column.isDataColumn) {
                    listPayrollMonthlyHousing.push({
                        "payrollID": payrollID,
                        "rate": rateRow.getData()[column.key],
                        "unitTypeRent": unitTypeRentRow.getData()[column.key],
                        "startDate": column.dateStr,
                        "housingAllowanceTotal": totalRow.getData()[column.key]
                    });
                }
            });

            dataRows.forEach(function (item) {
                item.rate = rateRow.getData()[columns.period.key + item.periodNo];
            });
            return listPayrollMonthlyHousing;
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
                    'unitTypeRent',
                    'rate',
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
        model.resetData = function (dataRows, incomeModel, column, index) {
            if (column.isDataColumn && !column.isEditable || incomeModel.toLowerCase() === 'none') {
                var mappers = [
                    'unitTypeRent'
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
        .factory("haMapperModel", ['haConstantModel', factory]);
})(angular);
