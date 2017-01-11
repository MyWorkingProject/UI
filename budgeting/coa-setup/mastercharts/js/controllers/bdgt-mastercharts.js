(function (angular) {
    "use strict";

    var fn = angular.noop;

    function BdgtMasterChartsCtrl($scope, model, timeout, $location, gridConfig, gridActions, gridModel, actionsMethods, dialogs) {
        var vm = this,
            body, btnClick;

        $scope.$watch('page.model.form.propertychart.isActive', model.showPropertyTab, true);
        $scope.$watch('page.model.form.mastercharts.isActive', model.showMasterChartTab, true);
        $scope.$watch('page.model.form.accountmapping.isActive', model.showAccountmappingTab, true);


        vm.init = function () {
            vm.model = model;
            gridConfig.setSrc(vm);
            gridActions.setSrc(vm);
            $scope.gridModel = gridModel;
            dialogs.subscribe(vm.continueMasterchartDelete);
            body = body || angular.element('body');
            btnClick = 'click.toggleMenu';
            gridModel.load();
            actionsMethods.setEditViewMode();
            $scope.$on('$destroy', vm.destroy);
        };

        vm.showActionMenu = function () {
            model.updateMenuFlag(!model.isMenuOn());
            timeout(vm.bindMenu);
        };

        vm.bindMenu = function () {
            if (model.isMenuOn()) {
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
                model.updateMenuFlag(false);
                vm.unbindMenuClick();
            });
        };

        vm.copyMasterChart = function (params) {
            actionsMethods.copyChart(params);
        };


        vm.viewMasterChart = function (record) {
            actionsMethods.viewMasterChart(record);
        };

        vm.editMasterChart = function (record) {
            actionsMethods.editMasterChart(record);
        };

        vm.deleteMasterChart = function (masterchartId) {
            vm.masterchartId = masterchartId;
            dialogs.confirmDeleteMasterchart();
        };

        vm.continueMasterchartDelete = function (action) {
            if (action == 'continue') {
                actionsMethods.deleteMasterChart(vm.masterchartId);
            }
        };

        vm.navToNormalMasterchart = function () {
            $location.path('/admin/coa/wiz/new/normal/0');
        };

        vm.navToAltMasterchart = function () {
            $location.path('/admin/coa/wiz/new/alt/0');
        };

        vm.destroy = function () {
            model.reset();
        };

        vm.init();
    }


    angular
           .module("budgeting")
           .controller('BdgtMasterChartsCtrl', [
                       '$scope',
                       'masterChartsListModel',
                       '$timeout',
                       '$location',
                        'masterchartListConfig',
                        'masterchartListActionsDef',
                        'masterchartGridFactory',
                        'masterchartListActions',
                        'masterchartDialogs',
                       BdgtMasterChartsCtrl]);
})(angular);