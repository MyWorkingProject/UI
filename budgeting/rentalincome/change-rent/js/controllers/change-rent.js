//  SampleCg Controller

(function (angular) {
    "use strict";

    function ChangeRentCtrl($scope, changeRentParamData, changeRentModel, /*, changeRentFormModel, changeRentGridModel,*/ calculator, i18n, formConfig, asideModalInstance) {
        var vm = this;  
        vm.init = function () {
           vm.model =  changeRentModel;
           vm.calculator =  calculator;
           vm.formConfig = formConfig;
           formConfig.setMethodsSrc(vm);  
           calculator.init(changeRentParamData); 
           calculator.initDisplay(); 
           vm.destWatch = $scope.$on("$destroy", vm.destroy); 
        };

        vm.saveAndClose = function() {
            var updatedGrid = calculator.saveAndClose();
            asideModalInstance.done({
                "resultsGrid": updatedGrid,
                "selectedMethod": changeRentModel.getSelectedData(),
                "selectedPeriods": changeRentModel.getApplyChangesRowData(),
            });
        };

        vm.close = function() {
            asideModalInstance.cancel();
        }; 
        
        vm.destroy = function() {
            //vm.watchList.destroy();
            vm.calculator.reset();
            vm.calculator = null;  
            vm.model = null;
            vm.destWatch();              
        };

       vm.methodChange = function(){
            calculator.periodChange();
            calculator.form.prepareCalculator();
       };

       vm.unitTypeChange = function(val){
            calculator.updateUnitData(val);
            //calculator.form.handleResults();
            if(calculator.isUnitType()){
              changeRentModel.setSourceRowData(calculator.getSourceRowData(val, 0), calculator.getPeriods());
            } 
            calculator.form.handleGridRows();
       };
        
      vm.unitChange = function(val){
        //calculator.form.onUnithandleResults(); 
        changeRentModel.setSourceRowData(calculator.getSourceRowData(changeRentModel.getSelectedUnitType(), val), calculator.getPeriods());
        calculator.form.handleGridRows();
      };  

      vm.periodChange = function(val){
         changeRentModel.resetApplyChangesRowData();
         calculator.form.showApplyChange(val);
         changeRentModel.showExpirePeriod(val);
         calculator.form.handleGrid();   
      };

      vm.expireChange = function(val){
            
      };      

      vm.amnt1Change = function(val) {
        changeRentModel.roundAmnt1(val);
      }; 

      vm.amnt2Change = function(val) {
        changeRentModel.roundAmnt2(val);
      };   

        vm.translate = i18n.translate;
        vm.calculator = calculator;
        vm.init();
    }

    angular
         .module("budgeting")
         .controller("ChangeRentCtrl", [
             "$scope", 
            "changeRentParamData",
           "changeRentModel",
             /*"changeRentFormModel",
            "changeRentGridModel",*/
            "changeRentCalc",
            "changeRentTranslatorSvc",
            "changeRentFormConfig",
            "rpBdgtAsideModalInstance",
             ChangeRentCtrl]);
})(angular);

