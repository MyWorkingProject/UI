//  SampleCg Controller

(function (angular) {
    "use strict";

    function ActualRentCapCtrl($scope, gridFactory, capModel, formConfig, errormodel, paramModel, asideModalInstance) {
        var vm = this;  
        vm.init = function () {
           vm.model = capModel;
           capModel.init(paramModel); 
           vm.formConfig = formConfig; 
           formConfig.setMethodsSrc(vm);
           formConfig.setData();  
           vm.gridFactory = gridFactory; 
           gridFactory.load();
           vm.destWatch = $scope.$on("$destroy", vm.destroy);    
        };

        vm.destroy = function () {
           vm.model = undefined;
           vm.gridFactory = undefined;
           vm.destWatch();  
        };

        vm.getKeyValue = function(key){
           return capModel.getKeyValue(key);
        };

        vm.capAmount = function (modelValue, viewValue) {
           return  capModel.isValidateAmount(modelValue);
        };

        vm.showHelpInfo = function(){
            
        };

        vm.getCapMethod = function(value){
            capModel.showGridData(value);
        };

        vm.close = function(){
             capModel.copyOriginalData();
             capModel.hideWarning();   
             asideModalInstance.done(paramModel);
        };

        vm.saveCapMethod = function(){
            capModel.hideWarning();
            var isZero = capModel.isZeroValues();
            if(capModel.isDataValid() && !isZero){
                capModel.saveData().then(vm.showMessage, errormodel.showSaveErrorNotification);
            }
            else if(isZero){
                capModel.showWarning();
            }
        };

        vm.showMessage = function(response){
            capModel.copyChangedData();
            capModel.getActualRentCap().success(capModel.setActualRentCapData);
            errormodel.showSaveSuccNotification();
        };

        vm.isValidCap = function(){
            return capModel.isValidCap();
        };
        
        vm.onContinue = function(){
            capModel.hideWarning();
            capModel.saveData().then(vm.showMessage, errormodel.showSaveErrorNotification);
        };

        vm.cancel = function(){
            capModel.hideWarning();
        };

        vm.init();
    }

    angular
         .module("budgeting")
         .controller("ActualRentCapCtrl", [
             "$scope", "actualRentCapFactory", "actualRentCapModel", "actual-rent-cap-config", "actualRentCapError", "actualRentParamModel", "rpBdgtAsideModalInstance",
             ActualRentCapCtrl]);
})(angular);

