(function (angular) {
    "use strict";

    function RentOptionsCtrl($scope, $filter, model, budgetDetails, rentOption, $location, saveRentOptions, validateAffordable, validateConventional, validateSeniorLiving, formConfig, $stateParams, timeout) {
        var vm = this, body, btnClick;
      

        vm.init = function () { 
           vm.onReady(budgetDetails.getModelDetails());
        };

        vm.onReady=function(data){    
           vm.getRentOptions();
           formConfig.setMethodsSrc(vm);
           vm.formConfig=formConfig;
           model.checkForFinalize(data);
           $scope.$on('$destroy', vm.destroy);
        };

        vm.getRentOptions=function(){
            var promise = model.getRentOptions();
            promise.then(vm.loadInitInfo);
        };
      

       vm.loadInitInfo=function(data){                 
           vm.model = model;
           body = body || angular.element('body');
           btnClick = 'click.toggleMenu';
            model.isRentOptionReady(false);          
            rentOption.setRentOptions(data);  
            model.loadInputSettings(data);
            model.loadConfigOptions();
            vm.updateModelFlagsByCondition(data.records.rentOptions);
            vm.updateLGModelFlagsByCondition(data.records.rentOptions);
            model.setLabelOnEdit(data.records.rentOptions);
            rentOption.prepareFormData(); 
            vm.rentOptions=rentOption.getRentOptionObject();
            model.hasShowEditRights(data);
            vm.rentModelSettings=rentOption;         
            model.isRentOptionReady(true);
        };

        /* Call's from view */
        vm.updateGLModel=function(data){
            rentOption.PerformAddGLOption(data);
            rentOption.showHideGLLink(data);           
        };

        vm.prepareFormData=function(){ 
             rentOption.setControlsByAssetType();
            rentOption.addExtraPropToData();
            rentOption.addGLCondByAssetType();
          
        };

        vm.destroy = function () {
            vm = undefined;
            model.reset();
            rentOption.reset();
            validateAffordable.reset();
            validateConventional.reset();
            validateSeniorLiving.reset();
        };

        vm.saveRentOptions = function () {
          saveRentOptions.saveRentOption(rentOption.getRentOptionObject());
           
        };

        vm.removeRow=function(index,data){
               data.remove(index);
               rentOption.showHideGLLink(data);               
        };

        vm.updateModelFlagsByCondition=function(data){
            var rentOptions=model.getRentOpData(rentOption.getRentOptionObject());                  
            model.validateInputType(rentOptions);
            model.loadInputTypes();
           //  model.loadConfigOptions();
            rentOption.updateModelFlagsByCondition(rentOptions);
        };
 
       vm.updateLGModelFlagsByCondition=function(data){
             var rentOptions=model.getRentOpData(rentOption.getRentOptionObject());   
            rentOption.updateModelFlagsByCondition(rentOptions);
        };

        vm.convertTodecimals=function(obj){
          rentOption.convertToDecimals(obj);
        };

        vm.cancel=function(){
            model.cancel();
            vm.onReady(budgetDetails.getModelDetails());
        };
        
        vm.showForm = function () {
            vm.onReady(budgetDetails.getModelDetails());
            model.showForm();
        };

        vm.showProductToooltip = function () {
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

        vm.init();
    }

    angular
        .module("budgeting")
        .controller("RentOptionsCtrl", [
            '$scope',
            '$filter',
            'RentOptionsModel',           
            'budgetDetails',           
            'RentOptionSettings',
            '$location',
            'RentOptionsSave',
            'validateAffordable',
            'validateConventional',
            'validateSeniorLiving',
            'rent-option-config',
            '$stateParams',
            '$timeout',
            RentOptionsCtrl
        ]);
})(angular);
