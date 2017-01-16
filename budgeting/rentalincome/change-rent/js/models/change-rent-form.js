//  Calculator Model

(function (angular) {
    "use strict";

    function changeRentFormModel(calculatorModel, calculationMethods, calculationSources, i18n) {

        var defaultData = {
                methods: {}, //calculationMethods.getList(),
                sources: calculationSources.getList(true),

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
                affectedPeriodMsg: false,
                hideResult: false,
                //set during initialization of modal
                aveCalculationSource: false,
                applyChange: false,
                showGrid: false
            };

        var calculator = {};

        //initialize data
        calculator.init = function(addRentMethods){
            //defaultData.methods = calculationMethods.getList(addRentMethods);
            calculationMethods.init();    
            calculator.data = angular.copy(defaultData);
            calculator.data.methods = calculationMethods.getList(addRentMethods);
            calculator.state = angular.copy(defaultStates); 
        };

        //initalize interchanging labels
        calculator.lbl = {
            amount: i18n.translate("bdgt_change_rent_amount"),
            percent: i18n.translate("bdgt_change_rent_percent"),
            factor: i18n.translate("bdgt_change_rent_factor"),
            factorPercent: i18n.translate("bdgt_change_rent_factor_percent"),
            quarter: i18n.translate("bdgt_change_rent_quarter"),
            multiplier: i18n.translate("bdgt_change_rent_multipllier"),
            startPt: i18n.translate("bdgt_change_rent_src_start_pt")
        };

        calculator.updateSourceList = function(sourceList) {
            calculationSources.updateList(sourceList);
        };
        calculator.getSourceList = function(method) {
            calculator.data.sources.options = calculationSources.getSourceListOptions(method);
        };

        //updates the tooltip every time the user selects a method
        calculator.updateInfo = function (methodValue) {
            if(methodValue !== undefined){
                var currMethod = calculationMethods.getMethodObj(methodValue);
                calculator.data.tooltipTitle = currMethod.name;
                calculator.data.tooltipDesc = currMethod.desc;
            }
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
            states.hideResult = true;

            calculator.data.calculationAmt1 = calculator.lbl.amount;        

            switch (currMethod) {
                case calculationMethods.STRAIGHT_MONTHLY.value:
                case calculationMethods.STRAIGHT_ANNUALLY.value:
                    states.calculationAmt1 = true;
                    states.hideResult = false;
                    calculator.handleSource();
                    break;
                case calculationMethods.AVERAGE.value:
                    if(states.aveCalculationSource) {
                        states.calculationSource = true;                        
                    }
                    
                    states.activePeriodDisplay = true;
                    states.affectedPeriodMsg = true;
                    states.calculationSource = true;
                    calculator.getSourceList("average");
                    calculator.prepareCalculationSource();
                    calculator.handleResults();                    
                    calculator.handleSource();
                    break;
                case calculationMethods.QUARTERLY.value:
                    states.calculationAmt1 = true;
                    states.calculationAmt2 = true;
                    states.hideResult = false;
                    calculator.handleSource();
                    calculator.data.calculationAmt2 = calculator.lbl.quarter;
                    break;
                case calculationMethods.MULTIPLICATION.value:
                    states.calculationAmt1 = true;
                    states.calculationAmt2 = true;
                    states.hideResult = false;
                    calculator.handleSource();
                    calculator.data.calculationAmt2 = calculator.lbl.multiplier;
                    break;
                case calculationMethods.ID_MONTHLY_CURRENCY.value:
                    states.calculationSource = true;
                    states.monthlyDisplay = true;
                    calculator.getSourceList("id_monthly");
                    calculator.prepareCalculationSource();
                    calculator.handleResults();
                    calculator.handleSource();  
                    break;
                case calculationMethods.ID_MONTHLY_PERCENTAGE.value:
                    states.calculationSource = true;
                    states.monthlyDisplay = true;
                    calculator.data.calculationAmt1 = calculator.lbl.percent;
                    calculator.getSourceList("id_monthly");
                    calculator.prepareCalculationSource();
                    calculator.handleResults();
                    calculator.handleSource();  
                    break;
                case calculationMethods.ID_ANNUALLY_CURRENCY.value:
                    states.calculationSource = true;
                    states.activePeriodDisplay = true;                
                    states.calculationAmt1 = true;
                    calculator.handleResults();
                    calculator.handleSource();  
                    calculator.setSelectedSourceRowData(calculationSources.CURR_ROW.value);
                    break;
                case calculationMethods.ID_ANNUALLY_PERCENTAGE.value:
                    states.calculationSource = true;
                    states.activePeriodDisplay = true;                
                    states.calculationAmt1 = true;
                    calculator.handleResults(); 
                    calculator.handleSource(); 
                    calculator.data.calculationAmt1 = calculator.lbl.percent;

                    calculator.setSelectedSourceRowData(calculationSources.CURR_ROW.value);                    
                    break;
                case calculationMethods.COMPOUND_CURRENCY.value:
                    states.calculationAmt1 = true;
                    states.calculationAmt2 = true;
                    states.hideResult = false;
                    calculator.handleSource();
                    calculator.data.calculationAmt2 = calculator.lbl.factor;
                    break;
                case calculationMethods.COMPOUND_PERCENTAGE.value:
                    states.calculationAmt1 = true;
                    states.calculationAmt2 = true;
                    states.hideResult = false;
                    calculator.handleSource();
                    calculator.data.calculationAmt2 = calculator.lbl.factorPercent;
                    break;
             /*   case calculationMethods.COMPOUND_PERCENTAGE.value:
                    states.calculationAmt1 = true;
                    states.calculationAmt2 = true;
                    states.hideResult = false;
                    calculator.handleSource();
                    calculator.data.calculationAmt2 = calculator.lbl.factorPercent;
                    break;*/
                case "applyMR":
                case "applyAR":
                    calculator.handleResults(); 
                    calculator.handleSource();
                    break;
                case "id-monthly-currency-expiry":
                case "id-monthly-percent-percent-expiry":
                    states.calculationSource = true;
                    states.monthlyDisplay = true;
                    calculator.handleResults(); 
                    calculator.handleSource();
                    break;
            }
            calculator.handleSourceOptions();
            calculator.updateInfo(currMethod); //update tooltip info
            calculatorModel.resetResultsGridData(); 
            calculator.handleGrid();           
        };

       calculator.showApplyChange = function(val){
            if(val === "selected periods"){
                calculator.state.applyChange = true;
            }
            else{
                calculator.state.applyChange = false;
            }
       };

      calculator.handleSourceOptions = function(){
            var currMethod = calculatorModel.data.method;
            if(currMethod === "id-monthly-currency-expiry" || currMethod === "id-monthly-percent-percent-expiry" || currMethod === calculationMethods.ID_ANNUALLY_CURRENCY.value || currMethod === calculationMethods.ID_ANNUALLY_PERCENTAGE.value || currMethod === calculationMethods.AVERAGE.value){
            calculator.data.sources = calculationSources.getList(false);
            }
            else{
                calculator.data.sources = calculationSources.getList(true);
            }
       };


       calculator.handleGrid = function(){
            var currMethod = calculatorModel.data.method;
            if(currMethod !== "applyMR" && currMethod !== "applyAR" && (!calculator.state.hideResult ||  calculator.state.activePeriodDisplay || calculatorModel.data.periodSelection === "selected periods" || calculator.state.monthlyDisplay )){
               calculator.state.showGrid = true;
               //calculator.state.hideResult = false; 
               if(currMethod === "id-monthly-currency-expiry" || currMethod === "id-monthly-percent-percent-expiry"){
                    calculator.state.hideResult = true; 
                } 
            }
            else{
               calculator.state.showGrid = false;
            }
       };

       calculator.handleResults = function(){
            var currMethod = calculatorModel.data.method;
            if((currMethod !== "id-monthly-currency-expiry" && currMethod !== "id-monthly-percent-percent-expiry") && (calculatorModel.data.showUnit && parseInt(calculatorModel.data.unit) > 0) || (!calculatorModel.data.showUnit && parseInt(calculatorModel.data.unitType) > 0)){
                calculator.state.hideResult = false;
            }
            else{
                calculator.state.hideResult = true; 
            }
       }; 

       calculator.handleSource  = function(){
            if((calculatorModel.data.showUnit && parseInt(calculatorModel.data.unit) > 0) || (!calculatorModel.data.showUnit && parseInt(calculatorModel.data.unitType) > 0)){
                calculator.state.activePeriodDisplay = true;
            }
            else{
                calculator.state.activePeriodDisplay = false; 
            }
       };

       calculator.handleGridRows = function(){
             var currMethod = calculatorModel.data.method;
             switch (currMethod) {
                case calculationMethods.STRAIGHT_MONTHLY.value:
                case calculationMethods.STRAIGHT_ANNUALLY.value:
                case calculationMethods.QUARTERLY.value:
                case calculationMethods.MULTIPLICATION.value: 
                case calculationMethods.COMPOUND_CURRENCY.value:
                case calculationMethods.COMPOUND_PERCENTAGE.value:
                    calculator.state.hideResult = false;
                    calculator.handleSource();
                    break;
                case calculationMethods.AVERAGE.value:
                case calculationMethods.ID_MONTHLY_CURRENCY.value:
                case calculationMethods.ID_MONTHLY_PERCENTAGE.value:
                case calculationMethods.ID_ANNUALLY_CURRENCY.value:
                case calculationMethods.ID_ANNUALLY_PERCENTAGE.value:
                    calculator.handleResults();                    
                    calculator.handleSource();
                    break;
                case "applyMR":
                case "applyAR":
                    calculator.handleResults(); 
                    calculator.handleSource();
                    break;
            }
            calculator.handleGrid();
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
        };

        calculator.setSelectedSourceRowData = function(source) {
            if(calculator.state.aveCalculationSource) {
                calculatorModel.setSelectedSourceRowData(source);                    
            }
        };

        calculator.reset = function () {
            //defaultData.methods = calculationMethods.getList(false);
            calculationMethods.reset();
            calculator.data = angular.copy(defaultData);
            calculator.state = angular.copy(defaultStates);
            calculationSources.reset();
        };

     /*  calculator.addRentMethods = function(){
            calculator.data.methods.options.push({value:"applyMR", name:"Apply Market Rent", desc:"Apply Market Rent"});
            calculator.data.methods.options.push({value:"applyAR", name:"Apply Actual Rent", desc:"Apply Actual Rent"});
       }; */

/*       calculator.removeRentMethods  = function(){
            calculator.data.methods.options = [];
       };*/

        return calculator;
    }

    angular
        .module("budgeting")
        .factory("changeRentFormModel", [
            "changeRentModel",
            "changeRentMethods",
            "changeRentSources",
            "changeRentTranslatorSvc",
            changeRentFormModel
        ]);

})(angular);