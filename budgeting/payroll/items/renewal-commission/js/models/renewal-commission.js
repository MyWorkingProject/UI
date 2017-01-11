//  renewalCommn Model

(function (angular) {
    "use strict";

    function factory(
        moment,
        renewalCommnConstant,
        renewalCommnContent,
        payrollItem,
        bmGrid,
        renewalCommnCalculation,
        renewalCommnValidation,
        renewalCommnMapper) {
        return function (gridConfig, payrollID, payrollRunType) {
            var model = payrollItem(),
                grid,
                isEdit,
                selectedRow,
                responseData,
                payloadData,
                rowConfig = renewalCommnConstant.getRowConfigs();

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
                 var listPayrollMonthlyRenewal = renewalCommnMapper.toJsonFromGrid(payrollID, 
                    payloadData, 
                    gridConfig.getColumns().getData(),
                    grid);
                 
                return {
                    renewalItem: {
                        listPayrollMonthlyRenewal: listPayrollMonthlyRenewal
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
                return renewalCommnCalculation.getRowTotal(column, row, rows);
            };

            model.getRenewalTotal = function (column, row, rows) {
                var gridRows = grid.getRowsBy({
                    groupID: row.getGroupID() - 1,
                    level: row.getLevel()
                });
                return renewalCommnCalculation.getRenewalTotal(column, gridRows);
            };

            model.getTotalByGroup = function (column, row, rows) {
                var refGroupID = row.getGroupID() - 1;
                return renewalCommnCalculation.getTotalByGroup(column, row, rows, refGroupID);
            };

            // Setters

            /**
             * Apply rounding on the column & recalculate the grid
             * @param  {columnModel} for current row
             * @param  {rowModel} current row
             * @return {object} this
             */
            model.updateGrid = function (column, row) {
                row.getData()[column.getKey()] = renewalCommnCalculation.round(parseFloat(row.getData()[column.getKey()]) || 0, 2);
                grid
                    .reCalculate()
                    .refresh();
                return model;
            };

            model.setSelectedRow = function (column, row) {
                selectedRow = row;
                return model;
            };

            model.setData = function (data) {
                gridConfig
                    .forEachColumn(renewalCommnMapper.resetData, [data]);
                responseData = angular.copy(data);
                payloadData = angular.copy(data);
                model.setRenewalCommnInfo()
                    .setGridData(data);
                return model;
            };

            /**
             * Revert all changes made in the grid
             * @return {object} this
             */
            model.rollback = function () {
                model.form.$setPristine();
                model.setRenewalCommnInfo()
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
            model.setRenewalCommnInfo = function () {
                model.renewalCommission = 0;
                model.leaseRenewalPercentage = 100;
                model.mtmCommission = 0;
                model.mtmRenewalPercentage = 100;
                model.commentCount = 0;

                return model;
            };

            /**
             * Set data to grid by mapping data from json
             * @param {object}
             */
            model.setGridData = function (data) {
                var defaultRow = gridConfig.getDefaultRow({}, 0),
                    dataRows = renewalCommnMapper.buildGridData(defaultRow, data);

                grid
                    .setData(dataRows)
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
                grid
                    .edit(flag)
                    .refresh();
                return model;
            };

            /**
             * Sets Hourly rate in grid
             * @return {object} this
             */
            model.setMonthlyRenewalCommn = function (config, value) {
                var rows = grid.getRowsBy({
                    level: config.level,
                    groupID: config.groupID,
                    rowID: config.rowID
                });
                grid
                    .updateDataColumnRows(rows, renewalCommnCalculation.round(value, 2))
                    .reCalculate()
                    .refresh();
                return model;
            };

            model.setLeaseRenewalPercentage = function (value) {
                model.setMonthlyRenewalCommn(rowConfig.percentOfRenewals, value);
                return model;
            };

            model.setRenewalCommission = function (value) {
                model.setMonthlyRenewalCommn(rowConfig.commissionAmount, value);
                return model;
            };

            model.setMtmRenewalPercentage = function (value) {
                model.setMonthlyRenewalCommn(rowConfig.mtmPercentOfRenewals, value);
                return model;
            };

            model.setMtmCommission = function (value) {
                model.setMonthlyRenewalCommn(rowConfig.mtmCommissionAmount, value);
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

            model.destroy = function () {
                grid.destroy();
                model = undefined;
            };

            return model.init();
        };
    }

    angular
        .module("budgeting")
        .factory("renewalCommnModel", [
            'moment',
            "renewalCommnConstantModel",
            'renewalCommnContentModel',
            'payrollItemModel',
            'bmGridModel',
            'renewalCommnCalculationModel',
            'renewalCommnValidationModel',
            'renewalCommnMapperModel',
            factory]);
})(angular);
