//  Budget Model Allocation CONTROLLER

(function (angular) {
    function BdgtManageAllocationsCtrl($scope, $state, gridModel,
          allocationContent, actions, asideModal, gridConfig, svc, budgetDetails, modal, notifSvc) {

        // initialization of controller

        var vm = this, model, distributedAllocationAside, recallDestAllocationAside, budgetModel, alertModal;// confirmModal;

        vm.fieldLabels = allocationContent;

        vm.init = function () {
            model = vm.model = gridModel;
            actions.setSrc(vm);
            gridConfig.setSrc(vm);

            budgetModel = budgetDetails.getModelDetails();
            vm.dataList = {
                propertyID: budgetModel.propertyID, //1192563
                budgetModelID: budgetModel.budgetModelID //51
            };

            /* confirmModal = modal
                  .confirm()
                  .setContent({
                      title: "Cannot Delete Allocation",
                      message: "You cannot delete an allocation already distributed to the properties. ",
                      btnAcceptText: "Proceed",
                      btnRejectText: "Cancel"
                  })
                  .accept(vm.onConfirm)
                  .reject(vm.onReject); */

            alertModal = modal
               .alert()
               .setContent({
                   title: allocationContent.alertpopupTitleInfo,// "Cannot Delete Allocation",
                   message: allocationContent.alertpopupMessageInfo,//"You cannot delete an allocation already distributed to the properties.",
                   btnOkText: allocationContent.alertpopupBtnInfo//"Cancel"
               });


            recallDestAllocationAside = asideModal('recallDestAllocation');
            distributedAllocationAside = asideModal('distributedAllocation');
            vm.getManageAllocationList();

            vm.destWatch = $scope.$on("$destroy", vm.destroy);

            return vm;
        };



        vm.onConfirm = function (record) {
            var params = {
                allocationID: record.data.allocationID
            };
            if (record.data.isDistributed === false) {
                svc.deleteAllocation(params).then(vm.deleteAllocationSuccess)
                .catch(vm.deleteAllocationFail);
            }
            else {
                // If allocation is distributed restrict delete
                alertModal.show();
            }


        };
        vm.deleteAllocationSuccess = function () {
            vm.success();
        };

        vm.deleteAllocationFail = function () {
            notifSvc.error("Not Deleted");
        };

        vm.success = function () {
            vm.getManageAllocationList();
            notifSvc.success("Sucessfully Deleted");
        };

        vm.getManageAllocationList = function () {
            svc.getManageAllocationList(vm.dataList).then(model.setGridData);
        };

        vm.navigateto = function (record) {
            $state.go('allocations.allocation', { allocationID: record.allocationID, isSiteLevel: record.isSiteLevel, type: 'view' });
        };

        vm.MngAllGridActionView = function (record) {
            $state.go('allocations.allocation', { allocationID: record.data.allocationID, isSiteLevel: record.data.isSiteLevel, type: 'view' });
        };

        vm.MngAllGridActionCopy = function (record) {
            $state.go('allocations.allocation', { allocationID: record.data.allocationID, isSiteLevel: record.data.isSiteLevel, type: 'copy' });
        };

        vm.MngAllGridActionEdit = function (record) {
            $state.go('allocations.allocation', { allocationID: record.data.allocationID, isSiteLevel: record.data.isSiteLevel, type: 'edit' });
        };

        vm.MngAllGridActionRecall = function (record) {

            vm.showRecallDestributedAllocation(record, false);
        };

        vm.MngAllGridActionHistory = function (record) {
            vm.showRecallDestributedAllocation(record, true);
        };

        vm.showRecallDestributedAllocation = function (record, isHistory) {
            var resolve = {
                recallDistSettingModel: function () {
                    return {
                        allocationID: record.data.allocationID,
                        isHistory: isHistory//record.actionParam === 'recall-history' ? true : false
                    };
                }
            };
            recallDestAllocationAside
                    .resolve(resolve)
                    .show();
        };

        vm.MngAllGridActionDistribute = function (record) {
            vm.showDestributedAllocation(record);
        };
        vm.showDestributedAllocation = function (record) {
            var resolve = {
                distributedSettingModel: function () {
                    return {
                        allocationName: record.data.name,
                        allocationID: record.data.allocationID,
                        modelType: budgetModel.budgetType,
                        modelYear: budgetModel.budgetYear,
                        budgetModelID: budgetModel.budgetModelID,
                        amount: record.data.amount
                    };
                }
            };
            distributedAllocationAside
                .resolve(resolve)
                .show();
        };


        vm.MngAllGridActionDelete = function (record) {

            /*confirmModal.setResult({
                accept: {
                    allocationID: record.data.allocationID
                },
                reject: {}
            }).show(); */


            vm.onConfirm(record);

        };

        vm.newAllocations = function () {
            $state.go('allocations.allocation', { allocationID: 0, isSiteLevel: true, type: 'new' });
        };

        vm.destroy = function () {
            distributedAllocationAside.destroy();
            recallDestAllocationAside.destroy();
            alertModal.destroy();
            vm = undefined;
        };

        return vm.init();
    }

    angular
        .module("budgeting")
        .controller('BdgtManageAllocationsCtrl', [
            '$scope',
            '$state',
            'allocationModelGridFactory',
            'manageAllocationsContent',
            'manageAllocationActions',
            'rpBdgtAsideModalService',
             'allocationsConfig',
             'bdgtModelAllocationSvc',
             'budgetDetails',
              'rpBdgtModalService',
               "notificationService",
             BdgtManageAllocationsCtrl
        ]);
})(angular);
