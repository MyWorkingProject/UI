// Import Contract CSV Controller

(function (angular) {
    "use strict";

    function ContractCsvCtrl($scope,model,errModel,viewGrid,csvGrid,timeout) {
        var vm = this,body, btnClick;

        vm.init = function () {
            vm.model = model;
            model.reset();
            body = body || angular.element('body');
            btnClick = 'click.toggleMenu';
            $scope.$on('$destroy', vm.destroy);
            vm.getData();
        };

        vm.getData = function(){
            $scope.gridViewFactory = viewGrid;
            viewGrid.load();
        };
        
        vm.destroy = function () {
            //Destroy function
            //logc(vm.model.form.file[0]);
            model.reset();
            model.deleteAllStagingData();
            vm = undefined;
        };

        vm.loadCsvData = function(){
            model.loadCSVFile(model.getUploadedFile()).then(vm.loadGrid, vm.showException);
        };

        vm.showException = function(resp){
            model.hideGirdData();
            errModel.showCSVSaveException(resp);
        };

        vm.dwnloadCsvTemplate = function () {
            model.getCsvTemplate().then(vm.downloadDoc, errModel.getCsvTemplateError);
        };

        vm.loadGrid = function(){
            $scope.csvGrid = csvGrid;
            model.showGirdData();
            csvGrid.load();
        };

        vm.loadCSVData = function(){
             csvGrid.load();
        };

        vm.downloadDoc = function (resp) {
            //logc(resp);
            //var dataUrl = 'data:text/csv;charset=utf-8,' + encodeURI(model.getResponseData(resp)); // + encodeURI(resp);
            var dataUrl = 'data:text/csv;utf-8,' + resp; // + encodeURI(resp);
            //window.location(dataUrl); // commented this as this solution is downloading file without name and extenstion
         /*   var hiddenElement = document.createElement('a');
            hiddenElement.setAttribute('href', dataUrl);
            hiddenElement.setAttribute('target', '_blank');
            hiddenElement.setAttribute('download', 'VENDOR-CONTRACT-CSV-TEMPLATE.csv');
            hiddenElement.click();*/

            var hiddenElement = document.createElement('a');

            hiddenElement.href = 'data:attachment/csv,' + encodeURI(resp.data);
            hiddenElement.target = '_blank';
            hiddenElement.download = 'VENDOR-CONTRACT-CSV-TEMPLATE.csv';
            hiddenElement.click();
        };

        vm.deleteData = function(){
            if ((csvGrid.getSelectedRecords()).length > 0) {
                var records = csvGrid.getSelectedRecords();
                var promise = model.deleteSelContracts(records);
                promise.then(vm.loadCSVData,errModel.getCsvDelStatgingError);
            }
            else {
                model.updateTipisMenuOn(true);
                timeout(vm.bindMenu);
            }
        };

        vm.saveData = function(){
            model.saveImportedContracts().then(vm.refreshGrid, errModel.showErrorImportMsg);//errModel.showSuccessImportMsg();
        };

       vm.refreshGrid = function(){
           //viewGrid.load(); 
           model.loadParentGrid(); 
           errModel.showSuccessImportMsg();
       }; 

        vm.bindMenu = function () {
            if (model.isToolTipisMenuOn()) {
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
                model.updateTipisMenuOn(false);
                vm.unbindMenuClick();
            });
        };

        vm.initFile = function(){
            logc('file reset');
        };

        vm.init();
    }

    angular
        .module("budgeting")
        .controller("ContractCsvCtrl", [
            "$scope",'contractsCSVModel','contractCSVErrorHandling','contractsCSVViewGridFactory','contractsCSVGridFactory','$timeout',
            ContractCsvCtrl
        ]);
})(angular);
