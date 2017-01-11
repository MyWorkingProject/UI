//  ha Model

(function (angular) {
    "use strict";

    function factory(
        $filter,
        moment,
        haConstant,
        haContent,
        payrollItem,
        bmGrid,
        haCalculation,
        haValidation,
        haMapper) {
        return function (gridConfig, formConfig, payrollByModel, incomeModel, payrollRunType, empStartDate, empEndDate) {
            var model = payrollItem(),
                grid,
                isEdit,
                applyType = true,
                selectedRates = [],
                //resonseRates = [],
                selectedRow,
                responseData,
                payloadData,
                rowConfig = haConstant.getRowConfigs();

            model.init = function () {
                model.rateOption = 0;
                model.criteriaOption = "Dollor";
                model.selectedMarketRent = "";
                model.incomeModel = incomeModel;
                model.allowance = 0;
                model.rateOptions = [];
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
                var marketRentType = payloadData.marketRentType,
                    payrollMonthlyHousing = payloadData.payrollMonthlyHousing;

                var listPayrollMonthlyHA = haMapper.toJsonFromGrid(payrollByModel.payrollID,
                    payrollMonthlyHousing,
                    gridConfig.getColumns().getData(),
                    grid);

                return {
                    payroll: angular.extend(payrollByModel.details, model.getPayrollByModelChanges()),
                    housingItems: {
                        listPayrollMonthlyHousing: listPayrollMonthlyHA
                    }
                };
            };

            model.getPayrollByModelChanges = function () {
                return {
                    housingMarketRentID: model.rateOption,
                    housingAllowanceType: model.criteriaOption
                };
            };

            /**
             * check validation on form
             * @return {bool} indicate form is valid or not
             */
            model.validate = function () {
                return model.isValid();
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

            /**
             * @param  {columnModel} for current row
             * @param  {rowModel} current row
             * @return {number} of ha rate based on payrollType & period date
             */
            model.getMonthlyHAByColumn = function (column, row) {
                var config = column.getConfig(),
                    rate = $filter('filter')(selectedRates, {
                        periodNo: config.period
                    }, true).first(),
                    monthlyHousing = $filter('filter')(payloadData.payrollMonthlyHousing, {
                        periodNo: config.period
                    }, true).first();
                monthlyHousing.unitTypeRent = rate.marketRent;
                return rate.marketRent;
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
                grid
                    .reCalculate()
                    .refresh();
                return model;
            };

            model.updateUnitType = function (data) {
                selectedRates = data.records;
                var rows = grid.getRowsByGroupID(rowConfig.unitTypeRent.groupID);
                grid
                    .updateDataColumnRows(rows, model.getMonthlyHAByColumn)
                    .reCalculate()
                    .refresh();

                return model.updateDescription();
            };

            model.updateDescription = function () {
                var unitTypeRow = grid.getRowsByGroupID(rowConfig.unitTypeRent.groupID).first(),
                    rateRow = grid.getRowsByGroupID(rowConfig.rate.groupID).first();

                if (incomeModel.toLowerCase() === 'none') {
                    unitTypeRow.show(false);
                }

                model.selectedMarketRent = formConfig.rateOptions.getOptionName(model.rateOption) || "";

                unitTypeRow.getData().itemDescription = haContent.marketRentByText + model.selectedMarketRent;
                rateRow.getData().itemDescription = model.criteriaOption === "Dollor" ? haContent.flatRateText : haContent.percentageText;

                return model;
            };

            model.setSelectedRow = function (column, row) {
                selectedRow = row;
                return model;
            };

            model.setData = function (data) {
                gridConfig
                    .forEachColumn(haMapper.resetData, [data.payrollMonthlyHousing, incomeModel]);
                responseData = angular.copy(data);
                payloadData = angular.copy(data);
                model.setHAInfo(data.marketRentType)
                    .setGridData(data.payrollMonthlyHousing);
                return model;
            };

            /**
             * Revert all changes made in the grid
             * @return {object} this
             */
            model.rollback = function () {
                model.form.$setPristine();
                model.setHAInfo(responseData.marketRentType)
                    .setGridData(responseData.payrollMonthlyHousing);
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
            model.setHAInfo = function (haInfo) {
                model.rateOption = payrollByModel.details.housingMarketRentID;
                model.criteriaOption = payrollByModel.details.housingAllowanceType;
                model.allowance = 0;
                formConfig.rateOptions.setOptions(haInfo);
                return model;
            };

            /**
             * Set data to grid by mapping data from json
             * @param {object}
             */
            model.setGridData = function (data) {
                var defaultRow = gridConfig.getDefaultRow({}, 0),
                    dataRows = haMapper.buildGridData(defaultRow, data);

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

            model.titleCase = function (str) {
                str = str.toLowerCase().split(' ');
                for (var i = 0; i < str.length; i++) {
                    str[i] = str[i].ucfirst();
                }
                return str.join(' ');
            };

            /**
             * Sets Hourly rate in grid
             * @return {object} this
             */
            model.setMonthlyHA = function () {
                var rateRow = grid.getRowsByGroupID(rowConfig.rate.groupID);
                grid
                    .updateDataColumnRows(rateRow, model.allowance)
                    .reCalculate()
                    .refresh();
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

            model.getApplyType = function () {
                return model.criteriaOption === "Dollor";
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
        .factory("haModel", [
            '$filter',
            'moment',
            "haConstantModel",
            'haContentModel',
            'payrollItemModel',
            'bmGridModel',
            'haCalculationModel',
            'haValidationModel',
            'haMapperModel',
            factory]);
})(angular);
