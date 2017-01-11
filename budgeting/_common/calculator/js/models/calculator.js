//  Calculator Model

(function (angular) {
    "use strict";

    function calculatorFactory(calculationGridData, calculationMethods, calculationSources, pricingUtils, i18n) {
        var labels = {
            monthlyAmt: i18n.translate("bdgt_calculator_monthly_amt"),
            monthlyPercentage: i18n.translate("bdgt_calculator_monthly_percentage")
        };
        var defaultData = {
            method: calculationMethods.STRAIGHT_MONTHLY.value,
            source: calculationSources.CURR_ROW.value,
            amt1: null,
            amt2: null,
            amtMonthly: null,

            baseValueData: null, //active period selected by the user 
            affectedPeriod: null, //in case there's a date range set, limit the columns to within this period
            gridData: null, //grid content
            sourceGridData: null, //grid data for different sources

            maxDecimalCount: 0 //maximum number of decimals
        };

        var calculator = {};

        //initialize data
        calculator.data = angular.copy(defaultData);

        calculator.getActiveRow = function() {
            return calculator.data.baseValueData;
        };
        calculator.setActiveRow = function(activeRow) {
            calculator.data.baseValueData = activeRow;
        };

        // refer to calculationGridData for gridData's array contents
        calculator.getSourceRowData = function() {
            return calculator.data.gridData[0];
        };
        calculator.getMonthlyRowData = function() {
            return calculator.data.gridData[1];
        };
        calculator.getApplyChangesRowData = function() {
            return calculator.data.gridData[2];
        };
        calculator.getResultsRowData = function() {
            return calculator.data.gridData[3];
        };

        calculator.resetGridData = function() {
            calculator.data.gridData = [];
        };
        calculator.setGridData = function(stateParams) {
            calculator.data.gridData = new calculationGridData(stateParams);
        };
        calculator.getGridData = function() {
            return calculator.data.gridData;
        };

        calculator.setSourceGridData = function(sourceData) {
            calculator.data.sourceGridData = sourceData;
        };
        calculator.getSourceGridData = function(source) {
            return calculator.data.sourceGridData[source];
        };

        calculator.resetAverageCount = function() {
            calculator.data.affectedPeriod = null;
        };

        //calculate according to the method and other user inputs
        calculator.calculate = function (baseValueData) {
            calculator.setActiveRow(baseValueData);

            var currMethod = calculator.data.method;
            switch (currMethod) {
                case calculationMethods.STRAIGHT_MONTHLY.value:
                    calculator.calculateMonthly();
                    break;
                case calculationMethods.STRAIGHT_ANNUALLY.value:
                    calculator.calculateAnnually();
                    break;
                case calculationMethods.AVERAGE.value:
                    calculator.calculateAverage();
                    break;
                case calculationMethods.QUARTERLY.value:
                    calculator.calculateQuarterly();
                    break;
                case calculationMethods.MULTIPLICATION.value:
                    calculator.calculateMultiplication();
                    break;
                case calculationMethods.ID_MONTHLY_CURRENCY.value:
                case calculationMethods.ID_MONTHLY_PERCENTAGE.value:
                    calculator.calculateIDMonthly(currMethod);
                    break;
                case calculationMethods.ID_ANNUALLY_CURRENCY.value:
                case calculationMethods.ID_ANNUALLY_PERCENTAGE.value:
                    calculator.calculateIDAnnually(currMethod);
                    break;
                case calculationMethods.COMPOUND_CURRENCY.value:
                case calculationMethods.COMPOUND_PERCENTAGE.value:
                    calculator.calculateCompoundingValue(currMethod);
                    break;
            }
        };

        calculator.getComputeValue = function(val) {
            if(val === null) {
                return 0;
            }
            return parseFloat(val);
        };

        calculator.calculateMonthly = function (amountPerMonth) {
            var amt = amountPerMonth || parseFloat(calculator.data.amt1),
                baseValueGridData = calculator.getActiveRow(),
                resultsGridData = calculator.getResultsRowData(),
                applyChangesGridData = calculator.getApplyChangesRowData(),
                total = 0;

            angular.forEach(resultsGridData, function (val, key) {
                if (!pricingUtils.isJsonKeyMonth(key)) {
                    return;
                }

                var newVal = null;
                if (applyChangesGridData[key] === true) {
                    newVal = amt;
                } else {
                    newVal = baseValueGridData[key];
                }

                resultsGridData[key] = pricingUtils.displayAsCurrency(newVal, calculator.data.maxDecimalCount);
                total += calculator.getComputeValue(newVal);
            });   
            resultsGridData.total = Math.round(total);
        };

        calculator.calculateAnnually = function () {
            var total = parseFloat(calculator.data.amt1),
                amt = 0,
                applicableMonths = calculator.countApplicableMonths();

            amt = (total * 1.0) / applicableMonths;
            calculator.calculateMonthly(amt);
        };

        calculator.calculateAverage = function () {
            var applyChangesGridData = calculator.getApplyChangesRowData(),  
                resultsGridData = calculator.getResultsRowData(),                              
                sourceGridData = calculator.getSourceRowData(),
                amt = 0,
                applicableMonths = 0,
                activeYearTotal = 0,
                total = 0;

            angular.forEach(sourceGridData, function (val, key) {
                if (!pricingUtils.isJsonKeyMonth(key)) {
                    return;
                }

                if(applyChangesGridData[key] === true) {
                    applicableMonths++;

                    if(val !== null) {
                        activeYearTotal += parseFloat(val);
                    }
                }
            });

            if(applicableMonths > 1) {
                calculator.data.affectedPeriod = applicableMonths + " periods";                
            } else {
                calculator.data.affectedPeriod = applicableMonths + " period";                
            }
            amt = activeYearTotal / applicableMonths;

            angular.forEach(resultsGridData, function (val, key) {
                if (!pricingUtils.isJsonKeyMonth(key)) {
                    return;
                }

                var newVal = null;
                if (applyChangesGridData[key] === true) {
                    newVal = amt;
                } else {
                    newVal = sourceGridData[key];
                }

                resultsGridData[key] = pricingUtils.displayAsCurrency(newVal, calculator.data.maxDecimalCount);
                total += calculator.getComputeValue(newVal);
            });   
            resultsGridData.total = Math.round(total);
        };

        calculator.calculateQuarterly = function () {
            var amt = parseFloat(calculator.data.amt1),
                quarter = parseInt(calculator.data.amt2),
                resultsGridData = calculator.getResultsRowData(),
                applyChangesGridData = calculator.getApplyChangesRowData(),
                baseValueGridData = calculator.getActiveRow(),
                index = 1,
                total = 0;

            quarter = quarter % 3; //determine which quarter it 
            angular.forEach(resultsGridData, function (val, key) {
                if (!pricingUtils.isJsonKeyMonth(key)) {
                    return;
                }

                var newVal = null;
                if (index % 3 == quarter) {
                    if(applyChangesGridData[key] === true) {
                        newVal = amt;
                    } else {
                        newVal = baseValueGridData[key];
                    }  
                } else {
                    newVal = null;
                }

                resultsGridData[key] = pricingUtils.displayAsCurrency(newVal, calculator.data.maxDecimalCount);
                total += calculator.getComputeValue(newVal);
                index++;
            });
            resultsGridData.total = Math.round(total);
        };

        calculator.calculateMultiplication = function () {
            var amt = parseFloat(calculator.data.amt1),
                multiplier = parseFloat(calculator.data.amt2);

            var amtPerMonth = amt * multiplier;
            calculator.calculateMonthly(amtPerMonth);
        };

        calculator.calculateCompoundingValue = function (currMethod) {
            var amt = parseFloat(calculator.data.amt1),
                factor = parseFloat(calculator.data.amt2),
                percent = factor / 100.00,
                resultsGridData = calculator.getResultsRowData(),
                applyChangesGridData = calculator.getApplyChangesRowData(),
                baseValueGridData = calculator.getActiveRow(),                
                total = 0;

            angular.forEach(resultsGridData, function (val, key) {
                if (!pricingUtils.isJsonKeyMonth(key)) {
                    return;
                }

                var newVal = null;
                if (applyChangesGridData[key] === true) {
                    newVal = amt;

                    //increase value for next iteration
                    if (currMethod == calculationMethods.COMPOUND_CURRENCY.value) {
                        amt += factor;
                    } else { //calculationMethods.COMPOUND_PERCENTAGE
                        amt += amt * percent;
                    }
                } else {
                    newVal = baseValueGridData[key];
                }

                resultsGridData[key] = pricingUtils.displayAsCurrency(newVal, calculator.data.maxDecimalCount);
                total += calculator.getComputeValue(newVal);
            });
            resultsGridData.total = Math.round(total);
        };

        calculator.calculateIDAnnually = function (currMethod) {
            var amt = parseFloat(calculator.data.amt1),
                resultsGridData = calculator.getResultsRowData(),
                applyChangesGridData = calculator.getApplyChangesRowData(),
                applicableMonths = calculator.countApplicableMonths(),
                baseValueGridData = calculator.getActiveRow(),
                total = 0;

            if (currMethod == calculationMethods.ID_ANNUALLY_CURRENCY.value) {
                amt = amt / applicableMonths;
            } else {
                amt = amt / 100.0; //treat as percent
            }

            angular.forEach(resultsGridData, function (val, key) {
                if (!pricingUtils.isJsonKeyMonth(key)) {
                    return;
                }

                var newVal = null;
                if (applyChangesGridData[key] === true) {
                    newVal = parseFloat(baseValueGridData[key]) || 0;
                    if (currMethod == calculationMethods.ID_ANNUALLY_CURRENCY.value) {
                        newVal += amt;
                    } else {
                        newVal += (newVal * amt);
                    }
                } else {
                    newVal = baseValueGridData[key];
                }

                resultsGridData[key] = pricingUtils.displayAsCurrency(newVal, calculator.data.maxDecimalCount);
                total += calculator.getComputeValue(newVal);
            });
            resultsGridData.total = Math.round(total);
        };

        calculator.calculateIDMonthly = function (currMethod) {
            var monthlyGridData = calculator.getMonthlyRowData(),
                applyChangesGridData = calculator.getApplyChangesRowData(),
                resultsGridData = calculator.getResultsRowData(),
                sourceGridData = calculator.getSourceRowData(),
                baseValueGridData = calculator.getActiveRow(),
                sourceData = calculator.data.source,
                total = 0;

            angular.forEach(resultsGridData, function (val, key) {
                if (!pricingUtils.isJsonKeyMonth(key)) {
                    return;
                }

                var newVal = null;
                if (applyChangesGridData[key] === true) {
                    //get initial value based on source data
                    var base = 0;
                    if (sourceData == calculationSources.START_PT.value) {
                        base = calculator.data.amt1;
                    } else {
                        base = sourceGridData[key];
                    }
                    base = parseFloat(base) || 0;

                    //get value that will be added to the additional value based on method
                    var addends = parseFloat(monthlyGridData[key]) || 0;
                    if (currMethod == calculationMethods.ID_MONTHLY_PERCENTAGE.value) {
                        addends = addends / 100.0 * base;
                    }

                    //get sum and assign
                    newVal = base + addends;
                } else {
                    if (sourceData == calculationSources.START_PT.value) {
                        newVal = calculator.data.amt1;
                    } else {
                        newVal = sourceGridData[key]; //use source row
                    }
                }

                resultsGridData[key] = pricingUtils.displayAsCurrency(newVal, calculator.data.maxDecimalCount);
                total += calculator.getComputeValue(newVal);
            });
            resultsGridData.total = Math.round(total);
        };

        // calculate total value of a row.
        calculator.calculateTotal = function(rowType, periodId, newVal) {
            if(rowType == "results") {
                var resultsRow = calculator.getResultsRowData(),
                    total = 0;

                angular.forEach(resultsRow, function (val, key) {
                    if (!pricingUtils.isJsonKeyMonth(key)) {
                        return;
                    }

                    if(key == periodId) {
                        val = newVal;
                    }

                    total += calculator.getComputeValue(val);
                });
                resultsRow.total = Math.round(total);
            }
        };

        calculator.countApplicableMonths = function () {
            var applyChangesGridData = calculator.getApplyChangesRowData(),
                count = 0;

            angular.forEach(applyChangesGridData, function (isApplicable, key) {
                if (pricingUtils.isJsonKeyMonth(key)) {
                    if (isApplicable === true) {
                        count++;
                    }
                }                
            });

            return count;
        };

        //sets monthly data when amount has been input
        calculator.setMonthlyGridData = function (defaultAmt) {
            var monthlyGridData = calculator.getMonthlyRowData();
            angular.forEach(monthlyGridData, function (val, key) {
                if (pricingUtils.isJsonKeyMonth(key)) {
                    monthlyGridData[key] = pricingUtils.displayAsCurrency(defaultAmt, calculator.data.maxDecimalCount);
                }
            });
        };

        calculator.resetMonthlyGridData = function() {
            var monthlyGridData = calculator.getMonthlyRowData();
            angular.forEach(monthlyGridData, function (val, key) {
                if (pricingUtils.isJsonKeyMonth(key)) {
                    monthlyGridData[key] = null;
                }
            });
            monthlyGridData.monthlyAmt = null;
        };

        calculator.resetResultsGridData = function() {
            var resultsGridData = calculator.getResultsRowData();
            angular.forEach(resultsGridData, function (val, key) {
                if (pricingUtils.isJsonKeyMonth(key)) {
                    resultsGridData[key] = null;
                }
            });
            resultsGridData.total = 0;
        };

        calculator.setSelectedSourceRowData = function(source) {
            var sourceGridData = calculator.getSourceRowData(),
                newSourceGridData = calculator.getSourceGridData(source);

            angular.forEach(sourceGridData, function (val, key) {
                if (pricingUtils.isJsonKeyMonth(key)) {
                    sourceGridData[key] = pricingUtils.displayAsCurrency(newSourceGridData[key], calculator.data.maxDecimalCount);
                }
            });
            sourceGridData.total = newSourceGridData.total;            
        };

        calculator.setMonthlyLabel = function(currMethod) {
            var monthlyGridData = calculator.getMonthlyRowData();

            if(currMethod == calculationMethods.ID_MONTHLY_CURRENCY.value) {
                monthlyGridData.columnTitle = labels.monthlyAmt;
            } else if(currMethod == calculationMethods.ID_MONTHLY_PERCENTAGE.value) {
                monthlyGridData.columnTitle = labels.monthlyPercentage;
            }

        };

        calculator.setMaxDecimalCount = function(cnt) {
            calculator.data.maxDecimalCount = cnt;
        };
        calculator.getMaxDecimal = function() {
            return calculator.data.maxDecimalCount;
        };

        calculator.reset = function () {
            calculator.data = angular.copy(defaultData);
        };

        
        return calculator;        
    }

    angular
        .module("budgeting")
        .factory("calculatorModel", [
            "calculationGridData",
            "calculationMethods",
            "calculationSources",
            "calcPricingUtility",
            "calcuTranslatorSvc",            
            calculatorFactory
        ]);

})(angular);