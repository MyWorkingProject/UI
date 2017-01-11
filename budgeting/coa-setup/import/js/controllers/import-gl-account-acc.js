(function (angular) {
    "use strict";

    var fn = angular.noop;

    function BdgtImprtGlAcc($scope, $stateParams, model, errModel, gridModel, timeout) {
        var vm, chartID, body, btnClick;
        vm = this;

        vm.init = function () {
            chartID = $stateParams.chartID;
            gridModel.setChartID(chartID);
            vm.model = model;
            model.getProperties().then(model.loadPropOptions);
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
            if (model.isPropertyID(0)) {
                model.hideLoadBtn();
                return;
            }
            model.showLoadBtn();
        };

        vm.loadAccGls = function () {
            if (!model.isPropertyID(0)) {
                model.getFiltOptions().then(vm.loadAccsGrid, errModel.getFiltOptionsError);
            }
        };

        vm.loadAccsGrid = function (resp) {
            var filters = model.updateFilters(resp);
            gridModel.setGridReady(filters);
            $scope.gridModel = gridModel.updateGrid();
            model.getGlAccs(chartID).then(vm.setGridReady, errModel.getGlAccsError);
        };

        vm.setGridReady = function (resp) {
            gridModel.load();
        };

        vm.saveGlAccounts = function () {
            model.saveGlAccs(chartID, 'osa').then(errModel.showSaveSuccessMessage, errModel.saveGlAccsError);
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
            errModel.showDelGlsSuccMsg();
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
        .controller('BdgtImprtGlAcc', ['$scope', '$stateParams', 'importGlAccModel', 'importGlAccMsgModel', 'importGlGridModel', '$timeout', BdgtImprtGlAcc]);
})(angular);
