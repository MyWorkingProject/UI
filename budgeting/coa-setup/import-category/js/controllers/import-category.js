//  Import Category Controller

(function (angular) {
    "use strict";
    var fn = angular.noop;

    function BdgtImportCategoryCtrl($scope, $stateParams, $location, model, gridModel, viewSpecGrid, errorHandleModel) {
        var vm = this;

        vm.init = function () {
            vm.model = model;
            model.setChartID($stateParams.chartID);
            model.setWizardVals($location.absUrl());
            $scope.viewSpecGrid = viewSpecGrid.setGridData();
            $scope.$on('$destroy', vm.reset);
        };

        vm.reset = function () {
            model.reset();
            errorHandleModel.reset();
            gridModel.reset();
        };

        vm.loadNextDd = function () {
            model.srcChangeUpdate();
        };

        vm.loadGlCategories = function () {
            if (!model.isValidSelectedProperty()) {
                $scope.gridModel = gridModel.setGridReady();
                gridModel.loadAccountingCategories();
            }
        };

        vm.loadCSVData = function () {
            $scope.gridModel = gridModel.setGridReady();
            gridModel.loadCSVFile();
        };

        vm.dwnloadCsvTemplate = function () {
            model.getCsvTemplate().then(vm.downloadDoc, errorHandleModel.onFileNotFoundErr);
        };

        vm.downloadDoc = function (resp) {
            var dataUrl = 'data:text/csv;utf-8,' + encodeURI(resp);
            //window.location.href = dataUrl; // GOt back to previous solution as window.location is not serving the purpose of downloading the file with filename and extension
            var hiddenElement = document.createElement('a');
            hiddenElement.setAttribute('href', dataUrl);
            hiddenElement.setAttribute('target', '_blank');
            hiddenElement.setAttribute('download', 'templateGLAccountCategory.csv');
            hiddenElement.click();
        };

        vm.delGlCat = function () {
            gridModel.deleteGls();
        };

        vm.saveGlAccounts = function () {
            gridModel.saveGlCategories();
        };

        vm.saveGlAccountsCsv = function () {
            gridModel.saveGlAccountsCsv();
        };

        vm.init();
    }

    angular
        .module("budgeting")
        .controller('BdgtImportCategoryCtrl', [
            '$scope',
            '$stateParams',
            '$location',
            'importCategoryModel',
            'importCategoryGridModel',
            'ImportCategoryViewSpecModel',
            'ImportCategoryErrorModel',
            BdgtImportCategoryCtrl
        ]);
})(angular);
