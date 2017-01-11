(function(angular, jQuery) {
    "use strict";

    var DefaultAdjController = function($scope, $stateParams, selectedDefaultAdjModel, 
            budgetDetails, defaultAdjModel, defaultAdjGridModel, defaultAdjFormConfig, 
            i18n, asideModalInstance, rpWatchList, notifSvc) {
        var vm = this;

        vm.init = function() {
            vm.watchList = rpWatchList();
            vm.watchList.add($scope.$on("$destroy", vm.destroy));

            vm.defAdj = defaultAdjModel;
            vm.defaultAdjGrid = defaultAdjGridModel;
            vm.translate = i18n.translate;

            defaultAdjFormConfig.setMethodsSrc(vm);

            //watch one time only
            vm.formWatch = $scope.$watch("defaultAdjustmentForm", vm.setForm);

            return vm;
        };

        vm.setForm = function(form) {
            vm.formWatch();

            //set the form to submitted to force the textboxes to auto-check
            $scope.defaultAdjustmentForm.$setSubmitted();
        };

        vm.initDisplay = function() {
            var bmDetails = budgetDetails.getModelDetails(), //assumed that the data has been retrieved by the parent
                bmAccess = budgetDetails.getAccessPrivileges(),
                data = defaultAdjModel.setGridData(bmDetails, selectedDefaultAdjModel);

            var adjRow = defaultAdjModel.getAdjustmentRow();
            adjRow.adjustmentForAll = defaultAdjFormConfig.adjustmentForAll;

            defaultAdjGridModel.initGrid(bmDetails.budgetYear, bmDetails.startMonth, bmDetails.noOfPeriods);
            defaultAdjGridModel.populateGrid(data);

            if (!bmAccess.allowEdit) {
                defaultAdjModel.finalBudgetModel();
            }

            return vm;
        };

        vm.adjustAllPercentages = function(val) {
            var isNum = vm.validateNumbers(val);
            if (isNum) {
                defaultAdjModel.adjustPercentageValues(val);
            }
        };

        vm.validateNumbers = function(val) {
            if (val === undefined || val === null) {
                return true; //not required, so empty is valid
            }

            var convertedVal = Number(val);
            if (isNaN(convertedVal)) {
                return false;
            }
            return true;
        };

        vm.applyChanges = function() {
            asideModalInstance.done(defaultAdjModel.getReturnData());
        };

        vm.close = function() {
            asideModalInstance.cancel();
        };

        vm.reset = function() {
            //TODO
        };

        vm.destroy = function() {
            vm.reset();
            vm.watchList.destroy();
        };

        vm
            .init()
            .initDisplay();
    };

    angular
        .module("budgeting")
        .controller("DefaultAdjCtrl", [
            "$scope",
            "$stateParams",
            "selectedDefaultAdjModel",
            "budgetDetails",
            "defaultAdjModel",
            "defaultAdjGridModel",
            "defaultAdjFormConfig",
            "defaultAdjTranslatorSvc",
            "rpBdgtAsideModalInstance",             
            "rpWatchList",
            "notificationService",
            DefaultAdjController
        ]);
})(angular, $);