(function (angular) {
    "use strict";


    var CalculatorCtrl = function($scope, calculatorParamData, calculatorModel, calculatorFormModel, calculatorGridModel, 
            pricingUtils, dateUtils, i18n, asideModalInstance, rpWatchList) {
        var vm = this,
            noActiveRowMsg = i18n.translate("bdgt_calculator_no_active_year_desc"),
            calculator = {};

        //initialize data
        calculator.state = calculatorParamData;
        calculator.model = calculatorModel;
        calculator.form = calculatorFormModel;
        calculator.grid = calculatorGridModel;

        calculator.hasActivePeriod = function () {
            if(!calculator.state.activePeriod || angular.equals(calculator.state.activePeriod, {})) {
                return false;
            }
            return true;
        };

        calculator.hasDateRange = function() {
            if(calculator.state.startYear && calculator.state.startMonth && calculator.state.noOfPeriods) {
                return true;
            }
            return false;
        };

        calculator.initDisplay = function () {
            if(!calculator.state || calculator.state.display === undefined) {
                console.error("Assign calculatorStateModel to the calculator");
                return; //don't do anything else
            }

            if (calculator.hasActivePeriod() && calculator.hasDateRange()) { 
                var hasOtherSourceData = (calculator.state.sourceDropdownData !== null && calculator.state.sourceDropdownData !== undefined &&
                        calculator.state.sourceDropdownData.length > 0);

                calculator.state.display = true;

                if(hasOtherSourceData) {
                    calculator.assignSourceData(calculator.state.sourceDropdownData);                    
                    calculator.form.state.aveCalculationSource = true;                    
                } else {
                    calculator.form.state.aveCalculationSource = false;
                }

                if(calculator.state.startYear && calculator.state.startMonth == 1 && calculator.state.noOfPeriods <= 12) {
                    calculator.form.state.displayActiveYear = true;
                }

                calculatorModel.setMaxDecimalCount(calculator.state.maxDecimalCount);

                calculatorModel.setGridData(calculator.state);
                calculatorGridModel.initGrid(calculator.state);
                
                calculatorGridModel.populateGrid(calculatorModel.getGridData());
                calculatorFormModel.prepareCalculator();
            } else {
                calculator.state.display = false;
            }
        };

        calculator.assignSourceData = function(sourceData) {
            var sourceList = [],
                sourceGridData = {};

            angular.forEach(sourceData, function(currSource) {
                sourceList.push({
                    value: currSource.rowTitle,
                    name: currSource.rowTitle
                });

                sourceGridData[currSource.rowTitle] = calculator.createGridData(currSource); 
            });
            sourceGridData["current-row"] = calculator.createGridData(calculator.state.activePeriod);

            calculatorFormModel.updateSourceList(sourceList);
            calculatorModel.setSourceGridData(sourceGridData);
        };

        calculator.createGridData = function(referenceValue) {
            var gridData = {};
            for(var i=0, max=calculator.state.noOfPeriods; i<max; i++) {
                var keyStr = pricingUtils.getMonthKey(i+1);
                gridData[keyStr] = referenceValue[keyStr];
            }
            gridData.total = referenceValue.total;

            return gridData;
        };

        calculator.reset = function () {
            if(calculator.state && calculator.state.reset) {
                calculator.state.reset();
            }

            calculatorModel.reset();
            calculatorFormModel.reset();
        };

        calculator.calculate = function () {
            calculatorModel.calculate(calculator.state.activePeriod);
        };

        calculator.saveAndClose = function() {
            calculator.applyCalculations();
            calculator.reset();
        };

        calculator.close = function() {
            asideModalInstance.cancel();
            calculator.reset();
        };

        calculator.applyCalculations = function () {
            var resultsGridData = calculatorModel.getResultsRowData(),
                updatedGrid = {};

            angular.forEach(resultsGridData, function (val, key) {
                if (pricingUtils.isJsonKeyMonth(key)) {
                    updatedGrid[key] = val;
                }
            });
            updatedGrid.total = resultsGridData.total;

            asideModalInstance.done({
                "resultsGrid": updatedGrid,
                "startYear": calculator.state.startYear, 
                "startMonth": calculator.state.startMonth, 
                "noOfPeriods": calculator.state.noOfPeriods
            });
        };

        calculator.resetGrids = function () {
            calculatorModel.resetGridData();
        };

        vm.init = function() {
            vm.watchList = rpWatchList();
            vm.watchList.add($scope.$on("$destroy", vm.destroy));

            vm.calculator.initDisplay();
        };

        vm.destroy = function() {
            vm.watchList.destroy();
            vm.calculator.reset();
            vm.calculator = null;                
        };

        vm.translate = i18n.translate;
        vm.calculator = calculator;
        vm.init();
    };

    angular
        .module("budgeting")
        .controller("CalculatorCtrl", [
            "$scope",
            "calculatorParamData",
            "calculatorModel",
            "calculatorFormModel",
            "calculatorGridModel",
            "calcPricingUtility",
            "calcuDateUtility",
            "calcuTranslatorSvc",
            "rpBdgtAsideModalInstance", 
            "rpWatchList",
            CalculatorCtrl
        ]);
})(angular);