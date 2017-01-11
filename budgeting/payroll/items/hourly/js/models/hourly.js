//  hourly Model

(function (angular) {
    "use strict";

    function factory(
        moment,
        hourlyConstant,
        hourlyContent,
        payrollItem,
        bmGrid,
        hourlyCalculation,
        hourlyValidation,
        hourlyMapper) {
        return function (gridConfig, payrollID, payrollRunType) {
            var model = payrollItem(),
                grid,
                isEdit,
                isValid,
                selectedRow,
                responseData,
                payloadData,
                rowConfig = hourlyConstant.getRowConfigs();

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
                var payrollHourlyPay = payloadData.payrollHourlyPay,
                    payrollMonthlyHourlyPay = payloadData.payrollMonthlyHourlyPay;

                payrollHourlyPay.beginningRate = model.beginningHourlyRate;
                payrollHourlyPay.increaseDate = model.dateOfIncrease.toDate();
                payrollHourlyPay.increasePercent = model.increasePercentage;
                payrollHourlyPay.increaseAmount = model.increaseCurrency;
                payrollHourlyPay.endingRate = model.endingHourlyRate;
                payrollHourlyPay.weeklyRegularHours = model.regularHoursPerWeek;
                payrollHourlyPay.weeklyOvertimeHours = model.overtimeHoursPerWeek;

                var listPayrollMonthlyHourlyPay = hourlyMapper.toJsonFromGrid(payrollID,
                    payrollMonthlyHourlyPay,
                    gridConfig.getColumns().getData(),
                    grid);
                
                return {
                    hourlyPayItem: {
                        payrollHourlyPay: payrollHourlyPay,
                        listPayrollMonthlyHourlyPay: listPayrollMonthlyHourlyPay
                    }
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
             * Checks if begining salary & percentage are valid
             * @param  {Number} value 
             * @return {Boolean}       
             */
            model.chkIncreasePercentage = function (value) {
                return hourlyValidation.chkIsNumber(value) && hourlyValidation.chkIsNumber(model.increasePercentage);
            };

            /**
             * Checks if begining salary & any other are valid
             * @param  {Number} value 
             * @return {Boolean}       
             */
            model.chkBeginningHourlyRate = function (value) {
                return hourlyValidation.chkIsNumber(value) && hourlyValidation.chkIsNumber(model.beginningHourlyRate);
            };

            /**
             * @return {object} of grid row
             */
            model.getSelectedRow = function () {
                return selectedRow && selectedRow.getData();
            };

            /**
             * @param  {columnModel} for current row
             * @param  {rowModel} current row
             * @return {number} of hourly rate based on payrollType & period date
             */
            model.getHourlyRateByColumn = function (column, row) {
                var increaseDate = new Date(model.dateOfIncrease),
                    config = column.getConfig(),
                    periodStartDate = new Date(config.year, config.month, 1),
                    periodEndDate = new Date(config.year, config.month + 1, 1),
                    hourlyRate = 0;

                periodEndDate.setDate(periodEndDate.getDate() - 1);

                if (periodEndDate < increaseDate) {
                    hourlyRate = model.beginningHourlyRate;
                }
                else if (periodStartDate > increaseDate) {
                    hourlyRate = model.endingHourlyRate;
                }
                else {
                    switch (payrollRunType) {
                    case "Monthly":
                        hourlyRate = hourlyCalculation.getMonthlyHourlyRate(increaseDate,
                            model.beginningHourlyRate,
                            model.endingHourlyRate);
                        break;
                    case "Semi-monthly":
                        hourlyRate = hourlyCalculation.getSemiMonthlyHourlyRate(increaseDate,
                            model.beginningHourlyRate,
                            model.endingHourlyRate);
                        break;
                    case "Bi-weekly":
                        var payrollRunRow = grid.getRowsByGroupID(rowConfig.noOfPayRuns.groupID).first();
                        var noOfPayRuns = payrollRunRow.getData()[column.getKey()];
                        if (increaseDate.getDate() <= 10) {
                            hourlyRate = model.endingHourlyRate;
                        }
                        else if (increaseDate.getDate() <= 20) {
                            hourlyRate = noOfPayRuns !== 2 ?
                                model.endingHourlyRate :
                                hourlyCalculation.getWeeklyHourlyRate(
                                    model.beginningHourlyRate, 1,
                                    model.endingHourlyRate, 2,
                                    noOfPayRuns);
                        }
                        else {
                            hourlyRate = noOfPayRuns !== 2 ?
                                model.beginningHourlyRate :
                                hourlyCalculation.getWeeklyHourlyRate(
                                    model.beginningHourlyRate, 2,
                                    model.endingHourlyRate, 1,
                                    noOfPayRuns);
                        }
                        break;
                    case "Weekly":
                        if (increaseDate.getDate() <= 6) {
                            hourlyRate = model.endingHourlyRate;
                        }
                        else if (increaseDate.getDate() <= 13) {
                            hourlyRate = hourlyCalculation.getWeeklyHourlyRate(
                                model.beginningHourlyRate, 1,
                                model.endingHourlyRate, noOfPayRuns - 1,
                                noOfPayRuns);
                        }
                        else if (increaseDate.getDate() <= 20) {
                            hourlyRate = hourlyCalculation.getWeeklyHourlyRate(
                                model.beginningHourlyRate, 2,
                                model.endingHourlyRate, noOfPayRuns - 2,
                                noOfPayRuns);
                        }
                        else if (increaseDate.getDate() <= 27) {
                            hourlyRate = hourlyCalculation.getWeeklyHourlyRate(
                                model.beginningHourlyRate, 3,
                                model.endingHourlyRate, noOfPayRuns - 3,
                                noOfPayRuns);
                        }
                        else {
                            hourlyRate = model.beginningHourlyRate;
                        }
                        break;
                    }
                }
                return hourlyCalculation.getRoundedValueByGroupID(row.getGroupID(), hourlyRate);
            };

            // Setters

            /**
             * Apply rounding on the column & recalculate the grid
             * @param  {columnModel} for current row
             * @param  {rowModel} current row
             * @return {object} this
             */
            model.updateGrid = function (column, row) {
                row.getData()[column.getKey()] = hourlyCalculation.getRoundedValueByGroupID(row.getGroupID(), row.getData()[column.getKey()]);
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
                var startDate = new Date(data.payrollHourlyPay.payrollStartDate);
                gridConfig
                    .forEachColumn(hourlyMapper.resetData, [data.payrollMonthlyHourlyPay]);
                responseData = angular.copy(data);
                payloadData = angular.copy(data);
                model.setHourlyInfo(data.payrollHourlyPay)
                    .setGridData(data.payrollMonthlyHourlyPay);
                return model;
            };

            /**
             * Revert all changes made in the grid
             * @return {object} this
             */
            model.rollback = function () {
                model.form.$setPristine();
                model.setHourlyInfo(responseData.payrollHourlyPay)
                    .setGridData(responseData.payrollMonthlyHourlyPay);
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
            model.setHourlyInfo = function (hourlyInfo) {
                model.beginningHourlyRate = hourlyInfo.beginningRate;
                model.dateOfIncrease = moment(new Date(hourlyInfo.increaseDate));
                model.increasePercentage = hourlyInfo.increasePercent;
                model.increaseCurrency = hourlyInfo.increaseAmount;
                model.endingHourlyRate = hourlyInfo.endingRate;
                model.regularHoursPerWeek = hourlyInfo.weeklyRegularHours;
                model.overtimeHoursPerWeek = hourlyInfo.weeklyOvertimeHours;
                return model;
            };

            /**
             * Set data to grid by mapping data from json
             * @param {object}
             */
            model.setGridData = function (data) {
                var defaultRow = gridConfig.getDefaultRow({}, 0),
                    dataRows = hourlyMapper.buildGridData(defaultRow, data);
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
             * Set editable grid columns with value
             * @param  {object} hourly contant config
             * @param  {number} number for setting grid & applying decimal validation
             * @return {number} after applying validations
             */
            model.updateRows = function (config, value) {
                value = hourlyCalculation.getRoundedValueByGroupID(config.groupID, value);
                var rows = grid
                    .getRowsByGroupIDAndLevel(config.groupID, config.level);
                grid
                    .updateDataColumnRows(rows, value)
                    .reCalculate()
                    .refresh();
                return value;
            };

            /**
             * @param {number} update grid on regular working hours
             */
            model.setRegularHoursPerWeek = function (value) {
                model.regularHoursPerWeek = model.updateRows(rowConfig.weeklyHoursWorked, value);
            };

            /**
             * @param {number} update grid on overtime working hours
             */
            model.setOvertimeHoursPerWeek = function (value) {
                model.overtimeHoursPerWeek = model.updateRows(rowConfig.weeklyOvertimeHoursWorked, value);
            };

            /**
             * Sets Hourly rate in grid
             * @return {object} this
             */
            model.setHourlyRates = function () {
                var config = rowConfig.hourlyRate,
                    rows = grid.getRowsByGroupIDAndLevel(config.groupID, config.level);
                grid
                    .updateDataColumnRows(rows, model.getHourlyRateByColumn)
                    .reCalculate()
                    .refresh();
                return model;
            };

            model.setBeginningHourlyRate = function (value) {
                model.increaseCurrency = hourlyCalculation.applyPercentage(model.increasePercentage, value);
                model.endingHourlyRate = hourlyCalculation.sum(model.increaseCurrency, value);
                return model;
            };

            model.setIncreasePercentage = function (value) {
                model.increaseCurrency = hourlyCalculation.applyPercentage(value, model.beginningHourlyRate);
                model.endingHourlyRate = hourlyCalculation.sum(model.increaseCurrency, model.beginningHourlyRate);
                return model;
            };

            model.setIncreaseCurrency = function (value) {
                model.endingHourlyRate = hourlyCalculation.sum(value, model.beginningHourlyRate);
                model.increasePercentage = hourlyCalculation.getPercentage(model.beginningHourlyRate, model.increaseCurrency);
                return model;
            };

            model.setEndingHourlyRate = function (value) {
                model.increaseCurrency = hourlyCalculation.substract(value, model.beginningHourlyRate);
                model.increasePercentage = hourlyCalculation.getPercentage(model.beginningHourlyRate, model.increaseCurrency);
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
        .factory("hourlyModel", [
            'moment',
            'hourlyConstantModel',
            'hourlyContentModel',
            'payrollItemModel',
            'bmGridModel',
            'hourlyCalculationModel',
            'hourlyValidationModel',
            'hourlyMapperModel',
            factory]);
})(angular);
