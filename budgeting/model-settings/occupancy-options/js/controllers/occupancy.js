(function () {
    "use strict";

    function OccupancyOptionsCtrl($scope, $stateParams, formModel, budgetDetails, 
            occupancyModel, occupancySvc, notifSvc, i18n, rpWatchList) {

        var vm = this,
            rpForm = formModel();

        vm.ocm = occupancyModel();
        vm.formConfig = vm.ocm.formConfig;
        vm.formData = vm.ocm.formData;
        vm.formState = vm.ocm.formState;
        vm.translate = i18n.translate;

        vm.init = function () {
            console.debug("INIT: BUDGET SETTINGS & ASSUMPTIONS > OCCUPANCY");
            vm.watchList = rpWatchList();
            vm.watchList.add($scope.$on("$destroy", vm.destroy));

            //budgetDetails.events.update.subscribe(vm.getOccupancyOptions);
            //if(budgetDetails.ready){
            //    vm.getOccupancyOptions(budgetDetails.getModelDetails());
            //}
            vm.getOccupancyOptions(budgetDetails.getModelDetails());
        };

        vm.getOccupancyOptions = function(bmDetails) {
            occupancySvc.getOccupancyOptions($stateParams.distID)
                .then(vm.setOccupancySetup);

            vm.ocm.init(bmDetails);
            rpForm.setData(vm.ocm.model);
        };

        vm.setOccupancySetup = function(response) {
            if(!response || !response.records) {
                console.warn("No records found.");
                return; //TODO show eror message?
            }

            vm.ocm.initData(response.records);
        };

        vm.save = function() {
            if (vm.ocm.form.$invalid) {
                vm.ocm.form.$setSubmitted();
            }
            else {
                var paramData = vm.ocm.getParamData();
                // console.debug("Saving: ");
                // console.debug(paramData);

                occupancySvc.updateOccupancyOptions(paramData)
                    .then(vm.saveSuccess, vm.saveError);
            }            
        };

        vm.cancel = function() {
            vm.ocm.initData(vm.ocm.options.getModel(), true); //reassign old values to cancel pending changes
            vm.ocm.toggleFormDisplay(false);
        };

        vm.saveSuccess = function(response) {
            notifSvc.success(i18n.translate("save_success"));
            vm.ocm.toggleFormDisplay(false);
            budgetDetails.forceLoad();
        };

        vm.saveError = function() {
            notifSvc.error(i18n.translate("save_error"));
        };

        vm.destroy = function () {
            rpForm.reset();
            
            vm.ocm.destroy();
            vm.watchList.destroy();

            console.debug("DESTROYED: BUDGET SETTINGS & ASSUMPTIONS > OCCUPANCY");
        };        

        vm.editOccupancyOpt = function() {
            vm.ocm.toggleFormDisplay(true);
        };



        vm.init();
    }

    angular
        .module("budgeting")
        .controller("OccupancyOptionsCtrl", [
            "$scope",
            "$stateParams",
            "baseForm",
            "budgetDetails",
            "occupancyModel",
            "occupancySvc",            
            "notificationService",
            "occTranslatorSvc",
            "rpWatchList",
           
            OccupancyOptionsCtrl
        ]);
})();
