(function (angular) {
    "use strict";
    var fn = angular.noop;

    function BdgtImprtGlLr($scope, $stateParams, model, errModel, gridModel, timeout) {
        var vm, chartID, body, btnClick;
        vm = this;

        vm.init = function () {
            chartID = $stateParams.chartID;
            gridModel.setChartID(chartID);
            vm.model = model;
            model.loadCharts().then(model.setChartOptions, errModel.getChartsError);
            $scope.$on('$destroy', vm.reset);
            body = body || angular.element('body');
            btnClick = 'click.toggleMenu';
        };

        vm.reset = function () {
            model.reset();
            errModel.reset();
            gridModel.reset();
        };

        vm.chartSelect = function () {
            if (model.getSelectedPropertyIDForm()) {
                model.hideLoadBtn();
                return;
            }
            model.showLoadBtn();
        };

        vm.loadLRProps = function () {
            gridModel.setGridReady();
            $scope.gridModel = gridModel.updateGrid();
            vm.showDataGrid = true;
            gridModel.load();
        };

        vm.saveLRGlAccounts = function () {
            if (gridModel.hasPropsSelections()) {
                gridModel.saveLrGlAccs();
            }
            else {
                model.updateToolTipState();
                timeout(vm.bindMenu);
            }
        };

        vm.refreshLRData = function () {
            gridModel.refreshGrid();
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
        .controller('BdgtImprtGlLr', ['$scope', '$stateParams', 'importGlLrModel', 'importGlAccMsgModel', 'importGlLRGridModel', '$timeout', BdgtImprtGlLr]);
})(angular);
