(function (angular) {
    "use strict";

    function LeaseOptionsCtrl($scope, $filter, model,  budgetDetails, timeout, $stateParams, leaseError,formConfig) {
        var vm = this,body, btnClick;
     

        vm.init = function () {
            vm.model = model;
            body = body || angular.element('body');
            btnClick = 'click.toggleMenu';
            model.setDistributedID($stateParams.distID);
           // model.updateReferenceOptions(budgetDetails.getModelDetails()); //Comment this code when details code is checkd in
           // vm.getLeaseOptionsDetails(); //Comment this code when details code is checkd in
            vm.formConfig=formConfig;
           //budgetDetails.events.update.subscribe(vm.getLeaseOptions);          
           //if(!budgetDetails.ready){
           //         budgetDetails.getPropertyInfo($stateParams.distID);
           // }
           // else{
           //       vm.getLeaseOptions(budgetDetails.getModelDetails());
            // } 
            vm.getLeaseOptions(budgetDetails.getModelDetails());

          /*  if (budgetDetails.ready) {
                vm.getLeaseOptions(budgetDetails.getModelDetails());
            }
            else {
                budgetDetails.events.update.subscribe(vm.getLeaseOptions);
            } */
            $scope.$on('$destroy', vm.destroy);
        };

        vm.getLeaseOptions = function(data){
            vm.getLeaseOptionsDetails();
            model.updateReferenceOptions(data);
              model.checkForFinalize(data);
            model.setOptionsForSelect();
           
        };

        vm.getLeaseOptionsDetails = function(){
            model.getLeaseOptionsDetails().then(model.setLeaseDetails,leaseError.onGetError);
        };

        vm.destroy = function () {
            model.reset();
            vm = undefined;
        };

        vm.saveLeaseOptions = function () {
            if($scope.editableForm.$valid){
                model.setEditMode(false);
                model.saveLeaseOptionsDetails().then(vm.onSaveSuccess,leaseError.onPutError);
            }
        };

        vm.onSaveSuccess = function (data) {
            leaseError.showSaveSuccNotification(data);
            budgetDetails.forceLoad();
        };

        vm.showMarktMIToooltip = function(){
            model.showMarktMIToooltip();
            timeout(vm.bindMenu);
        };

        vm.showMarktLRToooltip = function(){
            model.showMarktLRToooltip();
            timeout(vm.bindMenu);
        };

        vm.showRFToooltip = function(){
            //model.setRFToooltip(false);
            model.showRFToooltip();
            timeout(vm.bindMenu);
        };

         vm.bindMenu = function () {
            if (model.getRFToooltip() || model.getMarktLRToooltip() || model.getMarktMIToooltip()) {
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
                model.setRFToooltip(false);
                model.setMarktLRToooltip(false);
                model.setMarktMIToooltip(false);
                vm.unbindMenuClick();
            });
        };

        vm.getLangValue = model.getLangValue;

        vm.cancel=function(){

        };

        vm.onEdit=function(){
            model.onEdit();
        };

        vm.onCancel=function(){
            model.onCancel();
            vm.getLeaseOptions(budgetDetails.getModelDetails());
        };

        vm.init();
    }

    angular
        .module("budgeting")
        .controller("LeaseOptionsCtrl", [
            "$scope",
            "$filter",
            "LeaseOptionsModel",          
            "budgetDetails",
            "$timeout",
            "$stateParams",
            "LeaseOptionsError",
            "lease-option-config",
            LeaseOptionsCtrl
        ]);
})(angular);
