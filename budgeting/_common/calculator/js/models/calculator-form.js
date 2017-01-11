//  Calculator Model

(function (angular) {
    "use strict";

    function calculatorFormFactory(calculatorModel, calculationMethods, calculationSources, i18n) {

        var defaultData = {
                methods: calculationMethods.getList(),
                sources: calculationSources.getList(),

                //holds the appropriate form labels based on calculation method
                calculationAmt1: null,
                calculationAmt2: null,

                //holds the appropriate tooltip contents based on calculation method
                tooltipTitle: null,
                tooltipDesc: null
            },
            defaultStates = {
                //display states
                calculationSource: false,
                calculationAmt1: false,
                calculationAmt2: false,
                monthlyDisplay: false,
                activePeriodDisplay: false,
                displayActiveYear: false,
                affectedPeriodMsg: false,

                //set during initialization of modal
                aveCalculationSource: false
            };

        var calculator = {};

        //initialize data
        calculator.data = angular.copy(defaultData);
        calculator.state = angular.copy(defaultStates);

        //initalize interchanging labels
        calculator.lbl = {
            amount: i18n.translate("bdgt_calculator_amount"),
            percent: i18n.translate("bdgt_calculator_percent"),
            factor: i18n.translate("bdgt_calculator_factor"),
            factorPercent: i18n.translate("bdgt_calculator_factor_percent"),
            quarter: i18n.translate("bdgt_calculator_quarter"),
            multiplier: i18n.translate("bdgt_calculator_multipllier"),
            startPt: i18n.translate("bdgt_calculator_src_start_pt"),

            monthlyPercent: i18n.translate("bdgt_calculator_monthly_percentage"),
            monthlyAmt: i18n.translate("bdgt_calculator_monthly_amt")
        };

        calculator.updateSourceList = function(sourceList) {
            calculationSources.updateList(sourceList);
        };
        calculator.getSourceList = function(method) {
            calculator.data.sources.options = calculationSources.getSourceListOptions(method);
        };

        //updates the tooltip every time the user selects a method
        calculator.updateInfo = function (methodValue) {
            var currMethod = calculationMethods.getMethodObj(methodValue);
            calculator.data.tooltipTitle = currMethod.name;
            calculator.data.tooltipDesc = currMethod.desc;
        };

        //every calculation method has different requirements, when user chooses a method this prepares the requirements accordingly
        calculator.prepareCalculator = function () {
            var currMethod = calculatorModel.data.method;
            var states = calculator.state;

            //clear assigned values
            calculatorModel.data.amt1 = null;
            calculatorModel.data.amt2 = null;
            calculatorModel.data.source = "current-row";

            //reset all display states
            states.calculationSource = false;
            states.calculationAmt1 = false;
            states.calculationAmt2 = false;
            states.monthlyDisplay = false;
            states.activePeriodDisplay = false;
            states.affectedPeriodMsg = false;

            calculator.data.calculationAmt1 = calculator.lbl.amount;        

            switch (currMethod) {
                case calculationMethods.STRAIGHT_MONTHLY.value:
                case calculationMethods.STRAIGHT_ANNUALLY.value:
                    states.calculationAmt1 = true;
                    break;
                case calculationMethods.AVERAGE.value:
                    if(states.aveCalculationSource) {
                        states.calculationSource = true;                        
                    }
                    
                    states.activePeriodDisplay = true;
                    states.affectedPeriodMsg = true;

                    calculator.getSourceList("average");
                    calculator.prepareCalculationSource();
                    break;
                case calculationMethods.QUARTERLY.value:
                    states.calculationAmt1 = true;
                    states.calculationAmt2 = true;
                    calculator.data.calculationAmt2 = calculator.lbl.quarter;
                    break;
                case calculationMethods.MULTIPLICATION.value:
                    states.calculationAmt1 = true;
                    states.calculationAmt2 = true;
                    calculator.data.calculationAmt2 = calculator.lbl.multiplier;
                    break;
                case calculationMethods.ID_MONTHLY_CURRENCY.value:
                    states.calculationSource = true;
                    states.monthlyDisplay = true;

                    calculator.getSourceList("id_monthly");
                    calculator.prepareCalculationSource();
                    calculatorModel.setMonthlyLabel(currMethod);
                    break;
                case calculationMethods.ID_MONTHLY_PERCENTAGE.value:
                    states.calculationSource = true;
                    states.monthlyDisplay = true;

                    calculator.data.calculationAmt1 = calculator.lbl.percent;

                    calculator.getSourceList("id_monthly");
                    calculator.prepareCalculationSource();
                    calculatorModel.setMonthlyLabel(currMethod);
                    break;
                case calculationMethods.ID_ANNUALLY_CURRENCY.value:
                    states.activePeriodDisplay = true;                
                    states.calculationAmt1 = true;

                    calculator.setSelectedSourceRowData(calculationSources.CURR_ROW.value);
                    break;
                case calculationMethods.ID_ANNUALLY_PERCENTAGE.value:
                    states.activePeriodDisplay = true;                
                    states.calculationAmt1 = true;

                    calculator.data.calculationAmt1 = calculator.lbl.percent;

                    calculator.setSelectedSourceRowData(calculationSources.CURR_ROW.value);                    
                    break;
                case calculationMethods.COMPOUND_CURRENCY.value:
                    states.calculationAmt1 = true;
                    states.calculationAmt2 = true;

                    calculator.data.calculationAmt2 = calculator.lbl.factor;
                    break;
                case calculationMethods.COMPOUND_PERCENTAGE.value:
                    states.calculationAmt1 = true;
                    states.calculationAmt2 = true;
                    calculator.data.calculationAmt2 = calculator.lbl.factorPercent;
                    break;
            }

            calculator.updateInfo(currMethod); //update tooltip info
            calculatorModel.resetResultsGridData();            
        };

        calculator.prepareCalculationSource = function () {
            var source = calculatorModel.data.source;
            if(source == calculationSources.START_PT.value) {
                calculator.state.calculationAmt1 = true;
                calculator.data.calculationAmt1 = calculator.lbl.startPt;
                calculator.state.activePeriodDisplay = false;
            } else {
                calculator.state.calculationAmt1 = false;
                calculator.state.activePeriodDisplay = true;                    
                
                calculator.setSelectedSourceRowData(source);
            }

            calculatorModel.resetMonthlyGridData();
            calculatorModel.resetResultsGridData();
            calculatorModel.resetAverageCount();
        };

        calculator.setSelectedSourceRowData = function(source) {
            if(calculator.state.aveCalculationSource) {
                calculatorModel.setSelectedSourceRowData(source);                    
            }
        };

        calculator.reset = function () {
            calculator.data = angular.copy(defaultData);
            calculator.state = angular.copy(defaultStates);
            calculationSources.reset();
        };

        return calculator;
    }

    angular
        .module("budgeting")
        .factory("calculatorFormModel", [
            "calculatorModel",
            "calculationMethods",
            "calculationSources",
            "calcuTranslatorSvc",
            calculatorFormFactory
        ]);

})(angular);