(function (angular) {
    "use strict";

    var fn = angular.noop;


    function BdgtImprtGlCsv($scope, $stateParams, model, errModel, gridModel, viewSpecGrid, timeout) {
        var vm, chartID, body, btnClick;
        vm = this;

        vm.init = function () {
            chartID = $stateParams.chartID;
            gridModel.setChartID(chartID);
            vm.model = model;
            $scope.viewSpecGrid = viewSpecGrid.setGridData();
            $scope.$on('$destroy', vm.reset);
            body = body || angular.element('body');
            btnClick = 'click.toggleMenu';
        };

        vm.reset = function () {
            model.reset();
            errModel.reset();
            gridModel.reset();
        };

        vm.dwnloadCsvTemplate = function () {
            model.getCsvTemplate().then(vm.downloadDoc, errModel.getCsvTemplateError);
        };

        vm.downloadDoc = function (resp) {
            var dataUrl = 'data:text/csv;utf-8,' + encodeURI(resp);
            //window.location(dataUrl); // commented this as this solution is downloading file without name and extenstion
            var hiddenElement = document.createElement('a');
            hiddenElement.setAttribute('href', dataUrl);
            hiddenElement.setAttribute('target', '_blank');
            hiddenElement.setAttribute('download', 'COA-CSV-TEMPLATE.csv');
            hiddenElement.click();
        };

        vm.loadCSVData = function () {
            model.loadCSVFile(chartID, model.getUploadedFile()).then(vm.loadAccsGrid, errModel.loadCSVFileError);
        };

        vm.loadAccsGrid = function (resp) {
            model.getFiltOptions().then(vm.setGridReady, errModel.getFiltOptionsError);
        };

        vm.setGridReady = function (resp) {
            var filters = model.updateFilters(resp);
            gridModel.setGridReady(filters);
            $scope.gridModel = gridModel.updateGrid();
            gridModel.load();
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

        vm.saveGlAccounts = function () {
            model.saveGlAccs(chartID, 'csv').then(errModel.showSaveSuccessMessage, errModel.saveGlAccsError);
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
        .controller('BdgtImprtGlCsv', ['$scope', '$stateParams', 'importGlAccModel', 'importGlAccMsgModel', 'importGlGridModel', 'ImportViewSpecModel', '$timeout', BdgtImprtGlCsv]);
})(angular);
