//  Default Adjustment Controller

(function (angular) {
    "use strict";

    function BdgtDefAdjCtrl($scope, $stateParams, $location, model, bdgtModel, errModel, timeout) {
        var vm = this;
        var grid, headers, filters, pagination, pgData, watch1, body, btnClick;

        vm.init = function () {
            vm.model = model;
            model.setChartID($stateParams.chartID);
            vm.budgetModel = bdgtModel;
            $scope.$on('$destroy', vm.reset);
            model.initPageControls().then(vm.load, errModel.onError);
            body = body || angular.element('body');
            btnClick = 'click.toggleMenu';
        };

        vm.reset = function () {
            model.reset();
            errModel.reset();
        };

        vm.load = function (resp) {
            model.updateChartName(resp.records[0].name);
            model.getAccTypes().then(vm.setGrid, errModel.onError);
            model.setBdgtModel();
        };

        vm.setGrid = function (resp) {
            model.updateAccTypeFilterOptions(resp.records);
           /* grid = model.updateGrid(model.getAcctypeOptions());
            headers = grid.headersModel;
            filters = grid.filtersModel;
            pagination = grid.pagination;
            pgData = pagination.data;
            pgData.pages.resultsPerPage = 1000;
            grid.busy(true);*/
            model.showHideGrid(true);
            model.setGridReady(model.getAcctypeOptions());
            $scope.gridFactory = model.updateGrid();
            model.load();
            //model.getGridData().then(vm.loadGrid, errModel.onError);
        };

       /* vm.loadGrid = function (resp) {
            vm.data = resp;
            vm.orgData = resp;
            filters.events.filter.subscribe(vm.loadFilterData);
            grid.flushRows().setData(vm.data).build().busy(false);
            vm.setBdgtModel();
        };*/

      /*  vm.loadFilterData = function (filterObj) {
            var filterData = model.getFilterObj(vm.orgData, filterObj);
            vm.data = {};
            vm.data.totalRecords = filterData.length;
            vm.data.records = filterData;
            grid.flushRows().setData(vm.data).build().busy(false);
        };*/

      /*  vm.setBdgtModel = function () {
            model.getBdgtModel().then(vm.loadModelWorkFlow, errModel.onError);
        };

        vm.loadModelWorkFlow = function (resp) {
            bdgtModel.updateDefModelYear(resp.records[0]);
            bdgtModel.updateYearOptions(resp.records);
            bdgtModel.getModelNames().then(vm.loadModelNames, errModel.onError);
        }; */

        vm.loadModelNames = function (resp) {
            bdgtModel.setDefaultModelSelection();
            bdgtModel.updateModelOptions(resp);
        };

        vm.loadModelData = function () {
            bdgtModel.updateChkOverWrite(false);
            bdgtModel.getModelNames().then(vm.loadModelNames, errModel.onError);
        };

        vm.assignDefPer = function () {
            if (model.isValidSelection(model.getData())) {
                model.updatePerValForItems(model.getData());
                model.toggleDefAdjPercent();
                //grid.flushRows().setData(vm.data).build().busy(false);
            }
            else {
                model.showToolTip();
                timeout(vm.bindMenu);
            }
        };

        vm.saveDefAdjPer = function () {
            model.saveDefAdjPer(model.getData()).then(vm.redirectPage, errModel.onError);
        };

        vm.redirectPage = function (resp) {
            $location.path('/admin/coa');
        };

        vm.applyDefPerBdgtModel = function () {
            bdgtModel.applyBdgtModel(model.getChartID()).then(errModel.showSuccMessage, errModel.onError);
        };

        vm.toggleDefAdjPer = function () {
            if (model.isValidSelection(model.getData())) {
                //model.hideToolTip();
                model.toggleDefAdjPercent();
            }
            else {
                model.showToolTip();
                timeout(vm.bindMenu);
            }
        };

        vm.showOverWriteInfo = function () {
            bdgtModel.showModelHelpInfo();
            timeout(vm.bindMenu);
        };

        vm.bindMenu = function () {
            if (bdgtModel.isHelpIconInfo()) {
                vm.bindMenuClick();
            }
            if (model.isToolTip()) {
                vm.bindToolTipClick();
            }
        };

        vm.bindMenuClick = function () {
            body.on(btnClick, vm.hideMenu);
        };

        vm.bindToolTipClick = function () {
            body.on(btnClick, vm.hideToolTip);
        };

        vm.unbindMenuClick = function () {
            body.off(btnClick);
        };

        vm.hideMenu = function () {
            $scope.$apply(function () {
                bdgtModel.setHelpIconInfo(false);
                vm.unbindMenuClick();
            });
        };

        vm.hideToolTip = function () {
            $scope.$apply(function () {
                model.setToolTip(false);
                vm.unbindMenuClick();
            });
        };

        vm.init();
    }

    angular
        .module("budgeting")
        .controller('BdgtDefAdjCtrl', [
            '$scope',
            '$stateParams',
            '$location',
            'defaultAdjustmentModel',
            'defaultAdjustmentBdgtModel',
            'defaultAdjustmentErrModel',
            '$timeout',
            BdgtDefAdjCtrl]);
})(angular);
