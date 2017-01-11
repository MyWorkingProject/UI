//  Home Controller

(function (angular) {
    "use strict";
    var fn = angular.noop;
    function BdgtCloneMasterchartCtrl($scope, $stateParams, model, $location, wiznav, cloneValidationModel, config) {
        var vm;
        //grid, headers, filters, pagination, pgData, filterData, currentPath;
        vm = this;

        //watch1 = fn;
        //watch2 = fn;
        //watch3 = fn;
        //watch4 = fn;

        vm.init = function () {
            config.setSrc(vm);
            vm.model = model;
            model.setInitials($location.path(), $stateParams.type);
            model.updateState();
            model.init();
            vm.setWatchForReload();
            vm.updateBreadcrumbs();
            cloneValidationModel.updateCloneDataDefParams();
            //grid.flushRows().busy(true).pagination.reset();
            model.load();
            //vm.loadDataTable();
        };

        vm.updateBreadcrumbs = function () {
            if (!model.getIsEditMode() && !model.getIsWizard()) {
                model.updateBreadcrumbs($stateParams.chartID);
            }
        };

        vm.setWatchForReload = function () {
            $scope.cloneValidationModel = cloneValidationModel;
            $scope.$watch('cloneValidationModel.reLoad', vm.reloadData, true);
        };

        vm.backClick = function () {
            wiznav.prev();
        };

        vm.reloadData = function () {
            if (cloneValidationModel.isReload()) {
                model.load();
                cloneValidationModel.setReload(false);
            }
        };


        vm.saveData = function () {
            cloneValidationModel.updateCloneData(model.getData(), $stateParams.chartID);
        };

        vm.destroy = function () {

        };

        vm.init();
    }

    angular
        .module("budgeting")
        .controller('BdgtCloneMasterchartCtrl', ['$scope', '$stateParams', 'cloneMasterChartModel', '$location', 'rpWizardNavModel', 'cloneMasterChartValidationModel', 'cloneMasterChartConfig', BdgtCloneMasterchartCtrl]);
})(angular);
