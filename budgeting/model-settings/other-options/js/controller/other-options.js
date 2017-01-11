(function (angular) {
    "use strict";

    function OtherOptionsCtrl($scope, model, $stateParams, formManager,formConfig ,formData, timeout,validateModel,budgetDetails ) {        
       

        var vm = this,body, btnClick;
        var distID = $stateParams.distID;

        vm.init = function () {
            vm.model = model;
            body = body || angular.element('body');
            btnClick = 'click.toggleMenu';
            vm.setFormConfiguration(); 

           //budgetDetails.events.update.subscribe(vm.loadOtherOptions);          
           //if(!budgetDetails.ready){
           //      budgetDetails.getPropertyInfo($stateParams.distID);
           // }
           // else{
           //      vm.loadOtherOptions(budgetDetails.getModelDetails());
            // }   
            vm.loadOtherOptions(budgetDetails.getModelDetails());
            
        };

        vm.loadOtherOptions=function(data){
            model.getOtherOptionsData(distID);
            model.checkForFinalize(data);
            $scope.$on('$destroy', vm.destroy);
        };

        vm.setFormConfiguration=function(){
            vm.formData = formData;
            vm.formConfig = formConfig;
            formConfig.setMethodsSrc(vm);
        };
      

        vm.destroy = function () {
            vm = undefined;
            model.reset();
        };
        
        //Year Validation
        vm.checkYear = function (modelValue, viewValue) {
            return validateModel.isValidateYear();
        };
        
         vm.onYearChange = function () {
            timeout($scope.frmOtherOptions.yearBuilt.$validate);
        };

         //attachedGarages Validation
        vm.chkAttachedGarages = function (modelValue, viewValue) {
            return validateModel.isValidateAssumptions(formData.attachedGarages);
        };
        
         vm.onAttachedGarageChange = function () {
            timeout($scope.frmOtherOptions.attachedGarages.$validate);
        };

        //storage Units Validation
        vm.chkStorageUnits = function (modelValue, viewValue) {
            return validateModel.isValidateAssumptions(formData.storageUnits);
        };
        
         vm.onStorageUnitsChange = function () {
            timeout($scope.frmOtherOptions.storageUnits.$validate);
        };
        
        //detachedGarages Validation
        vm.chkDetachedGarages = function (modelValue, viewValue) {
            return validateModel.isValidateAssumptions(formData.detachedGarages);
        };
        
         vm.onDetachedGaragesChange = function () {
            timeout($scope.frmOtherOptions.detachedGarages.$validate);
        };

       //carports Validation
        vm.chkCarports = function (modelValue, viewValue) {
            return validateModel.isValidateAssumptions(formData.carports);
        };
        
         vm.onCarportsChange = function () {
            timeout($scope.frmOtherOptions.carports.$validate);
        };

         //payrollIncreaseDate Validation
        vm.chkPayrollIncrease = function (modelValue, viewValue) {
            return validateModel.isValidatePayrollPercent(formData.payrollIncreasePercent);
        };
      
        
         vm.onPayrollPercentChange = function () {
            timeout($scope.frmOtherOptions.payrollIncreasePercent.$validate);
        };

          /* Product tool tip */

         vm.showProductToooltip = function(){
            model.showProductToooltip();
            timeout(vm.bindMenu);
        };

          vm.bindMenu = function () {
            if (model.getProductToooltip()) {
                vm.bindMenuClick();
            }
        };

        vm.bindMenuClick = function () {
            body.on(btnClick, vm.hideMenu);
        };

        vm.unbindMenuClick = function () {
            body.off(btnClick);
        };

        vm.hideMenu = function () {
            $scope.$apply(function () {              
                model.setProductToooltip(false);
                vm.unbindMenuClick();
            });
        };


        vm.getLangValue = model.getLangValue;

        vm.saveOtherOptions = function (form) {
            var data, id;
           // model.isValidData();          
                if (form.$invalid) {
                     form.$setSubmitted(); 
                }
                else{
                    model.saveData(distID);               
                }
            
        };

        vm.showFormErrors = function () {
            vm.form.setTouched();
        };

        vm.cancel=function(){
            model.cancel();
            vm.loadOtherOptions(budgetDetails.getModelDetails());
        };

        vm.showForm=function(){
            model.showForm();
        };

        vm.init();
    }

    angular
        .module("budgeting")
        .controller("OtherOptionsCtrl", [
            "$scope",
            'manageOtherOptionsModel',
            '$stateParams',
            'rpFormManager',
            'options-form-config', 
            'options-form-data',
            '$timeout',
            'validateModel',
            'budgetDetails',
            OtherOptionsCtrl
        ]);
})(angular);
