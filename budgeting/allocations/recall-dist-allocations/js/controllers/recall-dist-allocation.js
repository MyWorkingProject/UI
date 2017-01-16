//Recall Distributed Allocation Controller
(function (angular) {
    "use strict";

    function RecallDistAllocationCtrl($scope,
        $stateParams,
        asideModalInstance,
        recallDistAllocationsContent,
        recallDistModel,
        recallDistGridConfig,
        recallDistAllocationSvc,
        errorHandling,
        recallDistSettingModel,
        alertModal,
        budgetDetails,
        $filter) {

        var vm = this, model, confirmModal;
        vm.fieldLabels = recallDistAllocationsContent;
        vm.recallDistSettingModel = recallDistSettingModel;
        vm.init = function () {
            var gridConfig = recallDistGridConfig(recallDistSettingModel.isHistory)
                                .setSrc(vm);
            $scope.$on("$destroy", vm.destroy);
            model = vm.model = recallDistModel(gridConfig, recallDistSettingModel.isHistory);
            vm.getRecallDistAllocations()
                  .then(model.setGridData);
            vm.isDisable = true;
        };

        vm.getRecallDistAllocations = function () {
            return recallDistAllocationSvc.getRecallDistAllocations(recallDistSettingModel.allocationID);
        };

        vm.getRecallDistAllocationsHistory = function () {
            var params = {
                distributedID: $stateParams.distID
            };
            return recallDistAllocationSvc.getRecallDistAllocations(params);
        };

        vm.recallDistAllocations = function () {
            vm.selectedAllcoationList = model.getSelectedList($stateParams.distID);
            if( vm.selectedAllcoationList.length > 0 ){
                if(budgetDetails.getModelDetails().isFinal){
                    var finalizeCount = $filter("sumByKey")(vm.model.grid.data.records, 'finalizeCount');
                    vm.showConfirmMessage(vm.fieldLabels.FinalizeAlertTitle, finalizeCount + vm.fieldLabels.FinalizeAlertMessage, vm.fieldLabels.FinalizeConfirmMessage);
                }
                else{
                    vm.showConfirmMessage(vm.fieldLabels.AlertTitle, vm.fieldLabels.AlertMessage, vm.fieldLabels.AlertConfirmMessage);
                }
            }
            else{
                vm.showRecallDistAllocationError('please select at least one allocation..');
            }
        };

        vm.showConfirmMessage = function(title, message, confirmMessage){
            confirmModal = alertModal.confirm({ templateUrl: vm.fieldLabels.AlertTemplareUrl }).accept(vm.onConfirm).reject(vm.onReject);
            confirmModal.setContent({
                    title: title,
                    message: message,
                    confirmMessage: confirmMessage,
                    btnAcceptText: recallDistAllocationsContent.AlertOK,
                    btnRejectText: vm.fieldLabels.Cancel
                }).show();
        };

        vm.onConfirm = function () {
            //var selectedList = model.getSelectedList($stateParams.distID);
            logc(JSON.stringify(vm.selectedAllcoationList));
            recallDistAllocationSvc.recallDistAllocations(vm.selectedAllcoationList).then(function (response) {
                vm.showRecallDistAllocationSuccess();
            }, function (error) {
                vm.showRecallDistAllocationError('Error occured while recalling allocation..');
            });
        };

        vm.onReject = function () {
            //vm.destroy();
        };


        vm.showRecallDistAllocationSuccess = function () {
            errorHandling.showRecallDistAllocationSuccess();
            asideModalInstance.done(recallDistSettingModel);
        };

        vm.showRecallDistAllocationError = function (message) {
            errorHandling.showRecallDistAllocationError(message);
        };

        vm.destroy = function () {
            //confirmModal.destroy();
        };



        vm.close = asideModalInstance.cancel;

        vm.init();
    }

    angular
        .module("budgeting")
        .controller("RecallDistAllocationCtrl", [
            "$scope",
            "$stateParams",
            "rpBdgtAsideModalInstance",
            "recallDistAllocationsContent",
            "recallDistGridModel",
            "recallDistGridConfig",
            "recallDistAllocationSvc",
            "recallDistErrorHandling",
            "recallDistSettingModel",
            "rpBdgtModalService",
            "budgetDetails",
            "$filter",
             RecallDistAllocationCtrl]);
})(angular);