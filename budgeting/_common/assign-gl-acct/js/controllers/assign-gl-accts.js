// Assign GL Accounts Controller

(function () {
    "use strict";

    function AssignGLAcctsCtrl($scope, assignGLParams, agaModel, agaGridConfig, assignGlsSvc,
            i18n, asideModalInstance, rpWatchList) {
        var vm = this,
            model;

        vm.init = function () {
            vm.watchList = rpWatchList();
            vm.watchList.add($scope.$on("$destroy", vm.destroy));

            var gridConfig = agaGridConfig();
                gridConfig.setSrc(vm);

            var hasOverwriteOpt = true;
            if(assignGLParams.hasOverwriteOption !== null && assignGLParams.hasOverwriteOption !== undefined) {
                hasOverwriteOpt = assignGLParams.hasOverwriteOption;
            }

            vm.model = model = agaModel(gridConfig);
            vm.translate = i18n.translate;
            vm.state = {
                isReady: false,
                errorMessage: false,
                assignGLsForm: null,
                hasOverwriteOpt: hasOverwriteOpt
            };

            vm.getChartOfAccounts();
        };

        vm.getChartOfAccounts_old = function() {
            if(assignGLParams && assignGLParams.masterChartIDs && assignGLParams.masterChartIDs.length > 0) {
                var masterChartIDs = assignGLParams.masterChartIDs.join(",");
                assignGlsSvc.getChartOfAccts(masterChartIDs)
                    .then(vm.setGridContent);

            } else {
                vm.state.errorMessage = i18n.translate("aga_err_no_properties");
            }
        };

        vm.getChartOfAccounts = function() {
            if(assignGLParams && assignGLParams.masterChartIDs && assignGLParams.masterChartIDs.length > 0) {
                if(assignGLParams.masterChartData && assignGLParams.masterChartData.records.length > 0){
                    vm.setGridContent(assignGLParams.masterChartData);
                }
                else{
                    var masterChartIDs = assignGLParams.masterChartIDs.join(",");
                    assignGlsSvc.getChartOfAccts(masterChartIDs)
                        .then(vm.setGridContent);
                }

            } else {
                vm.state.errorMessage = i18n.translate("aga_err_no_properties");
            }
        };

        vm.setGridContent = function(response)  {
            if(response && response.records && response.records.length > 0) {
                model.setGridData(response);
                vm.state.isReady = true;
            } else {
                vm.state.errorMessage = i18n.translate("aga_err_no_master_charts");
            }
        };


        vm.destroy = function () {
            assignGlsSvc.cancelRequests();

            vm.model.destroy();
            vm.watchList.destroy();
        };

        vm.assignGLAcct = function() {
            var responseData = model.getResponseData();
            asideModalInstance.done(responseData);
        };

        vm.cancel = function() {
            if(vm.hasFormChanges()) {
                vm.closeModal(); //DELETEME
                //TODO confirm user to proceed
            } else {
                vm.closeModal();         
            }
        };

        vm.hasFormChanges = function() {
            return vm.state.assignGLsForm && vm.state.assignGLsForm.$dirty;
        };

        vm.closeModal = function() {
            asideModalInstance.cancel();         
        };

        vm.init();
    }

    angular
        .module("budgeting")
        .controller("AssignGLAcctsCtrl", [
            "$scope",
            "assignGLParams",
            "assignGLsModel",
            "assignGLsGridConfig",
            "assignGLAcctsSvc",
            "assignGLsTranslatorSvc",
            "rpBdgtAsideModalInstance",             
            "rpWatchList",
            AssignGLAcctsCtrl
        ]);
})();
