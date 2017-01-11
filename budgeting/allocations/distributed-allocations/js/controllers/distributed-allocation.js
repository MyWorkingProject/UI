(function (angular) {
    "use strict";

    function DistributedAllocationCtrl($scope,
        asideModalInstance,
        formModel,
        distributedSettingModel,
         svc,
        langTranslate, notifSvc) {

        var vm = this, translate, model;
        vm.distributedSettingModel = distributedSettingModel;

        vm.translate = langTranslate('allocations.distributed-allocations').translate;

        vm.init = function () {
            model = vm.model = formModel;
            vm.distributedSettingModelfunc({            
                modelType: distributedSettingModel.modelType,
                modelYear: distributedSettingModel.modelYear,
            });

        };
        vm.distributedSettingModelfunc = function (obj) {
            model.setmodel(obj);
        };

        //Distribute Allocation
        vm.submit = function (form) {
            var comments = model.getFormDetails();
            var params = {
                allocationID: distributedSettingModel.allocationID,
                allocationName: distributedSettingModel.allocationName,               
                modelType: distributedSettingModel.modelType,
                modelYear: distributedSettingModel.modelYear,
                amount: distributedSettingModel.amount,
                comments: comments,
                attachComment: true,
                budgetModelID: distributedSettingModel.budgetModelID
            };
            svc.distributeAllocation(params)
                .then(vm.distributeAllocationSucess)
                .catch(vm.distributeAllocationFail);
        };

        vm.distributeAllocationSucess = function () {
            notifSvc.success("Sucessfully Saved");
            asideModalInstance.done(distributedSettingModel);
        };

        vm.distributeAllocationFail = function () {
            notifSvc.error("Not Saved");
        };

        vm.close = asideModalInstance.cancel;

        return vm.init();
    }

    angular
        .module("budgeting")
        .controller("DistributedAllocationCtrl", [
            "$scope",
            "rpBdgtAsideModalInstance",
            "distributedFormModel",
            "distributedSettingModel",
            "DistributeAllocSvc",
            "appLangTranslate",
            "notificationService",
             DistributedAllocationCtrl]);
})(angular);