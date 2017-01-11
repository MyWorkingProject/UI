//  Users List Model

(function (angular) {
    "use strict";

    function factory(gridModel, gridConfig, exception,  budgetTasksSvc,budgetTaskModel) {
        var grid,
            model = {};

        model.init = function () {
            grid = model.grid = gridModel();
            grid.subscribe('sortBy', model.load);
            grid.subscribe('filterBy', model.load);
            grid.subscribe('paginate', model.paginate);
            grid.setConfig(gridConfig).setEmptyMsg("No results were found");
            return model;
        };
       
         model.ApplyFilter=function(filterType){ 
             if(!budgetTaskModel.isBudgetModelTask()){
                    if(filterType==="Pending"){
                        grid.setFilterValue("Taskstatus", "Pending"); 
                    }
                    else if(filterType=="Overdue"){
                        grid.setFilterValue("Taskstatus", "Overdue"); 
                    }
              }
             else{
                     grid.setFilterValue("Taskstatus", ''); 
                }
        };

         model.load = function () {
            var data = grid.busy(true).flushData().getQuery();
            return budgetTaskModel.getTasData(data).success(model.setGridData, exception.getTasksException);
        };

        model.paginate = function () {
            var data = grid.getQuery();
            return budgetTaskModel.getTasData(data).success(model.addGridData, exception.getTasksException);
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

        model.setGridFilterState = function (state) {
            grid.setFilterState(state);
            return model;
        };



        return model.init();
    }

    angular
        .module("budgeting")
        .factory('budgetTasksGridFactory', [
            'rpGridModel',
            'budgetTaskConfig',
            'budgetTasksErrorHandling',
            'budgetTasksSvc',
            'budgetTaskModel',
            factory
        ]);
})(angular);
