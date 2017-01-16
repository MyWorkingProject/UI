
(function (angular) {
    'use strict';

    function factory(gridModel, gridConfig, bwsModel, exHandling, $filter) {
        var model, translate, grid, filterState;
        model = {};
        model.filterState= false;
        model.gridData = {
            records: ""
        };
       
        model.init = function(){
             grid = model.grid = gridModel();
             return model;   
        };

        model.setGridReady = function (data, status) {
            //gridConfig.setSrc(vm);
            grid = gridModel().setConfig(gridConfig.updateGridModel(data, status));
            grid.filtersModel.state.active = model.filterState;
            grid.flushData().busy(true);
        };

        model.retainFilterState = function(){
           model.filterState =  grid.filtersModel.state.active;
        };

        model.updateGrid = function () {
            model.grid = grid;
            grid.subscribe('filterBy', model.load);
            grid.subscribe('paginate', model.paginate);
            grid.subscribe('sortBy', model.load);
            grid.setEmptyMsg('No results were found');
            return model;
        };

         model.ApplyFilter=function(filterType){ 
                if(filterType==="Overdue"){
                    grid.setFilterValue("status", "Overdue"); 
                }
        };

        model.load = function () {
            bwsModel.setConfigReady(true);
            var data = grid.busy(true).flushData().getQuery();
            bwsModel.getBudgetWorkFlowStatusList(data).success(model.setGridData, exHandling.getBdgtWorkflowStatusException);
        };

        model.paginate = function () {
            var data = grid.getQuery();
            bwsModel.setConfigReady(true);
            return bwsModel.getBudgetWorkFlowStatusList(data).success(model.addGridData, exHandling.getBdgtWorkflowStatusException);
        };

        model.setGridData = function (response) {
            model.setSelectColumn(response);
            model.addCheckboxStatus(response);
            model.resetGridSelected();
            grid.setData(response).busy(false);
        };

        model.setSelectColumn = function (data) {
            angular.forEach(data.records, function (item) {
                item.isSelected = false;
                item.statusPer = Math.floor((Math.random() * 100) + 1);
            });
        };

        model.addGridData = function (response) {
            model.setSelectColumn(response);
            model.addCheckboxStatus(response);
            model.resetGridSelected();
           // bwsModel.setConfigReady(true);
            grid.addData(response).busy(false);
        };

        model.resetGridSelected = function(){
             if(grid.gridSelectModel){
                    grid.gridSelectModel.selected = false;
                }
        };

        model.getSelectedRecords = function () {
            return $filter('filter')(model.grid.data.records, { isSelected: 'true' });
        };

         model.selectAll = function(val) {
            model.grid.selectAll(val);
        };

        model.addCheckboxStatus = function(response) {
            angular.forEach(response.records, function(curr) {
                if(curr.budgetWorkFlowID <= 0) {
                    curr.disableSelection = true;
                }
            });

        };

        return model.init();
    }
    angular
        .module('budgeting')
        .factory('budgetWorkflowStatusGridFactory', [
            'rpGridModel',
            'budgetWorkflowStatusConfig',
            'budgetWorkflowStatusModel',
            'budgetWorkflowStatusErrorHandling',
            '$filter',
            factory
        ]);
})(angular);