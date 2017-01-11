//  salary Model

(function (angular) {
    "use strict";

    function factory(
        bonusConstant,
        payrollItem,
        bmGrid,
        bmCalculator,
        bonusMapper) {
        return function (gridConfig) {
            var model = payrollItem(),
                grid,
                isEdit,
                payrollItemName,
                selectedRow,
                responseData,
                deleteBonusItems,
                payrollItemID,
                payrollID,
                commentCount = 0;

            model.init = function () {
                grid = model.grid = bmGrid();
                grid.setConfig(gridConfig);
                model.showAddNewBonus = false;
                return model;
            };

            model.getRowTotal = function (column, row, rows) {
                return bmCalculator.getRowTotal(column, row, rows);
            };

            model.getTotal = function (column, row, rows) {
                return bmCalculator.getTotalByGroup(column, row, rows, bonusConstant.rowConfig.bonus.groupID);
            };

            model.addNewBonusItem = function (rowID, index) {
                var dataRow = gridConfig.getDefaultRow(bonusConstant.rowConfig.bonus, 0);
                dataRow.rowID = rowID;
                dataRow.payrollItemID = payrollItemID;
                dataRow.payrollID = payrollID;
                model.showAddNewBonus = false;
                grid
                    .addRow(dataRow, index)
                    .reCalculate()
                    .refresh();
                return model;
            };

            model.addBonusItem = function (column, row) {
                var index = grid.findIndex(row.getGroupID(), row.getData().rowID);
                return model.addNewBonusItem(row.getData().rowID + 1, index + 1);
            };

            model.deleteBonusItem = function (column, row) {
                if (row.getData().payrollBonusID) {
                    deleteBonusItems.push(row.getData().payrollBonusID);
                }
                var index = grid.findIndex(row.getGroupID(), row.getData().rowID);
                grid
                    .removeRow(index)
                    .reCalculate()
                    .refresh();
                model.showAddNewBonus = !grid.hasRowsInGroup(row.getGroupID());
            };

            model.bonusPeriodChange = function (column, row) {
                row.getData()[column.getKey()] = parseFloat(row.getData()[column.getKey()]) || 0;
                grid
                    .reCalculate()
                    .refresh();
            };

            model.setData = function (_payrollID, _payrollItemID, itemName, data) {
                responseData = angular.copy(data);
                payrollItemName = itemName;
                payrollItemID = _payrollItemID;
                payrollID = _payrollID;
                return model.setGridData(data);
            };

            model.setGridData = function (data) {
                model.showAddNewBonus = data.length === 0;
                deleteBonusItems = [];
                selectedRow = undefined;
                var defaultRow = gridConfig.getDefaultRow({}, 0),
                    dataRows = bonusMapper.buildGridData(defaultRow, data, payrollItemName);
                grid
                    .setData(dataRows)
                    .reCalculate()
                    .refresh();

                return model;
            };

            model.edit = function (flag) {
                model.isEdit = flag;
                grid
                    .edit(flag);
                return model;
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

            model.setCommentCount = function (count) {
                model.commentCount = count;
            };

            model.setSelectedRow = function (column, row) {
                selectedRow = row;
                return model;
            };

            /**
             * Provide the selected row for calculator
             * @return {object} grid row data
             */
            model.getSelectedRow = function () {
                return selectedRow && selectedRow.getData();
            };

            /**
             * Revert all changes made in the grid
             * @return {object} this
             */
            model.rollback = function () {
                model.setGridData(responseData);
                return model;
            };

            model.save = function () {
                return {
                    bonusItems: {
                        bonusItem: [{
                            payrollBonusDelete: deleteBonusItems,
                            listPayrollBonusModel: bonusMapper.toJsonFromGrid(grid.getRows(), gridConfig.getColumns().getData())
                        }]
                    }
                };
            };

            model.validate = function () {
                return grid.reValidate().isValid();
            };

            model.isBonusNameEmpty = function (column, row, rows) {
                return row.getData()[column.key] === "";
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
        .factory("bonusModel", [
            'bonusConstantModel',
            'payrollItemModel',
            'bmGridModel',
            'bmGridCalculationModel',
            'bonusMapperModel',
            factory]);
})(angular);
