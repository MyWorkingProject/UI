//  salary Model

(function (angular) {
    "use strict";

    function factory(
        moment,
        salaryConstant,
        salaryContent,
        payrollItem,
        bmGrid,
        salaryCalculation,
        salaryValidation,
        salaryMapper) {
        return function (gridConfig, payrollID, payrollRunType, empStartDate, empEndDate) {
            var model = payrollItem(),
                grid,
                isEdit,
                selectedRow,
                responseData,
                payloadData,
                rowConfig = salaryConstant.getRowConfigs();

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
                var payrollSalary = payloadData.payrollSalary,
                    payrollMonthlySalary = payloadData.payrollMonthlySalary;

                payrollSalary.beginningSalary = model.beginningSalaryRate;
                payrollSalary.increaseDate = model.dateOfIncrease.toDate();
                payrollSalary.increasePercent = model.increasePercentage;
                payrollSalary.increaseAmount = model.increaseCurrency;
                payrollSalary.endingSalary = model.endingSalaryRate;

                var listPayrollMonthlySalary = salaryMapper.toJsonFromGrid(payrollID, 
                    payrollMonthlySalary, 
                    gridConfig.getColumns().getData(),
                    grid);
                
                return {
                    salaryItem: {
                        payrollSalary: payrollSalary,
                        listPayrollMonthlySalary: listPayrollMonthlySalary
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
                return salaryValidation.chkIsNumber(value) && salaryValidation.chkIsNumber(model.increasePercentage);
            };

            /**
             * Checks if begining salary & any other are valid
             * @param  {Number} value 
             * @return {Boolean}       
             */
            model.chkBeginningSalary = function (value) {
                return salaryValidation.chkIsNumber(value) && salaryValidation.chkIsNumber(model.beginningSalaryRate);
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
             * @return {number} of salary rate based on payrollType & period date
             */
            model.getMonthlySalaryByColumn = function () {
                var config = rowConfig.monthlySalary,
                    rows = grid.getRowsByGroupIDAndLevel(config.groupID, config.level);
                var payrollIncreaseDate = new Date(model.dateOfIncrease);
                var partialSalaryInNextPeriod = false;
                var noOfDaysInNextPeriod = 0;
                var payrollRunRow = grid.getRowsByGroupID(rowConfig.noOfPayRuns.groupID).first();

                rows
                    .forEach(function (row) {
                        row.columns.forEach(function (column) {
                            if (column.isDataColumn() && column.getConfig().isEditable) {
                                var config = column.getConfig(),
                                    periodStartDate = new Date(config.year, config.month, 1),
                                    periodEndDate = new Date(config.year, config.month + 1, 1),
                                    salaryPerDay = 0,
                                    periodSalary = 0,
                                    payrollStartDate = new Date(model.payrollStartDate),
                                    firstPayrunDay = payrollStartDate.getDate(),
                                    partialSalaryCalculated = false;

                                var noOfPayRuns = payrollRunRow.getData()[column.getKey()];
                                var annualPayrunCount = payrollRunRow.getData().total;

                                periodEndDate.setDate(periodEndDate.getDate() - 1);

                                if (periodEndDate < payrollIncreaseDate) {
                                    salaryPerDay = model.beginningSalaryRate / 365;
                                }
                                else if (periodStartDate > payrollIncreaseDate) {
                                    salaryPerDay = model.endingSalaryRate / 365;
                                }

                                if (empStartDate >= periodStartDate && empStartDate <= periodEndDate) {
                                    var beforeJoiningPayruns = 0;
                                    //Calculate Number of payruns before employee joining
                                    while (payrollStartDate <= periodEndDate) {
                                        if (payrollStartDate >= periodStartDate && payrollStartDate <= periodEndDate) {
                                            if (payrollStartDate < empStartDate) {
                                                beforeJoiningPayruns++;
                                            }
                                            else {
                                                periodSalary = (salaryCalculation.getDaysBetweenDates(empStartDate, payrollStartDate) + 1) * salaryPerDay;
                                                partialSalaryCalculated = true;
                                                break;
                                            }
                                        }
                                        switch (payrollRunType) {
                                        case "Monthly":
                                            payrollStartDate.setMonth(payrollStartDate.getMonth() + 1);
                                            break;
                                        case "Semi-monthly":
                                            if (payrollStartDate.getDate() == firstPayrunDay) {
                                                payrollStartDate.setDate(payrollStartDate.getDate() + 14);
                                            }
                                            else {
                                                payrollStartDate.setDate(payrollStartDate.getDate() - 14);
                                                payrollStartDate.setMonth(payrollStartDate.getMonth() + 1);
                                            }
                                            break;
                                        case "Bi-weekly":
                                            payrollStartDate.setDate(payrollStartDate.getDate() + 14);
                                            break;
                                        case "Weekly":
                                            payrollStartDate.setDate(payrollStartDate.getDate() + 7);
                                            break;
                                        }
                                    }
                                    if (partialSalaryCalculated) {
                                        periodSalary = periodSalary + (model.beginningSalaryRate * (noOfPayRuns - (beforeJoiningPayruns + 1))) / annualPayrunCount;
                                    }
                                    else {
                                        partialSalaryInNextPeriod = true;
                                        noOfDaysInNextPeriod = (salaryCalculation.getDaysBetweenDates(empStartDate, payrollStartDate)) + 1;
                                    }
                                }
                                else if (empEndDate !== null && empEndDate >= periodStartDate && empEndDate <= periodEndDate) {
                                    //Employee End date is in the current month
                                    var beforeEndDatePayruns = 0;
                                    var lastPayRunDate = new Date(payrollStartDate.getYear(), payrollStartDate.getMonth(), payrollStartDate.getDate(), 0);
                                    //Calculate Number of payruns before employee End date
                                    while (payrollStartDate <= periodEndDate) {
                                        if (payrollStartDate >= periodStartDate && payrollStartDate <= periodEndDate) {
                                            if (payrollStartDate <= empEndDate) {
                                                beforeEndDatePayruns++;
                                            }
                                            else {
                                                periodSalary = ((salaryCalculation.getDaysBetweenDates(lastPayRunDate, empEndDate))) * salaryPerDay;
                                                partialSalaryCalculated = true;
                                                break;
                                            }
                                        }
                                        lastPayRunDate = new Date(payrollStartDate.getYear(), payrollStartDate.getMonth(), payrollStartDate.getDate(), 0);
                                        switch (payrollRunType) {
                                        case "Monthly":
                                            payrollStartDate.setMonth(payrollStartDate.getMonth() + 1);
                                            break;
                                        case "Semi-monthly":
                                            if (payrollStartDate.getDate() == firstPayrunDay) {
                                                payrollStartDate.setDate(payrollStartDate.getDate() + 14);
                                            }
                                            else {
                                                payrollStartDate.setDate(payrollStartDate.getDate() - 14);
                                                payrollStartDate.setMonth(payrollStartDate.getMonth() + 1);
                                            }
                                            break;
                                        case "Bi-weekly":
                                            payrollStartDate.setDate(payrollStartDate.getDate() + 14);
                                            break;
                                        case "Weekly":
                                            payrollStartDate.setDate(payrollStartDate.getDate() + 7);
                                            break;
                                        }
                                    }
                                    if (beforeEndDatePayruns === 0) {
                                        //Employee end date is between month start date and the first payrun date of the month
                                        periodSalary = 0;
                                    }
                                    else if (!partialSalaryCalculated) {
                                        //Employee end date is between month end date and the last payrun date of the month
                                        if (periodEndDate < payrollIncreaseDate) {
                                            periodSalary = (model.beginningSalaryRate * noOfPayRuns) / annualPayrunCount;
                                        }
                                        else if (periodStartDate > payrollIncreaseDate) {
                                            periodSalary = (model.endingSalaryRate * noOfPayRuns) / annualPayrunCount;
                                        }
                                        else {
                                            switch (payrollRunType) {
                                            case "Monthly":
                                                if (payrollIncreaseDate.getDate() == 1) {
                                                    periodSalary = (model.endingSalaryRate * noOfPayRuns) / annualPayrunCount;
                                                }
                                                else {
                                                    periodSalary = (model.beginningSalaryRate * noOfPayRuns) / annualPayrunCount;
                                                }
                                                break;
                                            case "Semi-monthly":
                                                if (payrollIncreaseDate.getDate() >= 1 && payrollIncreaseDate.getDate() <= 15) {
                                                    periodSalary = (model.endingSalaryRate * noOfPayRuns) / annualPayrunCount;
                                                }
                                                else {
                                                    periodSalary = (model.beginningSalaryRate * 1) / annualPayrunCount;
                                                    periodSalary += (model.endingSalaryRate * 1) / annualPayrunCount;
                                                }
                                                break;
                                            case "Bi-weekly":
                                                if (payrollIncreaseDate.getDate() >= 1 && payrollIncreaseDate.getDate() <= 10) {
                                                    periodSalary = (model.endingSalaryRate * noOfPayRuns) / annualPayrunCount;
                                                }
                                                else if (payrollIncreaseDate.getDate() >= 11 && payrollIncreaseDate.getDate() <= 20) {
                                                    if (noOfPayRuns == 2) {
                                                        periodSalary = (model.endingSalaryRate * noOfPayRuns) / annualPayrunCount;
                                                    }
                                                    else {
                                                        periodSalary = (model.beginningSalaryRate * 1) / annualPayrunCount;
                                                        periodSalary += (model.endingSalaryRate * 2) / annualPayrunCount;
                                                    }
                                                }
                                                else if (payrollIncreaseDate.getDate() >= 21) {
                                                    if (noOfPayRuns == 2) {
                                                        periodSalary = (model.beginningSalaryRate * noOfPayRuns) / annualPayrunCount;
                                                    }
                                                    else {
                                                        periodSalary = (model.beginningSalaryRate * 2) / annualPayrunCount;
                                                        periodSalary += (model.endingSalaryRate * 1) / annualPayrunCount;
                                                    }
                                                }
                                                break;
                                            case "Weekly":
                                                if (payrollIncreaseDate.getDate() >= 1 && payrollIncreaseDate.getDate() <= 6) {
                                                    periodSalary = (model.endingSalaryRate * noOfPayRuns) / annualPayrunCount;
                                                }
                                                else if (payrollIncreaseDate.getDate() >= 7 && payrollIncreaseDate.getDate() <= 13) {
                                                    periodSalary = (model.beginningSalaryRate * 1) / annualPayrunCount;
                                                    periodSalary += (model.endingSalaryRate * (noOfPayRuns - 1)) / annualPayrunCount;
                                                }
                                                else if (payrollIncreaseDate.getDate() >= 14 && payrollIncreaseDate.getDate() <= 20) {
                                                    periodSalary = (model.beginningSalaryRate * 2) / annualPayrunCount;
                                                    periodSalary += (model.endingSalaryRate * (noOfPayRuns - 2)) / annualPayrunCount;
                                                }
                                                else if (payrollIncreaseDate.getDate() >= 21 && payrollIncreaseDate.getDate() <= 27) {
                                                    periodSalary = (model.beginningSalaryRate * 3) / annualPayrunCount;
                                                    periodSalary += (model.endingSalaryRate * (noOfPayRuns - 3)) / annualPayrunCount;
                                                }
                                                else if (payrollIncreaseDate.getDate() >= 28) {
                                                    periodSalary = (model.beginningSalaryRate * noOfPayRuns) / annualPayrunCount;
                                                }
                                                break;
                                            }
                                        }
                                    }
                                    else {
                                        //Employee end date is between First payrun and last payrun of the month
                                        if (periodEndDate < payrollIncreaseDate) {
                                            periodSalary = (model.beginningSalaryRate * beforeEndDatePayruns) / annualPayrunCount;
                                        }
                                        else {
                                            periodSalary = (model.endingSalaryRate * beforeEndDatePayruns) / annualPayrunCount;
                                        }
                                    }
                                }
                                else if (periodEndDate < payrollIncreaseDate) {
                                    if (!partialSalaryInNextPeriod) {
                                        periodSalary = (model.beginningSalaryRate * noOfPayRuns) / annualPayrunCount;
                                    }
                                    else {
                                        periodSalary = (model.beginningSalaryRate * (noOfPayRuns - 1)) / annualPayrunCount;
                                        periodSalary = periodSalary + (noOfDaysInNextPeriod * salaryPerDay);
                                        partialSalaryInNextPeriod = false;
                                    }
                                }
                                else if (periodStartDate > payrollIncreaseDate) {
                                    if (!partialSalaryInNextPeriod) {
                                        periodSalary = (model.endingSalaryRate * noOfPayRuns) / annualPayrunCount;
                                    }
                                    else {
                                        periodSalary = (model.endingSalaryRate * (noOfPayRuns - 1)) / annualPayrunCount;
                                        periodSalary = periodSalary + (noOfDaysInNextPeriod * salaryPerDay);
                                        partialSalaryInNextPeriod = false;
                                    }
                                }
                                else {
                                    partialSalaryInNextPeriod = false;
                                    switch (payrollRunType) {
                                    case "Monthly":
                                        if (payrollIncreaseDate.getDate() == 1) {
                                            periodSalary = (model.endingSalaryRate * noOfPayRuns) / annualPayrunCount;
                                        }
                                        else {
                                            periodSalary = (model.beginningSalaryRate * noOfPayRuns) / annualPayrunCount;
                                        }
                                        break;
                                    case "Semi-monthly":
                                        if (payrollIncreaseDate.getDate() >= 1 && payrollIncreaseDate.getDate() <= 15) {
                                            periodSalary = (model.endingSalaryRate * noOfPayRuns) / annualPayrunCount;
                                        }
                                        else {
                                            periodSalary = (model.beginningSalaryRate * 1) / annualPayrunCount;
                                            periodSalary += (model.endingSalaryRate * 1) / annualPayrunCount;
                                        }
                                        break;
                                    case "Bi-weekly":
                                        if (payrollIncreaseDate.getDate() >= 1 && payrollIncreaseDate.getDate() <= 10) {
                                            periodSalary = (model.endingSalaryRate * noOfPayRuns) / annualPayrunCount;
                                        }
                                        else if (payrollIncreaseDate.getDate() >= 11 && payrollIncreaseDate.getDate() <= 20) {
                                            if (noOfPayRuns == 2) {
                                                periodSalary = (model.endingSalaryRate * noOfPayRuns) / annualPayrunCount;
                                            }
                                            else {
                                                periodSalary = (model.beginningSalaryRate * 1) / annualPayrunCount;
                                                periodSalary += (model.endingSalaryRate * 2) / annualPayrunCount;
                                            }
                                        }
                                        else if (payrollIncreaseDate.getDate() >= 21) {
                                            if (noOfPayRuns == 2) {
                                                periodSalary = (model.beginningSalaryRate * noOfPayRuns) / annualPayrunCount;
                                            }
                                            else {
                                                periodSalary = (model.beginningSalaryRate * 2) / annualPayrunCount;
                                                periodSalary += (model.endingSalaryRate * 1) / annualPayrunCount;
                                            }
                                        }
                                        break;
                                    case "Weekly":
                                        if (payrollIncreaseDate.getDate() >= 1 && payrollIncreaseDate.getDate() <= 6) {
                                            periodSalary = (model.endingSalaryRate * noOfPayRuns) / annualPayrunCount;
                                        }
                                        else if (payrollIncreaseDate.getDate() >= 7 && payrollIncreaseDate.getDate() <= 13) {
                                            periodSalary = (model.beginningSalaryRate * 1) / annualPayrunCount;
                                            periodSalary += (model.endingSalaryRate * (noOfPayRuns - 1)) / annualPayrunCount;
                                        }
                                        else if (payrollIncreaseDate.getDate() >= 14 && payrollIncreaseDate.getDate() <= 20) {
                                            periodSalary = (model.beginningSalaryRate * 2) / annualPayrunCount;
                                            periodSalary += (model.endingSalaryRate * (noOfPayRuns - 2)) / annualPayrunCount;
                                        }
                                        else if (payrollIncreaseDate.getDate() >= 21 && payrollIncreaseDate.getDate() <= 27) {
                                            periodSalary = (model.beginningSalaryRate * 3) / annualPayrunCount;
                                            periodSalary += (model.endingSalaryRate * (noOfPayRuns - 3)) / annualPayrunCount;
                                        }
                                        else if (payrollIncreaseDate.getDate() >= 28) {
                                            periodSalary = (model.beginningSalaryRate * noOfPayRuns) / annualPayrunCount;
                                        }
                                        break;
                                    }
                                }
                                row.getData()[column.getKey()] = Math.round(parseFloat(periodSalary));
                            }
                        });
                    });
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

            model.setSelectedRow = function (column, row) {
                selectedRow = row;
                return model;
            };

            model.setData = function (data) {
                gridConfig
                    .forEachColumn(salaryMapper.resetData, [data.payrollMonthlySalary]);
                responseData = angular.copy(data);
                payloadData = angular.copy(data);
                model.setSalaryInfo(data.payrollSalary)
                    .setGridData(data.payrollMonthlySalary);
                return model;
            };

            /**
             * Revert all changes made in the grid
             * @return {object} this
             */
            model.rollback = function () {
                model.form.$setPristine();
                model.setSalaryInfo(responseData.payrollSalary)
                    .setGridData(responseData.payrollMonthlySalary);
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
            model.setSalaryInfo = function (salaryInfo) {
                model.beginningSalaryRate = salaryInfo.beginningSalary;
                model.dateOfIncrease = moment(new Date(salaryInfo.increaseDate));
                model.increasePercentage = salaryInfo.increasePercent;
                model.increaseCurrency = salaryInfo.increaseAmount;
                model.endingSalaryRate = salaryInfo.endingSalary;
                model.payrollStartDate = salaryInfo.payrollStartDate;
                return model;
            };

            /**
             * Set data to grid by mapping data from json
             * @param {object}
             */
            model.setGridData = function (data) {
                var defaultRow = gridConfig.getDefaultRow({}, 0),
                    dataRows = salaryMapper.buildGridData(defaultRow, data);

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
            model.setMonthlySalary = function () {
                model.getMonthlySalaryByColumn();
                grid
                    .reCalculate()
                    .refresh();
                return model;
            };

            model.setBeginningSalaryRate = function (value) {
                model.increaseCurrency = salaryCalculation.applyPercentage(model.increasePercentage, value);
                model.endingSalaryRate = salaryCalculation.sum(model.increaseCurrency, value);
                return model;
            };

            model.setIncreasePercentage = function (value) {
                model.increaseCurrency = salaryCalculation.applyPercentage(value, model.beginningSalaryRate);
                model.endingSalaryRate = salaryCalculation.sum(model.increaseCurrency, model.beginningSalaryRate);
                return model;
            };

            model.setIncreaseCurrency = function (value) {
                model.endingSalaryRate = salaryCalculation.sum(value, model.beginningSalaryRate);
                model.increasePercentage = salaryCalculation.getPercentage(model.beginningSalaryRate, model.increaseCurrency);
                return model;
            };

            model.setEndingSalaryRate = function (value) {
                model.increaseCurrency = salaryCalculation.substract(value, model.beginningSalaryRate);
                model.increasePercentage = salaryCalculation.getPercentage(model.beginningSalaryRate, model.increaseCurrency);
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
        .factory("salaryModel", [
            'moment',
            "salaryConstantModel",
            'salaryContentModel',
            'payrollItemModel',
            'bmGridModel',
            'salaryCalculationModel',
            'salaryValidationModel',
            'salaryMapperModel',
            factory]);
})(angular);
