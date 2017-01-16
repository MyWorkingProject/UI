//  salary Model

(function (angular) {
    "use strict";

    function factory(
        moment,
        amountConstantModel,
        bmGrid
       ) {
        return function (gridConfig) {
            var model = {}, selectedRow,
                grid,
                rowConfig = amountConstantModel.getRowConfigs();
            model.init = function () {
                grid = model.grid = bmGrid()
                    .setConfig(gridConfig);
                return model;
            };

            /**
             * Provide the selected row for calculator
             * @return {object} grid row data
             */
            model.getSelectedRow = function () {
                return selectedRow && selectedRow.getData();
            };

            model.setSelectedRow = function (column, row) {
                selectedRow = row;
                return model;
            };

            model.reSetData = function (data) {
                grid.setData(data.records).reCalculate()
                    .refresh();
                return model;
            };

            model.updateDefaultRow = function(column, row, rows){
                row.getData()[column.getKey()] = parseFloat(row.getData()[column.getKey()]) || 0;
                return model;
            };
            
            model.setData = function (data) {
                var defaultRow = gridConfig.getDefaultRow({}, 0),
                dataRows = model.mapperGridData(defaultRow, data);

                grid.setData(dataRows).reCalculate()
                    .refresh();
                return model;
            };

            model.mapperGridData = function (defaultRow, data) {
                var dataRows = [];
                var key = 'amount',
                columns = amountConstantModel.getColumns(),
                dataRow = angular.extend({}, defaultRow, rowConfig[key]);
                data.forEach(function (item) {
                    dataRow[columns.period.key + item.periodNo] = item[key] || 0;
                });
                dataRows.push(dataRow);
                logc(JSON.stringify(dataRows));
                return dataRows;
            };

            model.getAllacationPerriods = function () {
                var listOfMonthlyAmounts = [];
                var row = grid.getRows().first();
                gridConfig.getColumns().getData().forEach(function (column) {
                    if (column.isDataColumn) {
                        listOfMonthlyAmounts.push({
                            "allocationID": 0,
                            "periodNo": column.period,
                            "percentage": 8.33,
                            "amount": row.getData()[column.key]
                        });
                    }
                });
                return listOfMonthlyAmounts;
            };

            model.applyCalculatorChanges = function (calculatedData) {
                if (!calculatedData) {
                    return;
                }
                grid
                    .updateDataColumnRows([selectedRow], calculatedData.resultsGrid)
                    .reCalculate()
                    .refresh();
            };
            return model.init();
        };
    }

    angular
        .module("budgeting")
        .factory("amountModel", [
            'moment',
            "amountConstantModel",
            'bmGridModel',
            factory]);
})(angular);
