(function (angular) {
    "use strict";
    var fn = angular.noop;
    function BdgtImprtGlYardi($scope, $stateParams, model, errModel, gridModel, timeout) {
        var vm, chartID, body, btnClick;
        vm = this;

        vm.init = function () {
            chartID = $stateParams.chartID;
            gridModel.setChartID(chartID);
            vm.model = model;
            model.loadYardiProp().then(model.updateYardiProp, errModel.getYardiPropError);
            $scope.$on('$destroy', vm.reset);
            body = body || angular.element('body');
            btnClick = 'click.toggleMenu';
        };

        vm.reset = function () {
            model.reset();
            errModel.reset();
            gridModel.reset();
        };

        vm.propChange = function () {
            if (model.isSelectedChartID(0)) {
                model.hideLoadBtn();
                return;
            }
            model.showLoadBtn();
        };

        vm.loadYardiGls = function () {
            model.getFiltOptions().then(vm.setGridReady, errModel.getFiltOptionsError);
        };

        vm.setGridReady = function (resp) {
            model.updateAssgnTypes(resp.records);
            resp = model.updateUnassignedType(resp);
            var filters = model.updateFilters(resp);
            gridModel.setGridReady(filters);
            $scope.gridModel = gridModel.updateGrid();
            model.getYardiAccs(chartID).then(vm.populateGrid, errModel.getYardiAccsError);
        };

        vm.populateGrid = function (resp) {
            gridModel.load();
        };

        vm.saveGlAccounts = function () {
            model.saveGlAccs(chartID, 'yardi').then(errModel.showSaveSuccessMessage, errModel.saveGlAccsError);
        };

        vm.toggleAssignType = function () {
            model.toggleAssignWorkFlow();
        };

        vm.assignTypeSave = function () {
            if (gridModel.hasGlSelections()) {
                var selAccs = model.getSelGlsToAssgnTypeObj(gridModel.getGlsSelected());
                model.updateAccType(selAccs).then(vm.showUpdateAccTypeMessage, errModel.updateAccTypeError);
            }
            //var selAccs = model.getSelGlsToAssgnTypeObj(vm.data);
            ////if (model.selAcssIsNotEmpty(selAccs)) {
            //    model.updateAccType(selAccs).then(errModel.showUpdateAccTypeMessage, errModel.updateAccTypeError);
            ////}
        };

        vm.showUpdateAccTypeMessage = function (resp) {
            errModel.showUpdateAccTypeMessage();
            gridModel.load();
            //model.setAssignTypeToData(gridModel.getGlsSelected());
            //grid.busy(true);
            //grid.flushRows().setData(vm.data).build().busy(false);
        };

        vm.delGlAccounts = function () {
            if (gridModel.hasGlSelections()) {
                gridModel.deleteGls().then(vm.showDelMessage, errModel.delGlAccsError);
            }
            else {
                model.updateToolTipState();
                timeout(vm.bindMenu);
            }
        };

        vm.showDelMessage = function (resp) {
            errModel.showDelGlsMessage(resp);
            gridModel.load();
        };

        vm.bindMenu = function () {
            if (model.isHelpIconInfo()) {
                vm.bindMenuClick();
            }
        };

        vm.bindMenuClick = function () {
            body.on(btnClick, vm.hideMenu);
        };

        vm.unbindMenuClick = function () {
            body.off(btnClick);
        };

        vm.hideMenu = function () {
            $scope.$apply(function () {
                model.setHelpIconInfo(false);
                vm.unbindMenuClick();
            });
        };

        vm.init();
    }
    angular
        .module("budgeting")
        .controller('BdgtImprtGlYardi', ['$scope', '$stateParams', 'importGlAccModel', 'importGlAccMsgModel', 'importGlGridModel', '$timeout', BdgtImprtGlYardi]);
})(angular);
