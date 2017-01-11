
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

        model.ApplyFilter=function(filterType){  
            if(contractModel.form.expiringcontracts.isActive) {
                if(filterType==="Expired"){
                grid.setFilterValue("status", "Expired"); 

                }
                else if(filterType=="Expiring Soon"){
                  grid.setFilterValue("status", "Expiring Soon"); 

                }
            }             
        };

        model.load = function () {
            contractModel.setSelectState(false); 
           // model.grid.setConfig(gridConfig);
            var data = grid.busy(true).flushData().getQuery();
            return contractModel.getContractData(data).success(model.setGridData, exception.getContractsException);
        };

        model.paginate = function () {
            contractModel.setSelectState(false); 

            var data = grid.getQuery();
            return contractModel.getContractData(data).success(model.addGridData, exception.getContractsException);
        };

        model.setGridData = function (response) {
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

        model.selectAll = function(flag) {
            grid.selectAll(flag);
        };

        model.getDataFilter = function() {
            return grid.getQuery();
        };

        return model.init();
    }
    angular
        .module("budgeting")
        .factory('contractsGridFactory', [
            'rpGridModel',
            'contractsConfig',
            'contractsModel',
            'contractsErrorHandling',
            '$filter',
            factory
        ]);
})(angular);