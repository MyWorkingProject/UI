(function (angular) {
    "use strict";

    function BdgtImprtCtrl($scope, $state, $stateParams, $location, model, errModel, wiznav) {
        var vm, chartID;
        vm = this;

        vm.init = function () {
            vm.model = model;
            model.setChartID($stateParams.chartID);
            model.isWizardUpdate($location.absUrl());
            model.getBreadcrumbs(model.getChartID()).then(model.updateBreadCrumb, errModel.getChartDataError);
            model.getActiveImportOptions().then(model.updateActiveImportOptions);
            $scope.$on('$destroy', vm.delStagingData);
            if (model.isWizard()) {
                vm.setCompletedSteps();
            }
        };

        vm.delStagingData = function () {
            model.delStagingData().then(vm.reset, errModel.delStagingDataError);
        };

        vm.reset = function (resp) {
            model.reset();
            errModel.reset();
        };

        vm.loadNextView = function () {
            model.loadNextView();
        };

        vm.setCompletedSteps = function () {
            wiznav.complete('step1', true);
            wiznav.complete('step2', false);
            wiznav.complete('step3', false);
            wiznav.complete('step4', false);
        };

        vm.backClick = function () {
            wiznav.complete('step1', false);
            wiznav.prev();
        };

        vm.nextClick = function () {
            model.updateWizStep(model.getReqData()).then(vm.moveNext, errModel.updateWizStepError);
        };

        vm.moveNext = function (resp) {
            //wiznav.complete('step2', true);
            wiznav.enable('step3', true);
            wiznav.next();
        };

        vm.init();
    }
    angular
        .module("budgeting")
        .controller('BdgtImprtCtrl', ['$scope', '$state', '$stateParams', '$location', 'importGLModel', 'importGlAccMsgModel', 'rpWizardNavModel', BdgtImprtCtrl]);
})(angular);
