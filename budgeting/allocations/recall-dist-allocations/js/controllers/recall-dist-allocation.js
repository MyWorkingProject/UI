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
        alertModal) {

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
            confirmModal = alertModal.confirm().accept(vm.onConfirm).reject(vm.onReject);
            confirmModal.setContent({
                title: vm.fieldLabels.AlertTitle,
                message: vm.fieldLabels.AlertMessage,
                btnAcceptText: recallDistAllocationsContent.AlertOK,
                btnRejectText: vm.fieldLabels.Cancel
            }).show();
        };

        vm.onConfirm = function () {
            var selectedList = model.getSelectedList($stateParams.distID);
            logc(JSON.stringify(selectedList));
            recallDistAllocationSvc.recallDistAllocations(selectedList).then(function (response) {
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
            asideModalInstance.done(recallDistSettingModel);
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
             RecallDistAllocationCtrl]);
})(angular);