//  Leasing Commission Model

(function (angular) {
    "use strict";

    function factory(
        moment,
        leasingCommConstant,
        leasingCommContent,
        payrollItem,
        bmGrid,
        leasingCommCalculation,
        leasingCommValidation,
        leasingCommMapper) {
        return function (gridConfig, payrollID, payrollRunType) {
            var model = payrollItem(),
                grid,
                isEdit,
                selectedRow,
                responseData,
                payloadData,
                rowConfig = leasingCommConstant.getRowConfigs();

            model.init = function () {
                grid = model.grid = bmGrid()
                    .setConfig(gridConfig);
                return model;
            };

            // Getters

            /**
             * This will return json object for saving
             * @return {object} of json to be saved
             */
            model.save = function () {
                var listPayrollMonthlyLeasing = leasingCommMapper.toJsonFromGrid(payrollID, 
                    payloadData, 
                    gridConfig.getColumns().getData(),
                    grid);
                 
                return {
                    leasingItem: {
                        listPayrollMonthlyLeasing: listPayrollMonthlyLeasing
                    }
                };
            };

            /**
             * check validation on form
             * @return {bool} indicate form is valid or not
             */
            model.validate = function () {
                return true;
            };

            /**
             * Get whether form is valid or not
             * @return {Boolean}
             */
            model.isValid = function () {
                return model.form.$valid;
            };

            /**
             * Provide the selected row for calculator
             * @return {object} grid row data
             */
            model.getSelectedRow = function () {
                return selectedRow && selectedRow.getData();
            };

            model.getRowTotal = function (column, row, rows) {
                return leasingCommCalculation.getRowTotal(column, row, rows);
            };

            model.getCommissionTotal = function (column, row, rows) {
                var gridRows = grid.getRowsBy({
                    groupID: row.getGroupID() - 1,
                    level: row.getLevel()
                });
                return leasingCommCalculation.getCommissionTotal(column, gridRows);
            };

            model.getTotalByGroup = function (column, row, rows) {
                var refGroupID = row.getGroupID() - 1;
                return leasingCommCalculation.getTotalByGroup(column, row, rows, refGroupID);
            };

            // Setters

            /**
             * Apply rounding on the column & recalculate the grid
             * @param  {columnModel} for current row
             * @param  {rowModel} current row
             * @return {object} this
             */
            model.updateGrid = function (column, row) {
                row.getData()[column.getKey()] = parseFloat(row.getData()[column.getKey()]) || 0;
                grid.reCalculate()
                    .refresh();
                return model;
            };

            model.setSelectedRow = function (column, row) {
                selectedRow = row;
                return model;
            };

            model.setData = function (data) {
                gridConfig.forEachColumn(leasingCommMapper.resetData, [data]);
                responseData = angular.copy(data);
                payloadData = angular.copy(data);
                model.setLeasingCommInfo()
                    .setGridData(data);
                return model;
            };

            /**
             * Revert all changes made in the grid
             * @return {object} this
             */
            model.rollback = function () {
                model.form.$setPristine();
                model.setLeasingCommInfo()
                    .setGridData(responseData);
                return model;
            };

            /**
             * Restore the data on the model
             * @return {object} this
             */
            model.restore = function () {
                responseData = angular.copy(payloadData);
                return model;
            };

            /** 
             * Set model form details
             * @param {object}
             */
            model.setLeasingCommInfo = function () {
                model.moveInsPercentage = "100.00";
                model.commissionAmounts = "0.00";

                return model;
            };

            /**
             * Set data to grid by mapping data from json
             * @param {object}
             */
            model.setGridData = function (data) {
                var defaultRow = gridConfig.getDefaultRow({}, 0),
                    dataRows = leasingCommMapper.buildGridData(defaultRow, data);

                grid.setData(dataRows)
                    .reCalculate()
                    .refresh();

                return model;
            };

            /**
             * Sets grid & form in editable state
             * @param  {bool}
             * @return {object}
             */
            model.edit = function (flag) {
                if (flag) {
                    model.form.$setSubmitted();
                }
                model.isEdit = flag;
                selectedRow = undefined;
                grid.edit(flag)
                    .refresh();
                return model;
            };

            model.setMonthlyLeasingComm = function (config, value) {
                var rows = grid.getRowsBy({
                    level: config.level,
                    groupID: config.groupID,
                    rowID: config.rowID
                });

                value = leasingCommCalculation.getRoundedString(value, 2);
                grid.updateDataColumnRows(rows, value)
                    .reCalculate()
                    .refresh();
                return model;
            };

            model.setMoveinsPercentage = function (value) {
                model.moveInsPercentage = leasingCommCalculation.getRoundedString(value, 2);
                model.setMonthlyLeasingComm(rowConfig.percentMoveIns, value);
                return model;
            };

            model.setCommissionAmt = function (value) {
                model.commissionAmounts = leasingCommCalculation.getRoundedString(value, 2);
                model.setMonthlyLeasingComm(rowConfig.commissionAmount, value);
                return model;
            };

            model.applyCalculatorChanges = function (calculatedData) {
                if (!calculatedData) {
                    return;
                }
                grid.updateDataColumnRows([selectedRow], calculatedData.resultsGrid)
                    .reCalculate()
                    .refresh();
            };
            model.setCommentCount = function (count) {
                model.commentCount = count;
            };
            model.destroy = function () {
                grid.destroy();
                model = undefined;
            };

            return model.init();
        };
    }

    angular
        .module("budgeting")
        .factory("leasingCommModel", [
            "moment",
            "leasingCommConstantModel",
            "leasingComContentModel",
            "payrollItemModel",
            "bmGridModel",
            "leasingCommCalculationModel",
            "leasingCommValidationModel",
            "leasingCommMapperModel",
            factory]);
})(angular);
