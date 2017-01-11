// New Contract Wizard Controller

(function () {
    "use strict";

    function ContractDefineCtrl($scope, $stateParams, $location, $window, pageState,
                contractModel, vendorListModel, ptGridModel, propsGridModel, 
                contractValidator, contractSvc, notifSvc, i18n, rpWatchList, session) {
        var vm = this,
            notApplicableMsg = i18n.translate("bdgt_new_contract_na");

        vm.init = function () {
            vm.watchList = rpWatchList();
            vm.watchList.add($scope.$on("$destroy", vm.destroy));
            vm.formWatch = $scope.$watch("defineContractForm", vm.setForm); //watch one time only

            //contract
            vm.contract = contractModel;
            vm.validator = contractValidator;
            vm.contractForm = null;

            //vendor list options
            vm.vendor = vendorListModel;

            //texts used in the view
            vm.translate = i18n.translate;

            //determine contract status
            contractModel.state.page = $stateParams.state;
            contractModel.model.id = $stateParams.contractId || 0;

            if(!contractModel.isNew()) {
                contractSvc.getContractDetails(contractModel.model.id, vm.displayContractDetails, vm.errorContract);
            }
        };
        
        vm.setForm = function (form) {
            vm.contractForm = form;
            vm.formWatch();
        };

        vm.cancel = function() {
            //$window.history.back();
            vm.reset();
            vm.redirectToWorkspace();
        };

        vm.reset = function() {
            contractModel.reset();
        };

        vm.save = function() {
            var isValidPropertiesData = propsGridModel.isPropertiesDataValid();
            if (!isValidPropertiesData.isValid) {
                notifSvc.error(isValidPropertiesData.errMsg);
                return isValidPropertiesData.errMsg;
            }

            contractModel.model.properties = propsGridModel.getPropertiesData();
            contractModel.model.deletedProperties = propsGridModel.getContractPropertyDelete();
            
            var paramData = contractModel.getParameterData();    
            if(contractModel.isNew()) {
                // console.debug("Saving Contract: ");
                // console.debug(paramData);
                contractSvc.createContractDetails(paramData)
                    .then(vm.contractUpdateSuccess, vm.contractUpdateError);
            } else {
                // console.debug("Updating Contract: ");
                // console.debug(paramData);
                contractSvc.updateContractDetails(paramData)
                    .then(vm.contractUpdateSuccess, vm.contractUpdateError);
            }
                
        };

        vm.contractUpdateSuccess = function() {
            vm.resetFormStates();
            vm.redirectToWorkspace();            
        };

        vm.contractUpdateError = function () {
            notifSvc.error("bdgt_new_contract_new_contract_fail");
        };       

        vm.displayContractDetails = function(response) {
            if (!response || !response.data || !response.data.records) {
                notifSvc.error("bdget_contract_invalid_id");
                return;
            }

            contractModel.setContract(response.data.records);
            ptGridModel.initGridContent(
                    contractModel.state.page, 
                    contractModel.model.vendor.vendorID,
                    response.data.records.contractActivityList);
            //$scope.$apply();
        };

        vm.errorCallback = function() {
            notifSvc.error("bdget_contract_invalid_id");
        };

        vm.redirectToWorkspace = function() {
            $location.path("/workspaces/contracts"); //redirect to workspaces/contracts
        };

        //reset the form for any changes
        vm.resetFormStates = function () {
            if (vm.contractForm !== null) {
                vm.contractForm.$setPristine();
                vm.contractForm.$setUntouched();
            }
        };

        vm.addNewSchedule = function(flag) {
            contractModel.toggleAddSchedule(flag);
        };

        vm.destroy = function () {
            vm.reset();
            vm.watchList.destroy();
        };

        

        vm.init();
    }

    angular
        .module("budgeting")
        .controller("ContractDefineCtrl", [
            "$scope",
            "$stateParams",
            "$location",
            "$window",
            "pageState",
            "contractModel",
            "vendorListModel",
            "paymentTermsGridModel",
            "propertiesGridModel",
            "contractValidationSvc",
            "contractSvc",
            "contractNotifSvc",
            "contractTranslatorSvc",
            "rpWatchList",
            "sessionInfo",
            ContractDefineCtrl
        ]);
})();
