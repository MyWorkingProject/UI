
(function (angular) {
    "use strict";

    function factory(gridModel, gridConfig, contractModel, exception, $filter) {
        var model, translate, grid, filterState;
        model = {};

        model.gridData = {
            records: ""
        };


        model.init = function () {
            grid = model.grid = gridModel();
            grid.subscribe('sortBy', model.load);
            grid.subscribe('filterBy', model.load);
            grid.subscribe('paginate', model.paginate);
            grid.setConfig(gridConfig).setEmptyMsg('No results were found');
            return model;
        };

        model.loadGridConfig=function(){
            model.grid.setConfig(gridConfig);
        };

        model.load = function () {
           // model.grid.setConfig(gridConfig);
            var data = grid.busy(true).flushData().getQuery();
            return contractModel.getContractCsvData(data).success(model.setGridData, model.showException);
        };

        model.paginate = function () {
            var data = grid.getQuery();
            return contractModel.getContractCsvData(data).success(model.addGridData, exception.getCsvStatgingError);
        };

        model.showException = function(resp){
            contractModel.hideGirdData();
            exception.getCsvStatgingError(resp);
        };

        model.setGridData = function (response) {
            contractModel.showGirdData();
            model.setSelectColumn(response);
            grid.setData(response).busy(false);
        };

        model.setSelectColumn = function (data) {
            angular.forEach(data.records, function (item) {
                item.isSelected = false;
            });
        };

        model.addGridData = function (response) {
            model.setSelectColumn(response);
            grid.addData(response).busy(false);
        };

        model.getSelectedRecords = function () {
            return $filter('filter')(model.grid.data.records, { isSelected: 'true' });
        };

        return model.init();
    }
    angular
        .module("budgeting")
        .factory('contractsCSVGridFactory', [
            'rpGridModel',
            'contractsCSVConfig',
            'contractsCSVModel',
            'contractCSVErrorHandling',
            '$filter',
            factory
        ]);
})(angular);