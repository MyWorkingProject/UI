// Job Position Details Controller

(function () {
    "use strict";

    function JobPositionCtrl($scope, jobPosition, jpModel, jpStateModel, jpSvc, jpFormConfig,
            i18n, pageState, budgetDetails, notifSvc, asideModalInstance, rpWatchList) {
        var vm = this,
            model,
            state,
            formConfig,
            bmDetails;

        vm.init = function () {
            bmDetails = budgetDetails.getModelDetails(); //assumed that the parent already triggered the request

            vm.watchList = rpWatchList();
            vm.watchList.add($scope.$on("$destroy", vm.destroy));

            vm.formConfig = formConfig = jpFormConfig(vm);
            vm.model = model = jpModel(bmDetails, jobPosition.id);
            vm.state = state = jpStateModel(jobPosition);
            vm.translate = i18n.translate;

            if(state.mode == pageState.NEW) {
                vm.getJobPositions();
            } else {
                vm.getJobPositionDetail();                
            }            
        };

        vm.getJobPositions = function() {
            jpSvc.getJobPositionList(bmDetails.distributedID, bmDetails.propertyID)
                .then(vm.setJobPositions);
        };

        vm.setJobPositions = function(response) {
            // console.debug("Job Position List");
            // console.debug(response);

            if(response && response.records && response.records.length > 0) {
                model.setJobPositionList(response.records);
                formConfig.setOptions("jobTitle", response.records);
            } else {
                vm.state.addErrorMsg("Unable to get job position list"); //TODO JSLANG
            }

            vm.state.ready();            
        };

        vm.getJobPositionDetail = function() {
            jpSvc.getJobPositionDetails(bmDetails.propertyID, model.jobPositionID)
                .then(vm.setJobPositionDetail);
        };

        vm.setJobPositionDetail = function(response) {
            // console.debug("Job Position Details");
            // console.debug(response);

            if(response && response.records && response.records.length > 0) {
                model.setDetails(response.records[0]);
            } else {
                state.addErrorMsg("Unable to get job position details"); //TODO JSLANG
            }

            vm.state.ready();
        };

        vm.updateJobPositionDetails = function(jobPositionID) {
            model.setJobPosDetails(jobPositionID);
        };

        vm.destroy = function () {
            asideModalInstance.done(model.getResponseData());
            jpSvc.cancelRequests();
            //notifSvc.removeNotifications(); //TODO apply when pNotify has been updated

            vm.model.destroy();
            vm.watchList.destroy();
        };

        vm.save = function() {
            jpSvc.setJobPositionDetails(bmDetails.propertyID, model)
                .then(vm.updateParent);
        };

        vm.cancel = function() {
            if(vm.hasFormChanges()) {
                vm.closeModal(); //DELETEME
                //TODO confirm user to proceed
            } else {
                vm.closeModal();         
            }
        };

        vm.updateParent = function() {
            notifSvc.success("Successfully saved position detail"); 
            asideModalInstance.cancel();
        };

        vm.edit = function() {
            vm.state.setPageState(pageState.EDIT);
        };

        vm.hasFormChanges = function() {
            return vm.state.jobPositionDetailForm && vm.state.jobPositionDetailForm.$dirty;
        };

        vm.closeModal = function() {
            asideModalInstance.cancel();
        };

        vm.init();
    }

    angular
        .module("budgeting")
        .controller("JobPositionDetailsCtrl", [
            "$scope",
            "jobPosition",
            "jobPosDetailsModel",
            "jobPosDetailsStateModel",
            "jobPosDetailsSvc",
            "jobPosDetailsFormConfig",
            "jobPosDetailsTranslatorSvc",
            "pageState",
            "budgetDetails",
            "notificationService",
            "rpBdgtAsideModalInstance",
            "rpWatchList",
            JobPositionCtrl
        ]);
})();
