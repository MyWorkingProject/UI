// Calculation Sources Options

(function (angular) {
    "use strict";

    function calculationSourcesFactory(i18n, dropdownUtils) {
        var options = {
                CURR_ROW: {
                    value: "current-row",
                    name: i18n.translate("bdgt_calculator_src_curr_row")
                },
                START_PT: {
                    value: "starting-point",
                    name: i18n.translate("bdgt_calculator_src_start_pt")
                }
            };

        var calculator = angular.copy(options);
        calculator.defaultOptions = dropdownUtils.toSelectOptions(options);
        calculator.options = {};

        //returns the options into array
        calculator.getList = function () {
            return calculator.defaultOptions;
        };

        calculator.updateList = function(otherSourceList) {
            var list = [angular.copy(options.CURR_ROW)].concat(otherSourceList);
            
            calculator.options.average = list;
            calculator.options.id_monthly = list.concat([angular.copy(options.START_PT)]);
        };

        calculator.getSourceListOptions = function(method) {
            if(calculator.options[method]) {
                return calculator.options[method];
            }
            return calculator.defaultOptions.options;
        };

        calculator.reset = function() {
            calculator.options = {};
        };

        return calculator;
    }

    angular
        .module("budgeting")
        .factory("calculationSources", [
            "calcuTranslatorSvc",
            "dropdownUtilities",
            calculationSourcesFactory
        ]);
})(angular);

/*
    calculator.createGridData = function(noOfPeriods, referenceValue) {
        var gridData = {};
        for(var i=0; i<noOfPeriods; i++) {
            var keyStr = pricingUtils.getMonthKey(i+1);
            gridData[keyStr] = referenceValue[keyStr];
        }
        gridData.total = referenceValue.total;

        return gridData;
    };

    calculator.updateList = function(calculatorParamData) {
        var updatedOptions = [],
            month = calculatorParamData.startMonth,
            year = calculatorParamData.startYear,
            noOfPeriods = calculatorParamData.noOfPeriods,
            activeDate = dateUtils.createDate(year, month-1, 1);

        //add reference data
        angular.forEach(calculatorParamData.sourceDropdownData, function(curr) {
            var newOption = {
                value: curr.rowTitle,
                name: curr.rowTitle,
            };
            //newOption.gridData = calculator.createGridData(noOfPeriods, curr);

            updatedOptions.push(newOption);
        });

        calculator.otherSourcesList = updatedOptions;
    };

    calculator.getSourceList = function(method) {
        var sourceList = [];
            sourceList.push(options.CURR_ROW);
            sourceList.concat(calculator.otherSourcesList);

        if(method != calculationMethods.AVERAGE.value) {
            sourceList.push(angular.copy(options.START_PT));                
        }

        return sourceList;
    };
*/