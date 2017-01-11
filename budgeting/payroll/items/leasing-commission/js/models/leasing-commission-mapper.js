// Payroll Leasing Commissions apper Model

(function (angular) {
    "use strict";

    function factory(leasingCommConstant) {
        var model = {},
            columns = leasingCommConstant.getColumns(),
            rowConfig = leasingCommConstant.getRowConfigs();

        /**
         * Creates payload data by modify the response data, that can post back to server
         * @param  {Array} payload Data
         * @param  {Array} grid Data
         * @return {Array} modified Array
         */
        model.toJsonFromGrid = function (payrollID, dataRows, gridColumns, grid) {
            var listPayrollMonthlyRenewal = [],
                moveInsRow = grid.getRowsBy({
                    rowID: rowConfig.moveIns.rowID
                }).first(),
                commissionAmountRow = grid.getRowsBy({
                    rowID: rowConfig.commissionAmount.rowID
                }).first(),
                percentMoveInsRow = grid.getRowsBy({
                    rowID: rowConfig.percentMoveIns.rowID
                }).first(),
                commissionTotalRow = grid.getRowsBy({
                    rowID: rowConfig.commissionTotal.rowID
                }).first(),
                leasingCommissionTotalRow = grid.getRowsBy({
                    rowID: rowConfig.leasingCommissionTotal.rowID
                }).first(),
                additionalAmountRow = grid.getRowsBy({
                    rowID: rowConfig.additionalAmount.rowID
                }).first();

            gridColumns.forEach(function (column) {
                if (column.isDataColumn) {
                    listPayrollMonthlyRenewal.push({
                        "payrollID": payrollID,
                        "startDate": column.dateStr,
                        "moveIns": moveInsRow.getData()[column.key],
                        "commissionAmount": commissionAmountRow.getData()[column.key],
                        "percentMoveIns": percentMoveInsRow.getData()[column.key],
                        "numberCommissions": moveInsRow.getData()[column.key] * (percentMoveInsRow.getData()[column.key] / 100),
                        "commissionTotal": commissionTotalRow.getData()[column.key],
                        "leasingCommissionTotal": leasingCommissionTotalRow.getData()[column.key],
                        "additionalAmount": additionalAmountRow.getData()[column.key],
                    });
                }
            });

            dataRows.forEach(function (item, index) {
                for (var key in item) {
                    if (listPayrollMonthlyRenewal[index].hasOwnProperty(key)) {
                        item[key] = listPayrollMonthlyRenewal[index][key];
                    }
                }
            });
            return listPayrollMonthlyRenewal;
        };

        /**
         * Creates Complex grid rows for the response data & apply row Config
         * @param  {object} default row that will extended
         * @param  {array} response data from service
         * @return {object} this
         */
        model.buildGridData = function (defaultRow, data) {
            var dataRows = [];
            var mappers = [
                    "moveIns",
                    "percentMoveIns",
                    "commissionAmount",
                    "commissionTotal",
                    "additionalAmount",
                    "leasingCommissionTotal"
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
                    "moveIns",
                    "percentMoveIns",
                    "commissionAmount",
                    "commissionTotal",
                    "additionalAmount",
                    "leasingCommissionTotal"
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
        .factory("leasingCommMapperModel", ["leasingCommConstantModel", factory]);
})(angular);
