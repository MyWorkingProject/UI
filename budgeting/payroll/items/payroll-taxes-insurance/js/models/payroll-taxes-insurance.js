//  Calculation Model

(function (angular) {
    "use strict";

    function factory(
        $filter,
        taxesInsuranceConstant,
        taxesInsuranceContent,
        payrollItem,
        bmGrid,
        bmCalculator,
        taxInsuranceMapper) {
        return function (gridConfig) {
            var model = payrollItem(),
                grid,
                isEdit,
                payrollItemID,
                payrollID,
                commentCount = 0,
                showAddNewTax,
                responseData,
                payLoadData,
                monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

            model.init = function () {
                model.cumCom = '';
                model.taxCapMonth = '';
                model.cumComDetails = '';
                model.hasCumulativeCompensation = false;
                grid = model.grid = bmGrid();
                grid.setConfig(gridConfig);
                return model;
            };

            model.save = function (budgetModelDetails, payrollModelDetails) {
                return {
                    taxesItem: {
                        taxesModel: taxInsuranceMapper.toJsonFromGrid(payrollID, payLoadData, gridConfig.getColumns().getData())
                    }
                };
            };

            model.validate = function () {
                return true;
            };

            // Setters
            model.setData = function (_payrollID, _payrollItemID, data) {
                var defaultRow = gridConfig.getDefaultRow({}, 0);

                gridConfig
                    .forEachColumn(taxInsuranceMapper.resetData, [data]);
                data = taxInsuranceMapper.buildGridData(defaultRow, data);
                responseData = angular.copy(data);
                payLoadData = data;
                payrollItemID = _payrollItemID;
                payrollID = _payrollID;

                return model.setGridData(data);
            };

            model.setCommentCount = function (count) {
                model.commentCount = count;
            };

            model.setGridData = function (data) {
                var dataRows = $filter('filter')(data, {
                    taxExempt: false
                }, true);
                model.showAddNewTax = dataRows.length - 1 === 0;

                grid
                    .setData(dataRows)
                    .reCalculate()
                    .refresh();

                return model;
            };

            model.rollback = function () {
                return model.setGridData(responseData);
            };

            model.addNewPayrollTaxInsurance = function (item, rowID, index) {
                item.rowID = rowID;
                item.taxExempt = false;
                model.showAddNewTax = false;
                grid
                    .addRow(item, index)
                    .reCalculate()
                    .refresh();
            };

            model.addPayrollTaxInsurance = function (column, row, item) {
                var index = grid.findIndex(row.getGroupID(), row.getData().rowID);
                return model.addNewPayrollTaxInsurance(item, row.getData().rowID + 1, index + 1);
            };

            model.removePayrollTaxInsurance = function (column, row) {
                var index = grid.findIndex(row.getGroupID(), row.getData().rowID);
                row.getData().taxExempt = true;
                var item = $filter('filter')(payLoadData, {
                    dataTypeDisplay: row.getData().dataTypeDisplay
                }, true).first();
                if (item) {
                    item.taxExempt = true;
                }
                grid
                    .removeRow(index)
                    .reCalculate()
                    .refresh();
                model.showAddNewTax = !grid.hasRowsInGroup(row.getGroupID());
            };

            model.getRowTotal = function (column, row, rows) {
                return bmCalculator.getRowTotal(column, row, rows);
            };

            model.getTotalByGroup = function (column, row, rows) {
                return bmCalculator.getTotalByGroup(column, row, rows, taxesInsuranceConstant.rowConfig.taxExempted.groupID);
            };

            model.getNonExemptedItems = function () {
                return $filter('filter')(payLoadData, {
                    groupID: taxesInsuranceConstant.rowConfig.taxExempted.groupID,
                    taxExempt: true
                }, true);
            };

            model.edit = function (flag) {
                model.isEdit = flag;
                grid
                    .edit(flag)
                    .refresh();
                return model;
            };

            model.setCumulativeCompensation = function (capEffectiveMonth, budgetStartMonth, budgetStartYear, noOfPeriods) {
                var budgetEndDate = new Date(budgetStartYear, budgetStartMonth, 1);
                budgetEndDate.setMonth(noOfPeriods - 1);

                model.hasCumulativeCompensation = capEffectiveMonth !== budgetStartMonth;
                model.taxCapMonth = monthNames[capEffectiveMonth - 1];
                model.cumComDetails = monthNames[capEffectiveMonth - 1].substring(0, 3) +
                    " " +
                    budgetStartYear +
                    " to " +
                    monthNames[budgetEndDate.getMonth()].substring(0, 3) +
                    " " +
                    budgetEndDate.getFullYear();
            };

            model.setCaluculatedTax = function (response) {
                model.setData(response);
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
        .factory("taxInsuranceModel", [
            '$filter',
            'taxInsuranceConstantModel',
            'taxInsuranceContentModel',
            'payrollItemModel',
            'bmGridModel',
            'bmGridCalculationModel',
            'taxInsuranceMapperModel',
            factory]);
})(angular);
