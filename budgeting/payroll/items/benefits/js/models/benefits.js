//  salary Model

(function (angular) {
    "use strict";

    function factory(
        $filter,
        payrollItem,
        bmGrid,
        bmCalculator,
        benefitsConstant,
        benefitsMapper) {
        return function (gridConfig) {
            var model = payrollItem(),
                grid,
                isEdit,
                responseData,
                deleteBenefitsItems,
                payrollItemID,
                payrollID,
                commentCount = 0,
                showAddNewBenefits = false,
                benefitOptions = [];

            model.init = function () {
                grid = model.grid = bmGrid();
                grid.setConfig(gridConfig);

                return model;
            };

            model.getRowTotal = function (column, row, rows) {
                return bmCalculator.getRowTotal(column, row, rows);
            };

            model.getTotal = function (column, row, rows) {
                return bmCalculator.getTotalByGroup(column, row, rows, benefitsConstant.rowConfig.benefits.groupID);
            };

            model.addNewBenefitsItem = function (rowID, index) {
                var dataRow = gridConfig.getDefaultRow(benefitsConstant.rowConfig.benefits, 0);
                dataRow.rowID = rowID;
                dataRow.payrollItemID = payrollItemID;
                dataRow.payrollID = payrollID;
                model.showAddNewBenefits = false;

                grid
                    .addRow(dataRow, index)
                    .reCalculate()
                    .refresh();
            };

            model.addBenefitsItem = function (column, row) {
                var index = grid.findIndex(row.getGroupID(), row.getData().rowID);
                return model.addNewBenefitsItem(row.getData().rowID + 1, index + 1);
            };

            model.deleteBenefitsItem = function (column, row) {
                if (row.getData().benefitDataID) {
                    deleteBenefitsItems.push(row.getData().benefitDataID);
                }
                var index = grid.findIndex(row.getGroupID(), row.getData().rowID);
                grid
                    .removeRow(index)
                    .reCalculate()
                    .refresh();
                model.showAddNewBenefits = !grid.hasRowsInGroup(row.getGroupID());
            };

            model.prepareBenefitsOptions = function (data) {
                var benefitsOptions = [];
                angular.forEach(data, function (item) {
                    var options = {
                        text: item.benefitName,
                        value: item.benefitName
                    };
                    benefitsOptions.push(options);
                });
                model.benefitOptions = benefitsOptions;

                return model;
            };

            model.updateBenefitRow = function (column, row) {
                var dataRow = row.getData();
                var rowObj = $filter('filter')(responseData, {
                    benefitName: dataRow.benefitName
                }, true).first();
                grid
                    .updateDataColumnRows([row], rowObj)
                    .reCalculate()
                    .refresh();

            };

            model.getBenefitsOptions = function () {
                return model.benefitOptions;
            };

            model.setData = function (_payrollID, _payrollItemID, data) {
                gridConfig
                    .forEachColumn(benefitsMapper.resetData, [data]);
                responseData = angular.copy(data);
                payrollItemID = _payrollItemID;
                payrollID = _payrollID;
                return model.setGridData(data);
            };

            model.setCommentCount = function (count) {
                model.commentCount = count;
            };

            model.setGridData = function (data) {
                deleteBenefitsItems = [];
                var defaultRow = gridConfig.getDefaultRow({}, 0),
                    dataRows = benefitsMapper.buildGridData(defaultRow, $filter('filter')(data, {
                        isSelected: true
                    }, true));
                model.showAddNewBenefits = dataRows.length - 1 === 0;
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

            model.save = function () {
                return {
                    benefitItem: {
                        payrollBenefitDelete: deleteBenefitsItems,
                        listPayrollBenefitModel: benefitsMapper.toJsonFromGrid(grid.getRows(), gridConfig.getColumns().getData())
                    }
                };
            };

            model.validate = function () {
                return grid.reValidate().isValid();
            };

            model.chkUniqueBenefit = function (column, row, rows) {
                for (var i = 0; i < rows.length - 1; i++) {
                    for (var j = i + 1; j < rows.length - 1; j++) {
                        if (rows[j].benefitName == rows[i].benefitName) {
                            return false;
                        }
                    }
                }
                return true;
            };

            /**
             * Revert all changes made in the grid
             * @return {object} this
             */
            model.rollback = function () {
                model.setGridData(responseData);
                return model;
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
        .factory("benefitsModel", [
             '$filter',
            'payrollItemModel',
            'bmGridModel',
            'bmGridCalculationModel',
            'benefitsConstantModel',
            'benefitsMapperModel',
            factory]);
})(angular);
